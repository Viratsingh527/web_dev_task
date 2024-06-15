# MERN Chat App

## Overview

This repository contains the backend code for a chat web application built using the MERN stack (MongoDB, Express, React, Node.js). The backend is responsible for handling user authentication, real-time messaging, and storing chat history.

## Features

- User Authentication (Registration, Login, Logout)
- Real-time messaging with WebSockets (Socket.IO)
- Storing chat history in MongoDB
- RESTful API for chat functionalities

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **Socket.IO**: Library for real-time web applications

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Fork this repository and then clone to local machine

1. Clone the repository:

   ```bash
   git clone https://github.com/Viratsingh527/web_dev_task.git
   cd web_dev_task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Modify a `.env` file in the root of the project and add the following:

   ```env
   MONGO_URI=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`.

## API Endpoints

- **POST /api/user/**: Register a new user
- **POST /api/user/login**: Login a user
- **POST /api/message**: Send a message
- **GET /api/message/:chatId**: Get all messages of a chat
- **GET /api/chat**: Fetch all chats
- **POST /api/chat**: Access chats
- **POST /api/chat/group**: Create group chat
- **POST /api/chat/rename**: Rename group chat
- **POST /api/chat/groupadd**: add user to group
- **PUT /api/chat/groupremove**: remove user from group

## Contribution

We are actively seeking contributors to develop the frontend for this chat application. If you are interested in contributing, please follow the steps below:

### Frontend Contributor Guidelines

1. **Fork the repository**: Create your own fork of the repository by clicking the "Fork" button at the top right of the repository page.

2. **Clone the forked repository**:

   ```bash
   git clone https://github.com/Viratsingh527/web_dev_task.git
   cd web_dev_task
   ```

3. **Create a new branch** for your frontend development:

   ```bash
   git checkout -b frontend
   ```

4. **Develop the frontend** using your preferred tools and frameworks. We suggest using React to keep the stack consistent.

5. **Commit your changes**:

   ```bash
   git add .
   git commit -m "Add frontend code"
   ```

6. **Push your changes** to your forked repository:

   ```bash
   git push origin frontend
   ```

7. **Submit a pull request**: Go to the original repository and click the "New Pull Request" button. Ensure your pull request includes a detailed description of the changes and any relevant information for the reviewers.

## Contributors

- **Virat Singh**: Backend Developer
- **[Your Name Here]**: Frontend Developer (Looking for contributors!)

## Contact

If you have any questions, feel free to reach out:

- Email: babulkumar527@gmail.com
- GitHub: [Viratsingh527](https://github.com/Viratsingh527)
