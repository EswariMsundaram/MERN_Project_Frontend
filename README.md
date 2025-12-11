**Full-Stack MERN App**
A simple Project & Task Management App built using
MongoDB (database)
Express.js (backend framework)
React + Vite + TypeScript (frontend)
Node.js (runtime)
Users can
register, log in, create projects, update, delete and create and view tasks for
each project. This project is built to be beginner-friendly, with clean
code and simple steps.

🚀** Features Authentication** 
Register new users Log in existing users
JWT-based auth Protected routes 
Logout button Projects 
Uses protected API routes 

🛠️ **Technologies Used**
**Frontend **
React
TypeScript 
React Router DOM Axios
TailwindCSS 
Context API 

**Backend **
Node.js 
Express.js 
MongoDB / Mongoose
JWT Authentication Bcrypt (password hashing) 

📂** Project Structure**

**frontend/**
│── src/
│   │── App.tsx
│   │── main.tsx
│   │── index.css
│   │
│   ├── clients/
│   │   └── api.ts
│   │
│   ├── context/
│   │   └── AuthProvider.tsx
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── CreateTaskPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ProjectDetailsPage.tsx
│   │
│   ├── types/
│   │   └── index.ts
│
│── .env
│── package.json
│── README.md


**backend/**
│── controllers/
│   └── userController.js
│
│── middlewares/
│   └── auth.js
│
│── models/
│   ├── Project.js
│   ├── Task.js
│   └── User.js
│
│── routes/
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
│
│── config/
│── node_modules/
│── .env
│── package.json
│── .gitignore

****⚙️ Installation & Setup ** **
1.Clone the Repository git clone
<https://github.com/EswariMsundaram/frontend-project-manager.git> cd
mern-project-frontend

**📌 Backend Setup**
2. Install backend dependencies cd backend npm install

3.  Create .env file 
4.  Start backend npm start Backend runs at: http://localhost:4000
**
📌** **Frontend Setup** 
5. Install frontend dependencies Go to frontend
folder: cd frontend npm install

6. Create a .env file 
Backend runs http://localhost:4000 
7. Run the frontend npm run dev  http://localhost:5173

🔐** Authentication Flow **
(How It Works) User registers or logs in Backend
returns { user, token } Frontend stores user & token in localStorage
Axios interceptor attaches Authorization: Bearer `<token>`
**Protected routes** check if AuthContext.user exists User can access:
/projects /projects/:projectId If not logged in → redirected to /auth.

📡** API Endpoints** (Backend) 
Auth Projects Tasks

🧪 **Testing With Postman **
Register: POST /api/users/register 
Login: POST/api/users/login 
Test a protected route with a valid token.

🎯** Future Improvements Features to add later **
Edit and Delete Tasks
User profile page 
Home Page Improvements
