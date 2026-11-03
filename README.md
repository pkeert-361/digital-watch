# Module 03 – Database Integration

A beginner-friendly Blog Application using **Node.js, Express.js and MongoDB**.

## Features
1. Register and log in users.
2. Passwords are hashed with bcrypt before they are stored.
3. Blog posts are saved in MongoDB.
4. Home page retrieves and displays all blog posts.
5. Each post has a separate blog details page.
6. JWT protects the create-blog API.

## Requirements
- Node.js (LTS)
- A free MongoDB Atlas account, or a local MongoDB server
- VS Code

## Setup

### 1. Install dependencies
Open this project folder in VS Code. Open **Terminal → New Terminal**, then run:

```bash
npm install
```

### 2. Configure MongoDB
1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas.
2. Create a free database cluster.
3. In Database Access, create a database username and password.
4. In Network Access, add your current IP address for testing.
5. Select Connect → Drivers and copy the connection string.
6. Make a copy of `.env.example` and name the copy `.env`.
7. Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and the cluster part in `MONGODB_URI` with your Atlas details.
8. Replace the sample `JWT_SECRET` with a long private random value.

**Never upload `.env` or share your database password.** `.gitignore` prevents `.env` from being committed.

### 3. Run the project
```bash
npm start
```
Open this address in your browser: http://localhost:3000

### 4. Test
1. Select Login / Register and create an account.
2. Log in with that account.
3. Create a blog post.
4. Return to Home to see all posts.
5. Select Read full blog to open its individual details page.

## Main API routes
| Method | Route | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in and receive a token |
| GET | `/api/blogs` | Retrieve all blog posts |
| GET | `/api/blogs/:id` | Retrieve one blog post |
| POST | `/api/blogs` | Save a blog post (login required) |
| GET | `/api/health` | Check whether the API is running |

## Important deployment note
GitHub Pages hosts static files only. It cannot run this Node.js/Express backend or connect to MongoDB securely. For a working live application, deploy the Node.js server to a backend host and keep the MongoDB URI and JWT secret in that host's environment variables. Do not put database credentials in frontend JavaScript.

## Suggested GitHub repository description
Module 03 Database Integration – Blog Application using Node.js, Express.js and MongoDB. Includes user registration/login, hashed passwords, blog storage, blog listing and individual blog details.
