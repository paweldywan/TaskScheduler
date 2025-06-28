# TaskScheduler

A full-stack web application for scheduling and managing events and tasks.

## Project Structure

- **TaskScheduler.Server/**: ASP.NET Core Web API backend (C#)
- **TaskScheduler.BLL/**: Business logic layer (C#)
- **TaskScheduler.DAL/**: Data access layer with Entity Framework Core (C#)
- **taskscheduler.client/**: Frontend client built with React, TypeScript, and Vite

## Features
- Create, update, and delete events/tasks
- Modern React frontend with TypeScript
- RESTful API backend
- Entity Framework Core for data persistence

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js (LTS)](https://nodejs.org/)

### Backend Setup
1. Navigate to the server directory:
   ```sh
   cd TaskScheduler.Server
   ```
2. Restore dependencies and run migrations:
   ```sh
   dotnet restore
   dotnet ef database update
   ```
3. Run the server:
   ```sh
   dotnet run
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```sh
   cd taskscheduler.client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (default Vite port).

### Configuration
- Backend configuration: `TaskScheduler.Server/appsettings.json`
- Frontend API endpoints: update in `taskscheduler.client/src/requests.ts` if needed

## Deployment
- Publish the backend using `dotnet publish`.
- Build the frontend using `npm run build`.

## License
MIT

---
For more information, visit: https://taskscheduler.paweldywan.com/
