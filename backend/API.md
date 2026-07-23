# EduTrac API Documentation

## Base URL
```
https://edutrac.onrender.com/api/v1
```

## Important Notes
- **Tenant Identification**: Presntly, the tenant is identified via the request query e.g. (`edutrac-lms.com?domain=greenland`)
 (Please note that later on the tenant would be Identified via the request host header (e.g., `abcschools.edutrac.com`)) There's no need to pass `tenantId` in the URL path.
- **Standard Response Format**: All endpoints follow this format unless specified otherwise:
```json
{
  "success": boolean,
  "message": string,
  "data": any,
  "error": any
}
```

---

## Authentication Endpoints

### 1. Register Tenant (School)
Registers a new tenant (school/organization) in the system.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "admin@school.com",
  "password": "securepassword123",
  "passwordConfirm": "securepassword123",
  "school_name": "ABC International School",
  "packagePlanId": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "School registration successful. Please verify your email to continue.",
  "data": null,
  "error": null
}
```

**Validation Rules:**
- `email`: Must be a valid email
- `password`: Minimum 8 characters
- `passwordConfirm`: Must match `password`
- `school_name`: Required string
- `packagePlanId`: Required number

---

### 2. User Sign In
Signs in an existing user with email and password.

**Endpoint:** `POST /auth/signin`

**Request Body:**
```json
{
  "email": "user@school.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "error": null
}
```

**Errors:**
- `403 Forbidden`: Incorrect credentials

---

### 3. Verify Account
Verifies a user's email address using the verification token.

**Endpoint:** `POST /auth/verify-account`

**Request Body:**
```json
{
  "email": "user@school.com",
  "token": "verification-token-here"
}
```

**Validation Rules:**
- `email`: Must be a valid email
- `token`: Required verification token

---

### 4. Resend Verification Email
Resends the verification email to a user.

**Endpoint:** `POST /auth/resend-verification-email`

**Request Body:**
```json
{
  "email": "user@school.com",
  "redirectUrl": "https://school.edutrac.com/verify"
}
```

**Validation Rules:**
- `email`: Must be a valid email
- `redirectUrl`: Optional redirect URL after verification

---

### 5. Forgot Password
Initiates the password reset process for a user.

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@school.com",
  "tenantId": 1,
  "newPassword": "newsecurepassword123",
  "passwordConfirm": "newsecurepassword123"
}
```

**Validation Rules:**
- `email`: Must be a valid email
- `tenantId`: Required tenant ID
- `newPassword`: Minimum 8 characters
- `passwordConfirm`: Must match `newPassword`

---

### 6. Reset Password
Resets a user's password (requires current password).

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "email": "user@school.com",
  "tenantId": 1,
  "currentPassword": "oldpassword123",
  "newPassword": "newsecurepassword123",
  "passwordConfirm": "newsecurepassword123"
}
```

**Validation Rules:**
- `email`: Must be a valid email
- `tenantId`: Required tenant ID
- `currentPassword`: Required current password
- `newPassword`: Minimum 8 characters
- `passwordConfirm`: Must match `newPassword`

---

<!-- ### 7. Get Current User Info
Retrieves information about the currently authenticated user.

**Endpoint:** `POST /auth/me?userId=1`

**Query Parameters:**
- `userId`: User ID (integer)

--- -->

### 8. Google OAuth - Tenant Registration
Initiates Google OAuth flow for tenant registration.

**Endpoint:** `GET /auth/google/register`

**Query Parameters:**
- `school_name`: Name of the school/organization
- `packagePlanId`: Selected package plan ID

**Example Usage:**
```javascript
    const params = new URLSearchParams({
      school_name: schoolName,
      packagePlanId,
    });

    window.location.href = `${BACKEND_URL}/api/v1/auth/google/register?${params.toString()}`;
---

### 9. Google OAuth - User Login
Initiates Google OAuth flow for existing user login.

**Endpoint:** `GET /auth/google/login-user`

---

### 10. Google OAuth Callback
Callback endpoint for Google OAuth authentication.

**Endpoint:** `GET /auth/google/callback`

**Redirects To:** 
- For tenant registration: `{FRONTEND_URL}/auth/google/callback?access_token={token}`
- For user login: `{FRONTEND_URL}/auth/google/callback?domain={tenantDomain}&token={token}`

