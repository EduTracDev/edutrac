import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { TeacherController } from './teacher/teacher.controller';
import { AdminController } from './admin/admin.controller';
import { ParentController } from './parent/controllers/parent.controller';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { AttendanceModule } from './attendance/attendance.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { CommunicationModule } from './communication/communication.module';
import { MailModule } from './mail/mail.module';
import { PackagePlanModule } from './package-plan/package-plan.module';
import { InvitationModule } from './invitation/invitation.module';
import { TenantMiddleware } from './core/middleware/tenant.middleware';
import { enValidationSchema } from './core/config/env.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OnboardingModule } from './onboarding/onboarding.module';
import { UploadsModule } from './uploads/uploads.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OnboardingGuard } from './onboarding/guards/onboarding.guard';
import { ClassModule } from './class/class.module';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, validationSchema: enValidationSchema }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 20,
    }]),
    TenantModule,
    UserModule,
    TeacherModule,
    ParentModule,
    StudentModule,
    CourseModule,
    EnrollmentModule,
    AttendanceModule,
    SubscriptionModule,
    CommunicationModule,
    MailModule,
    PackagePlanModule,
    InvitationModule,
    OnboardingModule,
    UploadsModule,
    CloudinaryModule,
    ClassModule,
  ],
  controllers: [
    AppController,
    TeacherController,
    AdminController,
    ParentController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: OnboardingGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware)
      .exclude('/auth', '/auth/register', '/auth/verify-account', '/auth/google/register', '/auth/google/callback', '/auth/resend-verification-email', '/onboarding')
      .forRoutes('*');
  }
}