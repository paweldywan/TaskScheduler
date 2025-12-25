# TaskScheduler

A full-stack web application for scheduling and managing events and tasks with an interactive calendar interface. Features ASP.NET Core backend with PostgreSQL database, React frontend with TypeScript, and ASP.NET Core Identity for user authentication.

## Application URL

- **Production**: https://taskscheduler.paweldywan.com/
- **HTTPS (Local)**: https://localhost:7243
- **HTTP (Local)**: http://localhost:5098
- **Swagger API (Development)**: https://localhost:7243/swagger

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

TaskScheduler is a modern web application designed to help users organize and manage their events and tasks efficiently. Built with a clean architecture approach, it separates concerns into distinct layers: presentation (React), business logic, and data access. The application provides an intuitive drag-and-drop calendar interface powered by React Big Calendar, allowing users to create, edit, and reschedule events seamlessly.

The backend API is built with ASP.NET Core 8.0 and follows RESTful principles, providing secure endpoints for event management. User authentication and authorization are handled by ASP.NET Core Identity, ensuring that users can only access and modify their own events.

## Key Features

- **Interactive Calendar Interface**: Drag-and-drop functionality for easy event rescheduling
- **Event Management**: Create, read, update, and delete events with intuitive forms
- **User Authentication**: Secure registration and login system using ASP.NET Core Identity
- **Responsive Design**: Bootstrap-based UI that works across desktop and mobile devices
- **Real-time Updates**: Immediate reflection of changes in the calendar view
- **All-Day Events**: Support for both timed and all-day events
- **Week/Month Views**: Multiple calendar views for different planning needs
- **User Isolation**: Each user can only see and manage their own events
- **Swagger API Documentation**: Interactive API documentation in development mode
- **Database Seeding**: Automatic sample data generation for testing

## Architecture

TaskScheduler follows a three-tier architecture pattern with clear separation of concerns:

```
+--------------------------------------------------+
|                  React Frontend                   |
|            (taskscheduler.client)                |
|   - React 18.3.1                                 |
|   - TypeScript 5.6.3                             |
|   - React Big Calendar                           |
|   - Bootstrap/Reactstrap                         |
|   - Vite Build Tool                              |
+--------------------------------------------------+
                        |
                   HTTPS/REST API
                        |
+--------------------------------------------------+
|              ASP.NET Core Web API                |
|            (TaskScheduler.Server)                |
|   - ASP.NET Core 8.0                             |
|   - Identity Authentication                      |
|   - Swagger/OpenAPI                              |
|   - Razor Pages for Identity UI                  |
+--------------------------------------------------+
                        |
+--------------------------------------------------+
|              Business Logic Layer                |
|             (TaskScheduler.BLL)                  |
|   - EventService                                 |
|   - Service Interfaces                           |
|   - Business Rules                               |
+--------------------------------------------------+
                        |
+--------------------------------------------------+
|              Data Access Layer                   |
|             (TaskScheduler.DAL)                  |
|   - Entity Framework Core 8.0                    |
|   - PostgreSQL Provider (Npgsql)                 |
|   - DbContext & Entities                         |
|   - Migrations & Seeding                         |
+--------------------------------------------------+
                        |
+--------------------------------------------------+
|             PostgreSQL Database                   |
|   - Events Table                                 |
|   - Identity Tables                              |
|   - DataProtection Keys                          |
+--------------------------------------------------+
```

### Layer Responsibilities

**Frontend (taskscheduler.client)**
- User interface and interactions
- Calendar visualization
- Form handling and validation
- HTTP requests to backend API

**Web API (TaskScheduler.Server)**
- HTTP request handling
- Authentication and authorization
- API endpoint routing
- Middleware pipeline configuration

**Business Logic (TaskScheduler.BLL)**
- Business rules enforcement
- Service layer abstraction
- User context management
- Data validation

**Data Access (TaskScheduler.DAL)**
- Database context management
- Entity configurations
- Database migrations
- Data seeding

## Technology Stack

