
## Description

This is a Project Management System built with [NestJS](https://github.com/nestjs/nest) framework, featuring real-time updates through WebSocket, MySQL database integration, and comprehensive project management capabilities.

## Prerequisites

Before setting up the project, ensure you have:
- Node.js (latest LTS version)
- Docker and Docker Compose
- MySQL 8.0 (if not using Docker)
- Git

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

Using Docker (Recommended):
```bash
# Start MySQL container
docker compose up --build -d
```

This will create a MySQL 8.0 instance with:
- Database: project-management
- Username: root
- Password: 123456
- Port: 3306

### 3. Environment Configuration

Create `.env` file in the root directory:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123456
DB_DATABASE=project-management

# Server
PORT=3000
```

### 4. Initialize Mock Data
```bash
npm run seed:init-mock-data
```

## Running the Project

### Development Mode
```bash
# Watch mode with auto-reload
npm run start:dev
```

### Production Mode
```bash
# Build the project
npm run build

# Start production server
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## Available Commands

### Project Management
- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint and fix code

### Development
- `npm run start` - Start the server
- `npm run start:dev` - Start with auto-reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production

### Database
- `npm run seed:init-mock-data` - Initialize database with mock data

### Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Project Structure

```
src/
├── controllers/        # API Controllers
├── dto/               # Data Transfer Objects
├── entities/          # Database Entities
├── interceptors/      # Request/Response Interceptors
├── mocks/            # Mock Data for Testing
├── scripts/          # Utility Scripts
├── services/         # Business Logic
├── utils/            # Helper Functions
├── validators/       # Custom Validators
└── websocket/        # WebSocket Implementation
```

## Features

- User Management
- Project Management
- Sprint Planning
- Ticket Management
- Real-time Updates via WebSocket
- Meeting Management
- Planning Documents
- Sprint Retrospectives
- Secure Authentication
- Role-based Access Control

## API Documentation

Once the server is running, access the API documentation at:
- http://localhost:3000/api (default port)

## SSL Configuration

SSL certificates are located in the `ssl` folder:
- `cert.pem` - SSL certificate
- `key.pem` - SSL private key

## Technologies

- NestJS - Backend Framework
- TypeORM - Database ORM
- MySQL 8 - Database
- Socket.IO - Real-time Communication
- Class Validator - DTO Validation
- Docker - Containerization

## License

This project is licensed under the MIT License.

PORT=3000
API_PATH=api/v1

MYSQL_ROOT_PASSWORD=     # Mật khẩu cho user root
MYSQL_DATABASE=project-management
MYSQL_ROOT_USERNAME=root
MYSQL_HOST=127.0.0.1
