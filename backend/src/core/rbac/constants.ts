export  const Permissions = [
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

    'tenant.view',
    'tenant.update',
    
    'user.view',
    'user.update',
  ];

export const PackagePlans = [
    {
        name: 'Free',
        features: JSON.stringify([
            'Student Management',
            'Teacher Management',
            'Attendance Tracking',
        ]),
        actual_price: 0,
        discount: 0,
        maxUsers: 100,
        maxRoles: 4,
        maxStorageMb: 1000,
        allowsAdvancedAnalytics: false,
    },
    {
        name: 'Standard',
        features: JSON.stringify([
            'Student Management',
            'Teacher Management',
            'Attendance Tracking',
            'Exam Management',
            'Report Cards',
        ]),
        actual_price: 99.99,
        discount: 10,
        maxUsers: 1000,
        maxRoles: 10,
        maxStorageMb: 5000,
        allowsAdvancedAnalytics: false,
    },
    {
        name: 'Premium',
        features: JSON.stringify([
            'Student Management',
            'Teacher Management',
            'Attendance Tracking',
            'Exam Management',
            'Report Cards',
            'Parent Portal',
            'Finance Management',
            'Advanced Analytics',
        ]),
        actual_price: 299.99,
        discount: 15,
        maxUsers: 10000,
        maxRoles: 50,
        maxStorageMb: 50000,
        allowsAdvancedAnalytics: true,
    },
]