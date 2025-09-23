# HCI — Zara Clone

This repository contains a simple Zara-like e-commerce application implemented:

- `backend` — Spring Boot REST API (Java, Maven) with authentication, products, categories, cart, transactions, file storage via MinIO, and database migrations.
- `frontend` — React + Vite frontend (TypeScript) providing the web UI used by customers and administrators.

## Table of contents

- [Features](#features)
- [Architecture & Tech stack](#architecture--tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start (Docker Compose)](#quick-start-docker-compose)
- [Running services individually](#running-services-individually)
	- [Backend (Spring Boot)](#backend-spring-boot)
	- [Frontend (Vite)](#frontend-vite)
- [Environment / Configuration](#environment--configuration)
- [Ports](#ports)
- [Database migrations](#database-migrations)
- [API docs and MinIO console](#api-docs-and-minio-console)


## Features

- User authentication (JWT)
- Product catalog with variants and images
- Categories and search
- Shopping cart and checkout (transactions)
- Shipping addresses management
- File storage using MinIO
- Database migrations with SQL files present in `backend/src/main/resources/db/migration`

## Architecture & Tech stack

- Backend: Java Spring Boot (Maven), uses JWT authentication, MinIO for object storage, and a PostgreSQL database.
- Frontend: React + Vite with TypeScript.
- Dev tooling: Docker & Docker Compose for local development with reproducible environments.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Git (optional) to clone the repository.
- (Optional) Java 17+ and Maven if you prefer to run the backend outside Docker.
- (Optional) Node.js 18+ and npm/yarn/pnpm if you prefer to run the frontend outside Docker.

## Quick start (Docker Compose)

This project includes a `docker-compose.yml` that starts three services used for development:

- `zara-db` — PostgreSQL database
- `minio` — MinIO object storage for product images
- `backend` — Spring Boot application
- `frontend-dev` — Vite dev server for the frontend

From the repository root, run:

```powershell
docker compose up --build
```

Notes:

- The compose file mounts the frontend into the container for hot-reload development (`frontend-dev`).
- Environment variables for services are read from `backend/.env` and `frontend/.env` where applicable. A `.env.example` is provided in both folders.

When the stack is ready:

- Frontend dev server: http://localhost:5173
- Backend API: http://localhost:6789
- Swagger UI (backend API docs): http://localhost:6789/swagger-ui/index.html
- MinIO console: http://localhost:9091

## Running services individually

### Backend (Spring Boot)

From the `backend` folder you can build and run the backend using Maven or the included jar:

Build with Maven (requires JDK + Maven):

```powershell
cd backend; .\mvnw.cmd clean package -DskipTests
java -jar target\backend-0.0.1-SNAPSHOT.jar
```

Or run in development with your IDE (imports the Maven project).

The app expects configuration from `backend/.env` (used by Docker) and `src/main/resources/application.yml` for default values. Adjust environment variables as needed.

### Frontend (Vite)

From the `frontend` folder you can run the frontend dev server:

```powershell
cd frontend
npm install
npm run dev
```

This will start the dev server on port `5173` by default.

If you prefer to create a production build:

```powershell
npm run build
npm run preview
```

## Environment / Configuration

- Backend: see `backend/.env` and `backend/.env.example`. The backend also contains `application.yml` in `src/main/resources` for Spring configuration and DB settings.
- Frontend: see `frontend/.env` and `frontend/.env.example`. The frontend uses `src/utils/env.ts` to read environment values.

Important values:

- PostgreSQL port: `6644` (mapped in `docker-compose.yml`). The container runs Postgres on port `6644`.
- Backend port: `6789` (application listens here in Docker Compose mapping).
- MinIO: access via ports `9000` (S3 API) and `9091` (console).

Adjust the `.env` files before running if you need to change credentials or endpoints.

## Ports

- `5173` — Frontend dev server
- `6789` — Backend API
- `6644` — PostgreSQL (container port exposed on host)
- `9000` — MinIO S3 API
- `9091` — MinIO console

## Database migrations

SQL migration files are located in `backend/src/main/resources/db/migration` as `V1__...`, `V2__...`, etc. The project will apply migrations automatically if it is configured to run them on startup.

## API docs and MinIO console

- Swagger UI is available at `http://localhost:6789/swagger-ui/index.html` when the backend is running.
- MinIO console is available at `http://localhost:9091` (credentials come from `backend/.env` when started via Docker Compose).