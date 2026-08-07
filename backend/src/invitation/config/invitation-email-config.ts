export const INVITATION_EMAIL_CONFIG = {
  TEACHER: {
    subject: 'Teacher Invitation',
    template: 'invitations/teacher-invitation',
  },
  PARENT: {
    subject: 'Parent Invitation',
    template: 'invitations/parent-invitation',
  },
  STUDENT: {
    subject: 'Student Invitation',
    template: 'invitations/student',
  },
  ADMIN: {
    subject: 'Admin Invitation',
    template: 'invitations/school-admin-invitation',
  },
} as const;
