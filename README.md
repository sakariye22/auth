Here's a quick README that outlines the endpoints provided by your API for driver and user operations, including their functionalities and usage:

---

# Driver and User API Endpoints

This document provides a quick overview of the available endpoints within our API, designed for managing driver and user registrations, logins, and access to protected resources. These endpoints are part of an Express.js application that leverages MongoDB for data persistence, bcryptjs for password hashing, and jsonwebtoken for authentication.

## Base URL

The API is hosted at: `https://api-hdzvzie4ya-uc.a.run.app/api`

## Common Headers

For endpoints requiring authentication, include the following header:

- `Authorization`: `Bearer <token>`

## Endpoints

### Registration

- **Register Driver**
  - **POST** `/register/driver`
  - **Body**: `name`, `email`, `password`, `phone_number`
  - **Description**: Registers a new driver with the provided details.

- **Register User**
  - **POST** `/register/user`
  - **Body**: `name`, `email`, `password`
  - **Description**: Registers a new user with the provided details.

### Login

- **Login Driver**
  - **POST** `/login/driver`
  - **Body**: `email`, `password`
  - **Description**: Authenticates a driver and returns an authentication token.

- **Login User**
  - **POST** `/login/user`
  - **Body**: `email`, `password`
  - **Description**: Authenticates a user and returns an authentication token.

### Protected Resources

- **Protected Driver Endpoint**
  - **GET** `/protected`
  - **Authentication Required**
  - **Description**: Access a protected resource for drivers. Requires a valid authentication token.

- **Protected User Endpoint**
  - **GET** `/pruser`
  - **Authentication Required**
  - **Description**: Access a protected resource for users. Requires a valid authentication token.

## Authentication

Authentication is handled via JWT (JSON Web Tokens). Obtain a token by logging in as a driver or user and include it in the Authorization header as a Bearer token for accessing protected resources.

## Error Handling

Responses from these endpoints will include appropriate HTTP status codes and, in case of errors, a JSON object with an error message. For example:

```json
{
  "message": "Error message"
}
```

## Environment Variables

Ensure the following environment variables are set in your deployment:

- `JWT_SECRET`: The secret key for signing JWTs.
- `MONGODB_URL`: The connection string for MongoDB.

---

This README is designed to get you started quickly with the provided endpoints. For further details on request and response formats, refer to the specific endpoint documentation or the code comments within the controller files.