export const Permissions = [
  'student.create',
  'student.view',
  'student.update',
  'student.delete',

  'teacher.create',
  'teacher.view',
  'teacher.update',
  'teacher.delete',

  'parent.create',
  'parent.view',
  'parent.update',
  'parent.delete',

  'attendance.mark',
  'attendance.view',

  'role.create',
  'role.view',
  'role.update',
  'role.delete',

  'invitation.create',
  'invitation.view',
  'invitation.resend',
  'invitation.cancel',

  'system.tenant.create',
  'system.tenant.view',
  'system.tenant.update',
  'system.tenant.delete',
  'system.tenant.manage',

  'user.view',
  'user.update',

  'tenant.create',
  'tenant.view',
  'tenant.update',
  'tenant.delete',
  'tenant.manage',

  // 'class.create',
  // 'class.view',
  // 'class.update',
  // 'class.delete',

  // 'subject.create',
  // 'grade.manage',
  // 'exam.create',
  // 'exam.grade',

  'fee.create',
  'fee.view',
  'payment.record',
  'receipt.generate',

  'report.view',
  'report.generate',
];

export const PackagePlans = [
  {
    name: 'Basic',
    description: 'For small home-schools',
    features: JSON.stringify([
      'Up to 50 students',
      'Attendance Tracking',
      'Basic Report Cards',
      'Email Support',
    ]),
    actual_price: 0,
    discount: 0,
    maxUsers: 50,
    maxRoles: 4,
    maxStorageMb: 500,
    allowsAdvancedAnalytics: false,
  },
  {
    name: 'Pro',
    description: 'Perfect for growing schools',
    features: JSON.stringify([
      'Unlimited Students',
      'Billing & Fees Management',
      'Parent Portal Access',
      'Result Analytics',
      'Priority Support',
    ]),
    actual_price: 29000,
    discount: 4000,
    maxUsers: 10000,
    maxRoles: 10,
    maxStorageMb: 5000,
    allowsAdvancedAnalytics: false,
  },
  {
    name: 'Ultra',
    description: 'Full-scale enterprise power',
    features: JSON.stringify([
      'Everything in Pro',
      'Custom Domain',
      'Personalized Landing Page',
      'Exam Management',
      'Report Cards Printing',
      'Parent, Teacher, Admin Portal',
      'Dedicated Account Manager',
      'Advanced Analytics',
    ]),
    actual_price: 50000,
    discount: 8000,
    maxUsers: 20000,
    maxRoles: 50,
    maxStorageMb: 50000,
    allowsAdvancedAnalytics: true,
  },
];
