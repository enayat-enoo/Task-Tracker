
#  Task Tracker Web App

## This is a simple Task Tracker web application built using the MERN stack.
The app helps users manage daily tasks by allowing them to create, view, update, and delete tasks easily.

Live link:
👉 [https://task-tracker-seven-gilt.vercel.app/]

What This App Does

Add a new task with:

Title (required)

Description (optional)

Priority (Low / Medium / High)

Due date (required)

View all added tasks

Mark tasks as completed

Delete tasks

Basic client-side validation

UI updates without refreshing the page

Works well on different screen sizes

Tech Used
Frontend

React.js

useState for state handling

Fetch API

Basic CSS for styling

Backend

Node.js

Express.js

MongoDB with Mongoose

API Endpoints

Base URL:

/api

Method Endpoint What it does
POST /api/tasks Create a task
GET /api/tasks Get all tasks
PUT /api/tasks/:id Update task status
DELETE /api/tasks/:id Delete a task
Folder Structure
task-tracker/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── configs/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── services/
│ ├── App.jsx
│ └── main.jsx
│
└── README.md

Environment Variables
Backend (.env)
PORT=8000
MONGO_URL=your_mongodb_connection_string

Frontend (.env)
VITE_API_URL=https://task-tracker-z0pp.onrender.com/api

Running the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Deployment

Frontend deployed on Vercel

Backend deployed on Render

Database hosted on MongoDB Atlas

Live app:
👉 https://task-tracker-seven-gilt.vercel.app/

Additional Notes

Backend APIs were tested using Postman before connecting the frontend

Code is kept simple and readable



