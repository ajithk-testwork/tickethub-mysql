# 🎟️ Event Ticket Booking System

A full-stack Event Ticket Booking System built with **React.js, TypeScript, Node.js, Express.js, Prisma ORM, MySQL, JWT Authentication, Cloudinary, and Stripe**. This project allows admins to manage events and users to book tickets securely through an online payment gateway.

---

## 🚀 Features

### 👤 User

- User Registration
- User Login
- JWT Authentication
- View All Events
- View Event Details
- Book Event Tickets
- Stripe Payment Integration
- Download Ticket
- QR Code Ticket
- Booking History
- User Profile

---

### 🛠️ Admin

- Admin Login
- Dashboard
- Create Event
- Update Event
- Delete Event
- Publish / Unpublish Event
- Upload Event Banner (Cloudinary)
- View Bookings
- Scan QR Code
- Manage Attendees

---

### 🔐 Authentication

- Register
- Login
- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- Role-Based Access Control (RBAC)

---

## 🏗️ Tech Stack

### Frontend

- React.js
- TypeScript
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- React Hot Toast

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT
- bcrypt

### Cloud Services

- Cloudinary (Image Upload)
- Stripe (Payments)

---

## 📂 Project Structure

```
Event_Ticket_Booking_Fullstack
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── utils
│   │   ├── server.ts
│   │
│   ├── package.json
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/event-ticket-booking-system.git
```

```bash
cd event-ticket-booking-system
```

---

## 2️⃣ Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create Environment File

```
.env
```

Example

```env
PORT=5000

DATABASE_URL="mysql://root:password@localhost:3306/event_booking"

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
```

Run Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Backend

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
```

Install packages

```bash
npm install
```

Create

```
.env
```

Example

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

# 🔑 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | User Login |

---

## Events

| Method | Endpoint |
|---------|----------|
| GET | `/api/events` |
| GET | `/api/events/:id` |
| POST | `/api/events` |
| PUT | `/api/events/:id` |
| DELETE | `/api/events/:id` |

---

## Booking

| Method | Endpoint |
|---------|----------|
| POST | `/api/bookings` |
| GET | `/api/bookings` |
| GET | `/api/bookings/:id` |

---

## Payment

| Method | Endpoint |
|---------|----------|
| POST | `/api/payment/create-checkout-session` |
| POST | `/api/payment/webhook` |

---

# 🗄️ Database

- User
- Role
- Event
- Ticket
- Booking
- Payment
- Attendance

---

# 🔄 Application Workflow

```
SUPER ADMIN
      │
Create Admin
      │
      ▼
ADMIN LOGIN
      │
Create Event
      │
Upload Banner
      │
Publish Event
      │
──────────────────────────
      │
USER REGISTER
      │
USER LOGIN
      │
Browse Events
      │
Book Ticket
      │
Stripe Payment
      │
Ticket Generated
      │
QR Code Generated
      │
Email Confirmation
      │
Event Check-in
      │
Admin Scan QR
```

---

# 📌 Future Improvements

- Email Notifications
- Seat Selection
- Wishlist
- Coupons & Offers
- Event Categories
- Search & Filter
- Reviews & Ratings
- Admin Analytics Dashboard
- PDF Ticket Download
- Mobile Responsive UI

---

# 👨‍💻 Author

**Ajith K**

GitHub: https://github.com/ajithk-testwork

---

# ⭐ Support

If you found this project useful, please give it a ⭐ on GitHub.

Happy Coding! 🚀