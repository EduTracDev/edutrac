import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {GlobalExceptionFilter }from './core/filters/global-exception-filter';
import helmet from 'helmet';
import Express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        'https://hoppscotch.io',
        'https://www.edutrac.com',
        'https://edutrac.com',
      ];

      const isTenantDomain = origin?.endsWith(process.env.TENANT_DOMAIN_SUFFIX);

      if (!origin || allowed.includes(origin) || isTenantDomain) {
        return callback(null, true);
      }

      return callback(new Error('CORS not allowed'));
    },
    credentials: true,
  });
  const expressApp = app.getHttpAdapter().getInstance() as Express.Application;  
  expressApp.set('trust proxy', true);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();