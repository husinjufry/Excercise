# Node.js Self-Learning Project

This project is a hands-on Node.js/TypeScript exercise repository based on a structured self-learning curriculum, progressing from beginner to advanced concepts.

## 🚀 Purpose

To build a solid understanding of back-end web development using Node.js and TypeScript by implementing:

- Core JavaScript fundamentals
- Backend server logic using Express.js
- PostgreSQL integration with TypeORM
- JWT authentication
- RESTful APIs with testing
- Common design patterns and best practices

---

## 🧠 Learning Syllabus

### 🏁 White Belt (Beginner Level)

- ✅ Git (init, commit, branch, merge)
- ✅ Basic Bash navigation
- ✅ JavaScript: types, functions, loops, conditionals
- ✅ Node.js & REPL
- ✅ Simple exercise combining Git + JS

---

### 🟡 Yellow Belt (Intermediate Level)

- ✅ JavaScript Objects, Arrays, Methods (map, reduce, etc.)
- ✅ JSON & ES6+ features (arrow functions, destructuring, etc.)
- ✅ Async JavaScript with Callbacks
- ✅ Node.js Modules, Events, FileSystem
- ✅ NPM, Semantic Versioning
- ✅ Express.js basics with routing
- ✅ TypeScript fundamentals
- ✅ Exercise: Basic Express API with TypeScript

---

### 🟠 Orange Belt (Advanced Beginner Level)

- ✅ Factory & Prototype Design Patterns
- ✅ Express.js advanced routing and middleware
- ✅ Custom Middleware: Logger, Auth, ErrorHandler
- ✅ PostgreSQL integration using TypeORM
- ✅ RESTful API standards
- ✅ JWT Authentication
- ✅ Final Project: Secure, RESTful API with DB and Testing ( On Review )

---

## 📦 Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL + TypeORM
- **Auth**: JWT + Bcrypt
- **Tools**: Dotenv, ts-node-dev, Jest, Supertest
- **Design Patterns**: Factory, Prototype

---

## 🛠 How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file:
   ```env
   PORT=3000
   JWT_SECRET=your_secret
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_user
   DB_PASSWORD=your_pass
   DB_NAME=your_db
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Run tests: Not Ready yet
   ```bash
   npm test
   ```

---

## 📁 Folder Structure

```
src/
│
├── config/         # Database connection
├── controllers/    # Route logic
├── middlewares/    # Auth, logger, error handling
├── models/         # TypeORM entities
├── routes/         # Route declarations
├── factories/      # Factory pattern usage
├── tests/          # Jest test cases
└── index.ts        # App entry point
```

---

## 📌 Status

✅ White Belt  
✅ Yellow Belt  
🛠 Orange Belt — *In Progress / Under Review*

---
