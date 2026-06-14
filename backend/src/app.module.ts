import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { TeacherController } from './teacher/teacher.controller';
import { AdminController } from './admin/admin.controller';
import { ParentController } from './parent/parent.controller';
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

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), TenantModule, UserModule, TeacherModule, ParentModule, StudentModule, CourseModule, EnrollmentModule, AttendanceModule, SubscriptionModule, CommunicationModule, MailModule, PackagePlanModule, InvitationModule],
  controllers: [AppController, TeacherController, AdminController, ParentController],
  providers: [AppService],
})
export class AppModule {}
