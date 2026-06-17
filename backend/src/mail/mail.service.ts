import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(private readonly mailerService: MailerService, private configService:ConfigService){}

    async sendEmail(params: {
        subject: string;
        template: string;
        to: string;
        context: ISendMailOptions['context'];
    }){
        try{
            if(!params.context) throw new Error('Please ensure context details are passed as argument to the mail service call');
            if(!params.to) throw new Error('Email receipient must be passed in')    
            
            const sendMailParams = {
                subject: params.subject,
                template: params.template,
                to: params.to,
                from: process.env.SMTP_FROM,
                context: params.context,
            }
            const response = await this.mailerService.sendMail(sendMailParams);
            this.logger.log(
                `Email sent successfully to the following parameters ${JSON.stringify(sendMailParams)}`, response
            )
        } catch(err){
            this.logger.error(
                `Error while sending mail with the following parameters ${JSON.stringify(params)}`, err
            )
        }
    }
}