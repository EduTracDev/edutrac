import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/adapters/pug.adapter';
import { join } from 'path';
import 'dotenv/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env['SMTP_HOST'],
          port: Number(process.env['SMTP_PORT']),
          secure: Number(process.env['SMTP_PORT']) === 465,
          auth: {
            user: process.env['SMTP_USER'],
            pass: process.env['SMTP_PASSWORD'],
          },
          tls: {
            rejectUnauthorized: process.env.NODE_ENV !== "production",
          },
        },
        defaults: {
          from: process.env['SMTP_FROM'],
        },
        template: {
          dir: join(process.cwd(), process.env.NODE_ENV === "production" ? 'dist/src/templates' : 'src/templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}