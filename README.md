Project Overview

Vehicle Rescue System is a real-time emergency assistance system that connects vehicle users with nearby mechanics instantly.
Users can send an SOS request with their live location → mechanics receive alerts → one mechanic accepts → user tracks mechanic live on map → service completed.

This system provides rapid rescue, live tracking, and real-time updates using MERN + Socket.IO + Google Maps API.

🎯 Key Features
👤 User Features

Login / Register

Send SOS with live GPS location

Automatic search for nearby mechanics

Receive confirmation when mechanic accepts

Live tracking of mechanic movement

Service history

🔧 Mechanic Features

Mechanic login

Receive instant SOS alerts

Accept request in real-time

Share live location with user

Update service status

🛡 Admin Features

View all SOS requests

Monitor mechanics & users

Manage system data (users, mechanics)

⚡ Real-Time System

Instant notification via Socket.IO

Live mechanic movement updates

Status broadcast: pending → accepted → enroute → arrived → completed

🗺 Maps & GPS

Google Maps Integration

User & mechanic location markers

Route display

Automatic location retrieval

🧱 Tech Stack
Frontend

React.js

Axios

@react-google-maps/api

CSS / Tailwind (optional)

Backend

Node.js + Express.js

MongoDB + Mongoose

JSON Web Tokens (JWT)

Socket.IO (Real-time engine)

Database

MongoDB Atlas (cloud)

#Project Setup
sos-vehicle/
 ├── server/             # Node + Express backend
 │     └── src/
 │         ├── models/
 │         ├── controllers/
 │         ├── routes/
 │         ├── middlewares/
 │         ├── services/  # socket + geo utils
 │         └── index.js
 ├── client/             # React frontend
 │     └── src/
 │         ├── pages/
 │         ├── components/
 │         ├── hooks/
 │         ├── services/
 │         └── App.jsx
 └── docs/               # Extra documents
