# API Documentation

## Authentication

### Register User
- **Type:** POST
- **URL:** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "phone": "+1234567890"
  }
    ```
- **Response :**
    ```json
    {
    "message": "OTP sent successfully. Please verify to continue."
    }   
    ```


### Verify OTP and Set Password
- **Type:** POST
- **URL:** `/api/auth/verify-otp`
- **Body:**
  ```json
  {
  "email": "user@example.com",
  "otp": "123456",
  "password": "newSecurePassword123"
  }
    ```
- **Response :**
    ```json
    {
    "message": "OTP verified and password set successfully."
    }
    ```


### Login
- **Type:** POST
- **URL:** `/api/auth/login`
- **Body:**
  ```json
  {
  "email": "user@example.com",
  "password": "newSecurePassword123"
  }

    ```
- **Response :**
    ```json
    {
  "token": "jwt_token_here"
  }
    ```

## Profile Management

### Fetch User Profile
- **Type:** GET
- **URL:** `/api/profile/`
- **Header:** `Authorization: Bearer <JWT_Token>`
- **Response :**
    ```json
    {
  "_id": "65e21156176b13cfa97cb448",
  "email": "user@example.com",
  "createdAt": "2024-03-01T17:33:10.649Z",
  "updatedAt": "2024-03-01T17:54:45.717Z",
  "address": "123 Main St",
  "age": 85,
  "dateOfBirth": "1947-08-15T00:00:00.000Z",
  "fullName": "Deepak Joshi",
  "profilePhoto": "http://localhost:5000/uploads/profilePhoto-1709315685516.jpeg",
  "phone" : "123456678"
  }
    ```



### Update User Profile
- **Type:** POST
- **URL:** `/api/profile/update`
- **Header:** `Authorization: Bearer <JWT_Token>`
- **Body (form-data):**
  - `fullName`: "Deepak Joshi"
  - `address`: "123 Main St"
  - `age`: "85"
  - `dateOfBirth`: "1990-01-01"
  - `profilePhoto`: "(attach image file here)"
  - `phone`: "255855588"
- **Response :**
    ```json
    {
  "_id": "65e21156176b13cfa97cb448",
  "email": "user@example.com",
  "createdAt": "2024-03-01T17:33:10.649Z",
  "updatedAt": "2024-03-01T18:03:03.938Z",
  "address": "123 Main St",
  "age": 85,
  "dateOfBirth": "1947-08-15T00:00:00.000Z",
  "fullName": "Deepak Joshi",
  "phone" : "123456678",
  "profilePhoto": "http://localhost:5000/uploads/profilePhoto-1709316182316.jpeg"
  }
    ```