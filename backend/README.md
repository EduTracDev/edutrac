# EduTrac LMS Backend

This repository contains the backend services for the EduTrac Learning Management System (LMS), a comprehensive SaaS platform designed to cater to diverse school needs. The backend is built with scalability, security, and maintainability in mind, supporting various user roles and multi-tenancy.

For detailed architectural decisions, technology choices, and best practices, please refer to the [PROJECT_RULES.md](PROJECT_RULES.md) document.

## Key Features

The EduTrac LMS backend supports core functionalities including:

*   **User Management:** Authentication, authorization, role management.
*   **Student Management:** Enrollment, attendance, grades, progress reports.
*   **Teacher Management:** Assignments, lesson planning, grading.
*   **Parent Portal:** Student information access, communication, fee payment.
*   **Admin Dashboard:** System management, reporting, school settings.
*   **Financial Management:** Fee collection, payment tracking.
*   **Communication:** Announcements, messaging.
*   **Multi-Tenancy:** Support for multiple schools/branches with data isolation.

## Technologies Used

The backend is built using a modern Node.js stack:

*   **Framework:** NestJS (TypeScript)
*   **Database:** PostgreSQL
*   **ORM:** Prisma ORM
*   **Caching/Real-time:** Redis

## Architectural Overview

The backend adopts a **Modular Monolith** architectural style. This approach structures the application with clear boundaries between modules, allowing for simpler initial development and deployment while laying the groundwork for a future transition to microservices as the platform scales.

## Multi-Tenancy Approach

The system implements a **Shared Database, Shared Schema with `tenant_id`** multi-tenancy model. This means all tenants (schools/branches) share the same database and tables, with data segregation enforced by a `tenant_id` column in every relevant table. **Critical enforcement of `tenant_id` filters in all database queries and authorization checks is paramount for data isolation and security.**

## Security Considerations

Security is a top priority for EduTrac LMS. Key security practices include:

*   **Data Encryption:** HTTPS/TLS for data in transit, and encryption at rest for databases and storage.
*   **Authentication:** JWT-based token authentication with support for Multi-Factor Authentication (MFA) and robust password hashing.
*   **Authorization:** Role-Based Access Control (RBAC) with granular permissions and tenant-aware checks.
*   **Input Validation & Sanitization:** Comprehensive server-side validation and sanitization to prevent common vulnerabilities like SQL Injection and XSS.
*   **API Security:** CORS configuration, rate limiting, and careful handling of sensitive data.
*   **Dependency Security:** Regular updates and scanning for vulnerabilities.
*   **Logging & Monitoring:** Comprehensive logging of security events and proactive monitoring.
*   **Secure Deployment:** Principle of Least Privilege, environment variables, secrets management, and network segmentation.
*   **Audits:** Regular security audits and vulnerability scanning.

## Scalability & Performance

The backend is designed for scalability and performance through:

*   **Horizontal Scaling:** Stateless NestJS application instances behind load balancers.
*   **Database Optimization:** Connection pooling, indexing, query optimization, and read replicas for PostgreSQL.
*   **Caching:** Utilizing Redis for API response caching, query caching, and session management.
*   **Asynchronous Processing:** Message queues for long-running tasks.
*   **Monitoring:** Comprehensive APM, database, and infrastructure monitoring.

## Deployment & DevOps

The deployment strategy leverages modern DevOps practices:

*   **Cloud Hosting:** Deployed on a major cloud platform.
*   **Containerization:** Docker for packaging the application.
*   **Orchestration:** Kubernetes for automated deployment, scaling, and management.
*   **CI/CD:** Automated pipelines for continuous integration and continuous deployment.
*   **Infrastructure as Code (IaC):** Managing infrastructure through tools like Terraform.

## Testing Strategy

A robust testing strategy is employed to ensure quality and reliability:

*   **Unit Tests:** Using Jest for isolated component testing.
*   **Integration Tests:** Verifying interactions between components and the database using Jest and Supertest.
*   **End-to-End (E2E) Tests / UAT:** Simulating user flows across the entire stack with tools like Cypress or Playwright.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- Yarn
- Docker & Docker Desktop
- PostgreSQL (optional if using Docker)

### Installation

Clone the repository:

```bash
git clone https://github.com/EduTracDev/edutrac.git
cd backend
````

Install dependencies:

```bash
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and configure it:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
PORT=3000
```

### Start Database (Docker)

Start PostgreSQL container:

```bash
yarn db:dev:up
```

Stop and remove container:

```bash
yarn db:dev:rm
```

Restart database:

```bash
yarn db:dev:rm && yarn db:dev:up
```

### Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
yarn prisma:dev:deploy
```

Open Prisma Studio (optional):

```bash
npx prisma studio
```

### Running the Application

Start development server:

```bash
yarn start:dev
```

Alternative shortcut:

```bash
yarn r
```

Production build:

```bash
yarn build
yarn start:prod
```

### Testing

Run unit tests:

```bash
yarn test
```

Run end-to-end tests:

```bash
yarn test:e2e
```

Run test coverage:

```bash
yarn test:cov
```

Watch mode:

```bash
yarn test:watch
```

### Linting & Formatting

Format code:

```bash
yarn format
```

Run linter:

```bash
yarn lint
```



## License

