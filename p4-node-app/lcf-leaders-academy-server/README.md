# Leaders Academy API Documentation

This documentation provides an overview of the routes and endpoints available in the Leaders Academy API.

## Table of Contents

- [Authentication](#authentication)
- [User Management](#user-management)
- [Course Offerings](#course-offerings)
- [Enrollments](#enrollments)

## Authentication

### `POST /api/1.0/auth/login`

- **Description**: Authenticate a user via Google login.
- **Request Body**:
  - `email` (string): The user's email.
- **Response**:
  - `200 OK`: Successful authentication, returns an access token.
  - `401 Unauthorized`: Invalid credentials.

## User Management

### `GET /api/1.0/users/:id/enrollments`

- **Description**: Retrieve all active enrollments for a student by their ID.
- **Parameters**:
  - `id` (string): The ID of the student.
- **Response**:
  - `200 OK`: Returns a list of active enrollments.
  - `404 Not Found`: No enrollments found for the given student ID.

### `PATCH /api/1.0/users/:id`

- **Description**: Update user information.
- **Parameters**:
  - `id` (string): The ID of the user.
- **Request Body**:
  - Fields to update (e.g., `firstName`, `lastName`, etc.).
- **Response**:
  - `200 OK`: User information successfully updated.
  - `400 Bad Request`: Invalid input.
  - `404 Not Found`: User not found.

### `GET /api/1.0/users/email/:email`

- **Description**: Retrieve a user by their email.
- **Parameters**:
  - `email` (string): The email of the user.
- **Response**:
  - `200 OK`: Returns user details.
  - `404 Not Found`: User not found with the provided email.

## Course Offerings

### `GET /api/1.0/course-offerings/current`

- **Description**: Retrieve the current course offerings.
- **Response**:
  - `200 OK`: Returns a list of current course offerings.
  - `404 Not Found`: No current course offerings found.

### `GET /api/1.0/course-offerings/:id`

- **Description**: Retrieve details for a specific course offering by its ID.
- **Parameters**:
  - `id` (string): The ID of the course offering.
- **Response**:
  - `200 OK`: Returns the course offering details.
  - `404 Not Found`: Course offering not found with the provided ID.

## Enrollments

### `POST /api/1.0/enrollments`

- **Description**: Create a new enrollment for a student in a course offering.
- **Request Body**:
  - `studentID` (string): The ID of the student.
  - `courseOfferingID` (string): The ID of the course offering.
- **Response**:
  - `201 Created`: Enrollment successfully created.
  - `400 Bad Request`: Invalid input data.
  - `404 Not Found`: Course offering or student not found.

### `GET /api/1.0/enrollments/:id`

- **Description**: Retrieve details of a specific enrollment by its ID.
- **Parameters**:
  - `id` (string): The ID of the enrollment.
- **Response**:
  - `200 OK`: Returns the enrollment details.
  - `404 Not Found`: Enrollment not found with the provided ID.

### `DELETE /api/1.0/enrollments/:id`

- **Description**: Delete an enrollment by its ID.
- **Parameters**:
  - `id` (string): The ID of the enrollment.
- **Response**:
  - `204 No Content`: Enrollment successfully deleted.
  - `404 Not Found`: Enrollment not found with the provided ID.