---

## Onboarding Endpoints

### 1. Complete Tenant Onboarding

Completes the tenant onboarding process by configuring the school's domain, contact information, branding assets, and public website.

> **Authentication Required:** Yes (Bearer Token)
>
> **Content-Type:** `multipart/form-data`

**Endpoint:** `POST /onboarding`

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

### Request Body

Because this endpoint uploads files, all fields must be sent as `multipart/form-data`.

#### account (JSON String)

```json
{
  "domain": "greenland",
  "contactPhone": "+2348012345678",
  "contactAddress": "12 Admiralty Way, Lekki, Lagos",
  "contactEmail": "info@greenlandschool.com"
}
```

#### website (JSON String)

```json
{
  "themeColor": "#2563EB",
  "bannerTitle": "Welcome to Greenland International School",
  "bannerDescription": "Building Tomorrow's Leaders",
  "FooterTitle": "Excellence • Discipline • Integrity",
  "History": "Greenland International School was established in 2010...",
  "Vision": "To become Africa's leading technology-driven school.",
  "Mission": "To provide world-class education while nurturing future leaders."
}
```

#### gallery (JSON String)

```json
[
  {
    "caption": "School Entrance"
  },
  {
    "caption": "Science Laboratory"
  },
  {
    "caption": "Library"
  }
]
```

If captions are not required:

```json
[
  {},
  {},
  {}
]
```

### File Upload Fields

| Field | Required | Type | Limit |
|--------|----------|------|-------|
| logo | Yes | Image | 1 |
| primaryBanner | Yes | Image | 1 |
| secondaryBanner | Yes | Image | 1 |
| galleryImages | Yes | Image[] | Minimum 3, Maximum 4 |

### Example (Hoppscotch/Postman)

| Key | Type | Value |
|------|------|-------|
| account | Text | `{"domain":"greenland","contactPhone":"+2348012345678","contactAddress":"12 Admiralty Way","contactEmail":"info@greenlandschool.com"}` |
| website | Text | `{"themeColor":"#2563EB","bannerTitle":"Welcome","bannerDescription":"Building Tomorrow's Leaders","FooterTitle":"Excellence • Discipline • Integrity","History":"Founded in 2010","Vision":"To become Africa's leading school","Mission":"To provide world-class education."}` |
| gallery | Text | `[{"caption":"School Entrance"},{"caption":"Science Lab"},{"caption":"Library"}]` |
| logo | File | *(Image)* |
| primaryBanner | File | *(Image)* |
| secondaryBanner | File | *(Image)* |
| galleryImages | File | *(Image 1)* |
| galleryImages | File | *(Image 2)* |
| galleryImages | File | *(Image 3)* |

### Example Frontend Sample Payload Structure

CompleteOnboardingPayload = {
  account: {
    domain: string;
    contactPhone: string;
    contactAddress: string;
    contactEmail: string;
  };

  website: {
    themeColor: string;
    bannerTitle: string;
    bannerDescription: string;
    FooterTitle: string;
    History: string;
    Vision: string;
    Mission: string;
  };

  gallery: {
    caption?: string;
  }[];

  files: {
    logo: File;
    primaryBanner: File;
    secondaryBanner: File;
    galleryImages: File[];
  };
};


### Successful Response

```json
{
  "success": true,
  "message": "Tenant onboarding completed successfully.",
  "data": {
    //tenant details
  },
  "error": null
}
```

### Validation Rules

#### account

- `domain`
  - Required
  - String
  - Must be unique
  - Will become the tenant's subdomain (e.g. `greenland.edutrac.com`)

- `contactPhone`
  - Required
  - String

- `contactAddress`
  - Required
  - String

- `contactEmail`
  - Required
  - Valid email address

#### website

- `themeColor`
  - Required
  - Must be a valid hexadecimal color

- `bannerTitle`
  - Required

- `bannerDescription`
  - Required

- `FooterTitle`
  - Required

- `History`
  - Required

- `Vision`
  - Required

- `Mission`
  - Required

#### gallery

- Required
- Must be an array
- Minimum of **3** items
- Maximum of **4** items
- Each item may optionally contain:

```json
{
  "caption": "Optional caption"
}
```

