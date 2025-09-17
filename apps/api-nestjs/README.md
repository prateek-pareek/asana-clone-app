# Asana Clone API - NestJS

This is a NestJS API that has been converted from the original Go API to maintain exact compatibility with request parameters, response parameters, and endpoints.

## Features

- **GraphQL API** with Apollo Server
- **MongoDB** database with Mongoose
- **JWT Authentication** with Passport
- **TypeScript** with strict type checking
- **Modular Architecture** following NestJS best practices
- **Exact API Compatibility** with the original Go API

## API Endpoints

### GraphQL
- **Playground**: `http://localhost:8080/graphql`
- **Endpoint**: `http://localhost:8080/graphql`

### REST
- **Health Check**: `GET /api/readiness_check`
- **Seed Table**: `GET /api/seedTable`
- **Revoke Tokens**: `POST /api/revoke_refresh_tokens`

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Update environment variables
# MONGODB_URI=mongodb://localhost:27017/asana_clone
# JWT_SECRET=your-secret-key
# PORT=8080
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Database

The application uses MongoDB. Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if using Docker)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
# https://docs.mongodb.com/manual/installation/
```

## API Compatibility

This NestJS API maintains exact compatibility with the original Go API:

- **Same GraphQL Schema**: All types, queries, mutations, and subscriptions match exactly
- **Same Request/Response Formats**: All DTOs and input/output types are identical
- **Same Endpoints**: All REST endpoints have the same paths and methods
- **Same Authentication**: JWT-based authentication with the same token format

## Modules

- **Me**: User profile management
- **Workspace**: Workspace management
- **Project**: Project management
- **Task**: Task management with full CRUD operations
- **Color**: Color management
- **Tag**: Tag management
- **Teammate**: Teammate management
- **FileType**: File type management
- **Icon**: Icon management
- **Mention**: Mention management
- **Activity**: Activity management
- **Auth**: Authentication and authorization

## Development

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

## Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/asana_clone

# Server
PORT=8080
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_SERVICE_KEY=your-firebase-service-key

# CORS
CORS_ORIGIN=*
```

## GraphQL Schema

The GraphQL schema includes:

- **Queries**: Get single items and paginated lists
- **Mutations**: Create, update, delete operations
- **Subscriptions**: Real-time updates
- **Types**: All entities with proper relationships
- **Inputs**: Validation for all input data

## Database Schema

MongoDB collections:
- `me` - User profiles
- `workspaces` - Workspaces
- `projects` - Projects
- `tasks` - Tasks
- `colors` - Colors
- `tags` - Tags
- `teammates` - Teammates
- `file_types` - File types
- `icons` - Icons
- `mentions` - Mentions
- `activities` - Activities

## Contributing

1. Follow TypeScript best practices
2. Use proper JSDoc comments
3. Write tests for new features
4. Follow the existing code structure
5. Maintain API compatibility with the Go version

## License

MIT
