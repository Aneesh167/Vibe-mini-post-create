# Codexa

A full-stack social media application built with modern web technologies, allowing users to create accounts, post content, and interact with a feed.

## Features

- User authentication and authorization (JWT-based)
- Create, view, and manage posts
- User profiles and editing
- Responsive frontend with React
- RESTful API backend with Express.js
- Secure data storage with MongoDB

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS** - Styling

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the `Backend` directory:
   ```
   cd Backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables in `Backend/src/config/config.js` (e.g., database URI, JWT secret).
4. Start the server:
   ```
   npm start
   ```
   The backend will run on `http://localhost:3000` (or as configured).

### Frontend Setup

1. Navigate to the `Frontend` directory:
   ```
   cd Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

## Usage

1. Ensure both backend and frontend are running.
2. Open your browser and navigate to the frontend URL.
3. Register a new account or log in.
4. Create posts, view the feed, and edit your profile.

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/users/:id` - Get user profile

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [Your Name] at [your.email@example.com].