#### Images

- `logo` is required.
- `primaryBanner` is required.
- `secondaryBanner` is required.
- `galleryImages` is required.
- Minimum **3** gallery images.
- Maximum **4** gallery images.
- Only image files are accepted.
- Maximum upload size per image is **5 MB**.

### Possible Errors

| Status | Description |
|--------|-------------|
| 400 | Missing required fields |
| 400 | Invalid JSON supplied for `account`, `website` or `gallery` |
| 400 | Invalid email address |
| 400 | Invalid hexadecimal theme color |
| 400 | Domain already exists |
| 400 | Missing required images |
| 400 | Less than 3 gallery images |
| 400 | More than 4 gallery images |
| 400 | Invalid image type |
| 400 | Image exceeds 5 MB |
| 401 | Missing or invalid access token |
| 403 | User is not authorized to complete onboarding |


## Invitation Endpoints

### 1. Create User Invitation
Sends an invitation to a new user (Admin, Teacher, Parent, or Student).

**Endpoint:** `POST /invitation`

**Request Body:**
```json
{
  "email": "newuser@school.com",
  "invitationType": "TEACHER"
}
```

**Invitation Types:**
- `TEACHER`
- `STUDENT`
- `PARENT`
- `ADMIN`

**Response (200 OK):**
```json
{
  "message": "Invitation sent successfully",
  "userInvitation": {
    "id": 1,
    "email": "newuser@school.com",
    "type": "TEACHER",
    "status": "PENDING",
    "expiresAt": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-08T10:30:00.000Z"
  }
}
```

**Errors:**
- `409 Conflict`: User with this email already exists in the organization
- `404 Not Found`: Role not found

---

### 2. Validate Invitation Token
Validates if an invitation token is valid, pending, and not expired.

**Endpoint:** `POST /invitation/validate?token=invitation-token-here`

**Query Parameters:**
- `token`: Invitation token

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "newuser@school.com",
  "type": "TEACHER",
  "status": "PENDING",
  "expiresAt": "2024-01-15T10:30:00.000Z",
  "role": {
    "id": 2,
    "name": "TEACHER"
  },
  "tenant": {
    "id": 1,
    "school_name": "ABC International School"
  }
}
```

**Errors:**
- `403 Forbidden`: Invalid, expired, or already used invitation

---

### 3. Accept Invitation (Email/Password)
Accepts an invitation and creates the user account with password.

**Endpoint:** `POST /invitation/accept`

**Request Body:**
```json
{
  "token": "invitation-token-here",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Validation Rules:**
- `token`: Required invitation token
- `password`: Minimum 8 characters
- `firstName`: Required first name
- `lastName`: Required last name

**Errors:**
- `404 Not Found`: Invitation or account not found
- `400 Bad Request`: Invitation already used, expired, or invalid

---

### 4. Accept Invitation (Google)
Accepts an invitation using Google OAuth.

**Endpoint:** `POST /invitation/accept/google`

**Request Body:**
```json
{
  "token": "invitation-token-here",
  "googleToken": "google-oauth-token-here"
}
```

**Validation Rules:**
- `token`: Required invitation token
- `googleToken`: Required Google OAuth token
---

### 5. Resend Invitation
Resends an existing invitation email.

**Endpoint:** `POST /invitation/resend`

**Request Body:**
```json
{
  "invitationId": 1
}
```

**Validation Rules:**
- `invitationId`: Required invitation ID


---

## Enums Reference

### InvitationType
```typescript
enum InvitationType {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  ADMIN = 'ADMIN'
}
```

### InvitationStatus
```typescript
enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}
```

### TenantStatus
```typescript
enum TenantStatus {
  PENDING_EMAIL_VERIFICATION = 'PENDING_EMAIL_VERIFICATION',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED'
}
```

### UserStatus
```typescript
enum UserStatus {
  INVITED = 'INVITED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED'
}
```

### SubscriptionStatus
```typescript
enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
  PAST_DUE = 'PAST_DUE'
}
```

---

## Error Handling

All endpoints may return the following error codes:

- `400 Bad Request`: Invalid input data
- `403 Forbidden`: Insufficient permissions or invalid credentials
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists
- `500 Internal Server Error`: Server-side error

Error response format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```