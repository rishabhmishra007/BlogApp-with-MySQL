# Blog App with MySQL

A full-stack blogging platform built with React (Vite), Node.js, Express, and MySQL. This project features user authentication, post creation/editing, image uploads, and a modern responsive UI.

## Features

- User registration and login with secure password hashing (argon2)
- JWT-based authentication with HTTP-only cookies
- Create, edit, and delete blog posts
- Rich text editor for writing posts (ReactQuill)
- Image upload and management
- Filter posts by category
- Responsive and modern UI
- Error handling and form validation

## Tech Stack

- **Frontend:** React, Vite, Axios, React Router DOM, ReactQuill, SCSS
- **Backend:** Node.js, Express, MySQL, argon2, multer, jsonwebtoken, cookie-parser, cors
- **Database:** MySQL (local or serverless, e.g., PlanetScale)

## 📸 Preview

| ![Screenshot 1](https://github.com/user-attachments/assets/915fb6cb-7b64-4585-9ebe-5d2e5fb914d0) | ![Screenshot 2](https://github.com/user-attachments/assets/bcaedb69-e16d-423a-bb0a-efcad095e4b2) | ![Screenshot 3](https://github.com/user-attachments/assets/29c1ca16-03aa-44a3-867e-cbe15d8caf8c) |
|:--:|:--:|:--:|
| Screenshot 1 | Screenshot 2 | Screenshot 3 |

| ![Screenshot 4](https://github.com/user-attachments/assets/d49f54ca-29e5-4613-b883-c5c7da217ab5) | ![Screenshot 5](https://github.com/user-attachments/assets/3b69fa09-ed07-4255-b5a1-737c6f9fab11) |
|:--:|:--:|
| Screenshot 4 | Screenshot 5 |



## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- MySQL server (local or serverless)
- pnpm or npm

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/yourusername/blog-app-mysql.git
cd blog-app-mysql
```

#### 2. Setup the server

```sh
cd server
pnpm install # or npm install
```

- Create a `.env` file in the `server` directory with your database credentials:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=blog
  JWT_SECRET=your_jwt_secret
  ```
- Start the server:
  ```sh
  pnpm start # or npm start
  ```

#### 3. Setup the client

```sh
cd ../client
pnpm install # or npm install
```

- Create a `.env` file in the `client` directory if needed for environment variables.
- Start the client:
  ```sh
  pnpm dev # or npm run dev
  ```

### 4. Database Setup

- Import the provided SQL schema (if available) or create the required tables as per the code.

## Folder Structure

```
client/    # React frontend
server/    # Node.js/Express backend
```

## Environment Variables

- Never commit your `.env` files or `node_modules` to version control. Use `.gitignore` to exclude them.

## Deployment

- You can deploy the backend to platforms like Render, Railway, or Vercel (serverless DB recommended).
- The frontend can be deployed to Vercel, Netlify, or similar services.

## License

This project is licensed under the MIT License.

## Author

- [Rishabh Mishra](https://github.com/rishabhmishra007)

---

Feel free to contribute or open issues for suggestions and improvements!
