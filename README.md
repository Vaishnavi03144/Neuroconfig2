<<<<<<< HEAD
# Neuroconfig Full-Stack AI Product Recommendation Website

## Project Overview

Neuroconfig is a modern, futuristic product recommendation platform with a dark navy glassmorphic design and cyan glow highlighting. The project is split into a NodeJS+Express backend and a React (Vite) frontend.

## Prerequisites
- Node.js (v16 minimal) installed on your system.

---

## 1. Backend Setup & Run

The backend provides the API to load `products.json` using Express.

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Node modules:
   ```bash
   npm install
   ```
3. Start the server (it will run on `http://localhost:5000`):
   ```bash
   node server.js
   ```

---

## 2. Frontend Setup & Run

The frontend is a fully responsive React app styled without Tailwind, powered by pure CSS following modern UI/UX principles.

1. Open a **new** terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server (it will run on `http://localhost:5173` typically):
   ```bash
   npm run dev
   ```

---

## Folder Structure

```
neuroconfig3.0/
├── backend/
│   ├── data/
│   │   └── products.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── ProductCard.jsx
│           └── ProductGrid.jsx
└── README.md
```
=======
*Neuroconfig2*

Neuroconfig is an AI-powered product recommendation platform with a modern responsive interface. Users can browse tech products, compare options, manage wishlist items, and get personalized suggestions through Neurobot. Built to improve online shopping using smart and user-friendly experiences.

>>>>>>> 83c10e685a82bd84a0c7bcec0e15937a31d76776
