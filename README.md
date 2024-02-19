# Node.js Backend for User Profile Management, Posts, and Authentication

This Node.js backend application provides a robust solution for User Profile Management, Post Creation and Retrieval, Commenting System, and User Authentication. It leverages MongoDB for data storage, allowing seamless CRUD operations. The backend is built to be secure, scalable, and easy to use.

## Features

### 1. User Authentication

- **Secure Login/Logout System:** Utilize industry-standard authentication practices to ensure the security of user credentials.
  
### 2. MongoDB Integration

- **Data Storage:** Leverage MongoDB for efficient and flexible data storage.
- **CRUD Operations:** Implement Create, Read, Update, and Delete operations to manage user profiles, posts, and comments.

### 3. API Development

#### User Profile Management

- **Create Profile:** Allow users to create their profiles by providing necessary details.
- **View Profile:** Enable users to view their profiles with relevant information.
- **Edit Profile:** Implement functionality for users to update and modify their profile details.

#### Post Creation and Retrieval

- **Create Post:** Users can create posts, sharing their thoughts or updates.
- **Retrieve Posts:** Implement APIs to retrieve posts, ensuring a seamless user experience.

#### Commenting System

- **Comment on Posts:** Enable users to comment on posts, fostering engagement within the platform.

### 4. Error Handling

- **Comprehensive Error Handling:** Implement robust error handling mechanisms to gracefully manage unexpected scenarios.
- **Logging:** Utilize logging to capture and track errors for easier debugging and issue resolution.

### 5. Documentation

- **Setup Guide:** Provide clear documentation on setting up the backend, including dependencies and configurations.
- **Usage Guide:** Document how to interact with the APIs, explaining the endpoints and expected payloads.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance set up and accessible.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dheeraj2897/Node-js-backend-development.git
    ```

2. **Go to the project directory:**

    ```bash
    cd Node-js-backend-development
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

5. **Postman Collection**
        Use the postman collection for testing APIs of this project.

Go to http://localhost:3000 to view the app running on your browser.

## Tech

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [JWT Tokens](https://jwt.io/)
- Restful
- APIs
- Error Handling
- Logging

## API Endpoints

| APIs                                        | Method | Applications                                 |
| ------------------------------------------- | ------ | -------------------------------------------- |
| **User Authentication**                     |        |                                              |
| `/auth/login`                               | POST   | User login (Authentication) using JWT        |
| `/auth/logout`                              | POST   | User logout                                  |
|                                             |        |                                              |
| **User Management**                         |        |                                              |
| `/users/register`                           | POST   | User sign-up                                 |
| `/users/update/password`                    | PUT    | Update user password                        |
| `/users/:username`                            | GET    | Get user details                             |
| `/users`                           | GET | Get all user details                       |
| `/users/:username`                           | DELETE | Delete user by username                      |
|                                             |        |                                              |
| **Post Related APIs**                       |        |                                              |
| `/posts/createNewPost`                      | POST   | Create new posts                             |
| `/posts/update/:postId`      | PUT    | Update post by postId                       |
| `/posts/:postId`                             | GET    | Get post by postId                           |
| `/posts/user/:userId`                     | GET | Get all post made by user using userId                        |
| `/posts/:postId`                     | DELETE | Delete post by postId                        |
|                                             |        |                                              |
| **Comment Related APIs**                    |        |                                              |
| `/comments/user/:userId/post/:postId`         | POST   | Comment on post by user                      |
| `/comments/update/user/:userId/post/:postId` | PUT    | Update comment on post by user               |
| `/comments/:commentId`                       | GET    | Retrieve comment by commentID               |
| `/comments/user/:userId`                    | GET    | Retrieve all comments by user using userId             |
| `/comments`                       | GET | Get all comments                 |
| `/comments/:commentId`                       | DELETE | Delete comment by commentID                 |
| `/comments/post/postId`                     | GET    | Retrieve all comments on the post by postID  |


