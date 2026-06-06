import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/adapters/pug.adapter';
import {join} from 'path';


@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env['SMTP_HOST'],
          port: Number(process.env['SMTP_PORT']),
          secure: false,
          auth: {
            user: process.env['SMTP_USER'],
            pass: process.env['SMTP_PASSWORD'],
          },  
          tls: {
            rejectUnauthorized: false
          },
        },
        defaults: {
          from: process.env['SMTP_FROM'],
        },
        template: {
          dir: join(process.cwd(), 'src/templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}