### Backend
- **.NET 8.0**: Latest long-term support version of .NET
- **ASP.NET Core**: Web framework for building APIs
- **Entity Framework Core 8.0.10**: ORM for database access
- **Npgsql 8.0.10**: PostgreSQL database provider
- **ASP.NET Core Identity 8.0.10**: Authentication and authorization
- **Swashbuckle 6.9.0**: Swagger/OpenAPI documentation
- **C# 12**: Programming language with nullable reference types enabled

### Frontend
- **React 18.3.1**: UI library
- **TypeScript 5.6.3**: Type-safe JavaScript
- **Vite 5.4.10**: Fast build tool and dev server
- **React Big Calendar 1.15.0**: Calendar component
- **Bootstrap 5.3.3**: CSS framework
- **Reactstrap 9.2.3**: React Bootstrap components
- **date-fns 4.1.0**: Date utility library
- **ESLint**: Code linting and quality

### Database
- **PostgreSQL**: Relational database management system

### Development Tools
- **Visual Studio 2022**: Primary IDE
- **npm**: Package manager for frontend dependencies
- **EF Core Tools**: Database migration management

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- [Node.js](https://nodejs.org/) (LTS version 18.x or later)
- [PostgreSQL](https://www.postgresql.org/download/) (version 14 or later)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/) (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paweldywan/TaskScheduler.git
   cd TaskScheduler
   ```

2. **Install backend dependencies**
   ```bash
   cd TaskScheduler.Server
   dotnet restore
   cd ..
   ```

3. **Install frontend dependencies**
   ```bash
   cd taskscheduler.client
   npm install
   cd ..
   ```

### Configuration

1. **Database Connection String**

   Create a `appsettings.Development.json` file in the `TaskScheduler.Server` directory:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=TaskScheduler;Username=your_username;Password=your_password"
     }
   }
   ```

   Replace `your_username` and `your_password` with your PostgreSQL credentials.

2. **Apply Database Migrations**
   ```bash
   cd TaskScheduler.Server
   dotnet ef database update
   ```

   This will create the database schema and apply all migrations.

### Running the Application

#### Option 1: Using Visual Studio

1. Open `TaskScheduler.sln` in Visual Studio 2022
2. Set `TaskScheduler.Server` as the startup project
3. Press `F5` or click the "Start" button
4. The application will launch with both backend and frontend (SPA proxy handles frontend)

#### Option 2: Using Command Line

1. **Start the backend server**
   ```bash
   cd TaskScheduler.Server
   dotnet run
   ```

   The API will be available at:
   - HTTPS: https://localhost:7243
   - HTTP: http://localhost:5098
   - Swagger UI: https://localhost:7243/swagger

2. **Start the frontend development server** (in a separate terminal)
   ```bash
   cd taskscheduler.client
   npm run dev
   ```

   The frontend will be available at: http://localhost:5173

3. **Access the application**
   - Navigate to https://localhost:7243 in your browser
   - The SPA proxy will automatically forward frontend requests to the Vite dev server
   - Register a new account to start using the application

## API Documentation

The API provides RESTful endpoints for event management. All endpoints require authentication.

### Base URL
```
https://localhost:7243/api
```

### Authentication
The API uses cookie-based authentication with ASP.NET Core Identity. Users must register and log in through the `/Identity/Account/Register` and `/Identity/Account/Login` pages.

### Endpoints

#### Get All Events
```http
GET /api/Event
```
Returns all events for the authenticated user.

**Response**: `200 OK`
```json
[
  {
    "resource": 1,
    "title": "Team Meeting",
    "start": "2024-11-01T10:00:00Z",
    "end": "2024-11-01T11:00:00Z",
    "allDay": false,
    "userId": "user-id-guid"
  }
]
```

#### Create Event
```http
POST /api/Event
Content-Type: application/json

{
  "title": "New Event",
  "start": "2024-11-01T14:00:00Z",
  "end": "2024-11-01T15:00:00Z",
  "allDay": false
}
```

**Response**: `200 OK`

#### Update Event
```http
PUT /api/Event
Content-Type: application/json

{
  "resource": 1,
  "title": "Updated Event",
  "start": "2024-11-01T15:00:00Z",
  "end": "2024-11-01T16:00:00Z",
  "allDay": false
}
```

**Response**: `200 OK`

#### Delete Event
```http
DELETE /api/Event/{id}
```

**Response**: `200 OK`

### Error Responses

- `401 Unauthorized`: User is not authenticated
- `403 Forbidden`: User doesn't have permission to access the resource
- `404 Not Found`: Resource not found

### Interactive API Documentation

When running in Development mode, Swagger UI is available at:
```
https://localhost:7243/swagger
```

This provides an interactive interface to explore and test all API endpoints.

## Project Structure

```
TaskScheduler/
|
+-- TaskScheduler.Server/              # ASP.NET Core Web API
|   +-- Areas/
|   |   +-- Identity/                  # ASP.NET Identity scaffolded pages
|   |       +-- Pages/
|   |           +-- Account/           # Login, Register, etc.
|   +-- Controllers/
|   |   +-- EventController.cs         # Event API endpoints
|   +-- Properties/
|   |   +-- launchSettings.json        # Launch profiles and URLs
|   +-- wwwroot/                       # Static files
|   +-- Program.cs                     # Application entry point
|   +-- appsettings.json               # Configuration
|   +-- TaskScheduler.Server.csproj
|
+-- TaskScheduler.BLL/                 # Business Logic Layer
|   +-- Interfaces/
|   |   +-- IEventService.cs           # Service interface
|   +-- Services/
|   |   +-- EventService.cs            # Event business logic
|   +-- TaskScheduler.BLL.csproj
|
+-- TaskScheduler.DAL/                 # Data Access Layer
|   +-- Configuration/
|   |   +-- Entity/
|   |       +-- EventConfiguration.cs  # EF Core entity configuration
|   +-- Entities/
|   |   +-- Event.cs                   # Event entity model
|   +-- Migrations/                    # EF Core migrations
|   +-- SampleData/
|   |   +-- TaskSchedulerSeeder.cs     # Database seeding
|   +-- TaskSchedulerContext.cs        # DbContext
|   +-- TaskScheduler.DAL.csproj
|
+-- taskscheduler.client/              # React Frontend
|   +-- src/
|   |   +-- components/
|   |   |   +-- AppForm.tsx            # Reusable form component
|   |   |   +-- AppModal.tsx           # Modal dialog component
|   |   +-- App.tsx                    # Main application component
|   |   +-- interfaces.ts              # TypeScript interfaces
|   |   +-- main.tsx                   # Application entry point
|   |   +-- requests.ts                # API request functions
|   +-- index.html                     # HTML template
|   +-- package.json                   # npm dependencies
|   +-- tsconfig.json                  # TypeScript configuration
|   +-- vite.config.ts                 # Vite configuration
|   +-- taskscheduler.client.esproj
|
+-- TaskScheduler.sln                  # Visual Studio solution file
+-- README.md                          # This file
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
   ```bash
   git clone https://github.com/paweldywan/TaskScheduler.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues

### Code Style Guidelines

- **C#**: Follow Microsoft's C# coding conventions
- **TypeScript/React**: Follow Airbnb's JavaScript/React style guide
- **Naming**: Use descriptive names for variables, methods, and classes
- **Comments**: Add comments for complex logic
- **Testing**: Write unit tests for new features

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

**Pawel Dywan**
- GitHub: [@paweldywan](https://github.com/paweldywan)
- Website: [https://paweldywan.com/](https://paweldywan.com/)

## Acknowledgments

- [React Big Calendar](https://github.com/jquense/react-big-calendar) - Excellent calendar component for React
- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) - Comprehensive web framework
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) - Modern ORM for .NET
- [Bootstrap](https://getbootstrap.com/) - Popular CSS framework
- [Vite](https://vitejs.dev/) - Fast and modern build tool
- [PostgreSQL](https://www.postgresql.org/) - Powerful open-source database
- Microsoft for providing excellent documentation and tools
- The open-source community for inspiration and support

---

For more information and updates, visit: [https://paweldywan.com/](https://paweldywan.com/)
