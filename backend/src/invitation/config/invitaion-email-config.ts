export const INVITATION_EMAIL_CONFIG = {
  TEACHER: {
    subject: 'Teacher Invitation',
    template: 'invitation/teacher',
  },
  PARENT: {
    subject: 'Parent Invitation',
    template: 'invitation/parent',
  },
  STUDENT: {
    subject: 'Student Invitation',
    template: 'invitation/student',
  },
  ADMIN: {
    subject: 'Admin Invitation',
    template: 'invitation/admin',
  },
} as const;