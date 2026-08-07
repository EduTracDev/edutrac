import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import * as pug from 'pug';
import { join } from 'path';


export interface SendEmailParams {
  subject: string;
  template: string;
  to: string;
  context: Record<string, unknown>;
}


@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {}

  async sendEmail(params: SendEmailParams) {
    try {
      if (!params.context) throw new Error('Please ensure context details are passed as argument to the mail service call');
      if (!params.to) throw new Error('Email recipient must be passed in');

      this.logger.log(`Sending email to ${params.to} via Brevo with template ${params.template}`);

      const response = await this.sendViaBrevo(params);
      this.logger.log(`Email sent successfully to ${params.to} via Brevo`);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      const errorStack = err instanceof Error ? err.stack : undefined;
  
      this.logger.error(`Failed to send email to ${params.to}: ${errorMessage}`, errorStack);
      
      if (this.configService.get('NODE_ENV') !== 'production') throw new InternalServerErrorException(`Email failed: ${errorMessage}`);
      throw new InternalServerErrorException('Failed to send email. Please try again later.');
    }
  }


  private async sendViaBrevo(params: SendEmailParams): Promise<any> {
    const apiKey = this.configService.get<string>('BREVO_API_KEY');
    if (!apiKey) throw new Error('BREVO_API_KEY is not configured in environment variables');

    const fromEmail = this.configService.get<string>('BREVO_FROM');
    if (!fromEmail) throw new Error('BREVO_FROM is not configured');

    // Render the Pug template to HTML
    const htmlContent = await this.renderPugTemplate(params.template, params.context);

    // Parse sender/recipient into Brevo's {name, email} format
    const sender = this.parseEmailAddress(fromEmail);
    const recipient = this.parseEmailAddress(params.to);
    
    const payload = JSON.stringify({
      sender,
      to: [recipient],
      subject: params.subject,
      htmlContent,
    });

    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
        'content-length': Buffer.byteLength(payload),
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch {
              resolve({ message: 'Email sent', statusCode: res.statusCode });
            }
          } else {
            reject(new Error(`Brevo API Error: ${res.statusCode} - ${body || res.statusMessage}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(new Error(`Failed to connect to Brevo API: ${err.message}`));
      });

      req.write(payload);
      req.end();
    });
  }

  /**
   * Render a Pug template file to HTML string
   */
  private async renderPugTemplate(templateName: string, context: any): Promise<string> {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';
    const templateDir = join(process.cwd(), isProd ? 'dist/src/templates' : 'src/templates');
    const templatePath = join(templateDir, `${templateName}.pug`);

    try {
      return pug.renderFile(templatePath, context);
    } catch (err) {
      throw new Error(`Failed to render Pug template ${templateName}: ${(err as Error).message}`);
    }
  }

  /**
   * Parse email address into Brevo's {name, email} format
   * Supports both: "email@example.com" and "Name <email@example.com>"
   */
  private parseEmailAddress(input: string): { name?: string; email: string } {
    const match = input.match(/^\s*([^<>]+?)?\s*<([^>]+)>\s*$/);
    if (match) {
      const name = match[1]?.trim();
      const email = match[2].trim();
      return name ? { name, email } : { email };
    }
    return { email: input.trim() };
  }
}