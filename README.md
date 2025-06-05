# Task Manager Backend

This is a simple REST API for managing tasks, built as part of an internship entrance challenge for a Backend Developer role.

## Technologies Used

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Dockerized for local development)
- **ORM:** [Prisma ORM](https://www.prisma.io/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Validation:** `class-validator` and `class-transformer`
- **Documentation:** [Swagger/OpenAPI](https://swagger.io/)

## Features

- **View a list of tasks:** `GET /api/tasks`
- **Add a new task:** `POST /api/tasks`
- **Mark a task as completed:** `PUT /api/tasks/:id`
- **Delete a task:** `DELETE /api/tasks/:id`
- **Input Validation:** Ensures data integrity for task creation.
- **Comprehensive Error Handling:** Returns appropriate HTTP status codes (e.g., 404 Not Found, 400 Bad Request) with descriptive messages.

## Setup & Running Locally

### Prerequisites

- Node.js (LTS version recommended)
- npm (or yarn)
- Docker and Docker Compose (for running PostgreSQL locally)
- NestJS CLI (`npm i -g @nestjs/cli`)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/abnsol/Task-Manager-Backend.git](https://github.com/abnsol/Task-Manager-Backend.git)
    cd task-manager-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up PostgreSQL with Docker:**
    Create a `docker-compose.yml` file in the project root (if not already present):

    ```yaml
    # docker-compose.yml
    version: '3.8'
    services:
      db:
        image: postgres:15-alpine
        restart: always
        environment:
          POSTGRES_DB: your_db_name # IMPORTANT: Replace with your actual database name
          POSTGRES_USER: your_db_user # IMPORTANT: Replace with your actual user
          POSTGRES_PASSWORD: your_db_password # IMPORTANT: Replace with a strong password
        ports:
          - '5432:5432'
        volumes:
          - db_data:/var/lib/postgresql/data
    volumes:
      db_data:
    ```

    Start the database container:

    ```bash
    docker-compose up -d
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the project root and add your database connection string. Make sure the credentials match those in `docker-compose.yml`.

    ```dotenv
    # .env
    DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name?schema=public"
    ```

5.  **Run Prisma Migrations:**
    This will create the `tasks` table in your database.

    ```bash
    npx prisma migrate dev --name init
    ```

6.  **Start the API in development mode:**
    ```bash
    npm run start:dev
    ```
    The API will be running at `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api`.

### 1. Get all tasks

- **URL:** `/api/tasks`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "completed": false,
      "createdAt": "2023-10-27T10:00:00.000Z",
      "updatedAt": "2023-10-27T10:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Read a book",
      "completed": true,
      "createdAt": "2023-10-27T11:00:00.000Z",
      "updatedAt": "2023-10-27T11:00:00.000Z"
    }
  ]
  ```

### 2. Get a single task by ID

- **URL:** `/api/tasks/:id`
- **Method:** `GET`
- **Example:** `/api/tasks/1`
- **Response (Success):**
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": false,
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  }
  ```
- **Response (Not Found - 404):**
  ```json
  {
    "statusCode": 404,
    "message": "Task with ID 99 not found",
    "error": "Not Found"
  }
  ```

### 3. Add a new task

- **URL:** `/api/tasks`
- **Method:** `POST`
- **Request Body (JSON):**
  ```json
  {
    "title": "New task item"
  }
  ```
- **Response (Success - 201 Created):**
  ```json
  {
    "id": 3,
    "title": "New task item",
    "completed": false,
    "createdAt": "2023-10-27T12:00:00.000Z",
    "updatedAt": "2023-10-27T12:00:00.000Z"
  }
  ```
- **Response (Validation Error - 400 Bad Request):**
  ```json
  {
    "statusCode": 400,
    "message": ["title should not be empty", "title must be a string"],
    "error": "Bad Request"
  }
  ```

### 4. Mark a task as completed (or update any field)

- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Example:** `/api/tasks/1`
- **Request Body (JSON):**
  ```json
  {
    "completed": true
  }
  ```
- **Response (Success):**
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "completed": true,
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T13:00:00.000Z"
  }
  ```
- **Response (Not Found - 404):**
  ```json
  {
    "statusCode": 404,
    "message": "Task with ID 99 not found",
    "error": "Not Found"
  }
  ```

### 5. Delete a task

- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Example:** `/api/tasks/1`
- **Response (Success - 204 No Content):** (No body content)
- **Response (Not Found - 404):**
  ```json
  {
    "statusCode": 404,
    "message": "Task with ID 99 not found",
    "error": "Not Found"
  }
  ```

## API Documentation (Swagger)

Once the application is running, you can access the interactive API documentation at:
`http://localhost:3000/api-docs`

## Bonus Features Implemented

- **Input Validation:** Ensured `title` is not empty and is a string for `CreateTaskDto`.
- **Proper Error Handling:** Utilizes NestJS's exception layer for `NotFoundException` and `BadRequestException` (from `ValidationPipe`).
- **Database Persistence:** Uses PostgreSQL with Prisma ORM for data storage.
- **API Documentation:** Integrated Swagger for easy API exploration.
