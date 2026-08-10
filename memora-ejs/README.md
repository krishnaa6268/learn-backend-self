# Memora 

**Memora** is a clean, server-side rendered (SSR) full-stack web application built with **Node.js, Express, EJS, and MongoDB**. It allows users to register, log in, and maintain a private collection of notes with full CRUD (Create, Read, Update, Delete) capabilities.

---

##Features

- **User Authentication**: Secure JWT-based authentication using HTTP-only cookies.
- **User-Specific Content**: Notes are strictly isolated per registered user account.
- **Full CRUD Operations**:
  - **Create**: Add new thoughts and notes.
  - **Read**: View all saved notes ordered by newest first.
  - **Update**: Edit existing note titles and contents.
  - **Delete**: Remove notes with a single click.
- **Responsive EJS Views**: Styled modern interface with clear empty states and interactive forms.

---

## Tech Stack

- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB & Mongoose ORM
- **Templating Engine**: EJS (Embedded JavaScript)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `cookie-parser`
- **Development**: `nodemon`, `dotenv`

---

## Project Structure

```text
memora-ejs/
├── conection.js           # MongoDB connection utility
├── controllers/           # Application controllers (business logic)
│   ├── noteController.js  # Note CRUD handlers
│   ├── staticController.js# Page rendering handlers
│   └── userController.js  # Auth (signup/login/logout) handlers
├── middlewares/           # Custom Express middlewares
│   └── auth.js            # Authentication check middleware
├── models/                # Mongoose database schemas
│   ├── note.js            # Note model (references user)
│   └── user.js            # User model
├── routes/                # Express router modules
│   ├── noteRoutes.js      # Routes for managing notes
│   ├── staticRoutes.js    # Routes for static/auth pages
│   └── userRoutes.js      # Auth API endpoints
├── services/              # Helper services
│   └── auth.js            # JWT token creation & verification
├── views/                 # EJS view templates
│   ├── editNote.ejs       # Note editor page
│   ├── home.ejs           # Main dashboard & note listing
│   ├── login.ejs          # Login page
│   └── signup.ejs         # User registration page
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- A running [MongoDB](https://www.mongodb.com/) cluster or local instance

### Installation & Setup

1. **Clone the repository / navigate to project folder**:
   ```bash
   cd memora-ejs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   PORT=8080
   MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/memora
   JWT_SECRET=YourSuperSecretKeyHere
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8080`.

---

## Suggested Next Improvements

Here are recommended features and enhancements to take this project to the next level:

1. **Password Hashing (Security)**:
   - Use `bcryptjs` or `argon2` to hash passwords before storing them in MongoDB instead of saving plain-text passwords.

2. **Configurable JWT Secret**:
   - Move the JWT secret from hardcoded values in `services/auth.js` to `process.env.JWT_SECRET`.

3. **Search & Filter Notes**:
   - Add a search input on the home page to filter notes by title or content keywords.

4. **Tags & Categories**:
   - Allow users to assign categories or tags (e.g., *Work*, *Personal*, *Ideas*) to organize their notes.

5. **Pagination**:
   - Add pagination or infinite scroll when user notes count grows large.

6. **Form Input Sanitization & Validation**:
   - Integrate `express-validator` to sanitize user inputs against XSS and injection attacks.
