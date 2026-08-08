import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './core/filters/global-exception-filter';
import helmet from 'helmet';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        'https://hoppscotch.io',
        'https://www.edutrac.com',
        'https://edutrac.com',
        'https://edutrac-lms.vercel.app'
      ];

      const isTenantDomain = origin?.endsWith(process.env.TENANT_DOMAIN_SUFFIX || '');

      if (!origin || allowed.includes(origin) || isTenantDomain) {
        return callback(null, true);
      }

      return callback(new Error('CORS not allowed'));
    },
    credentials: true,
  });
  app.set('trust proxy', true);
  app.use(helmet());
  if (process.env.NODE_ENV !== 'production') {
    app.useStaticAssets(join(process.cwd(), 'uploads'), {
      prefix: '/uploads',
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();