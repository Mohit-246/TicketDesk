# 🎫 TicketDesk – Ticket Management System

TicketDesk is a web-based ticket management application built using **Next.js, Tailwind CSS, MongoDB, and Mongoose**. It helps users create, manage, track, and resolve tickets through a simple and responsive dashboard.

The application provides an organized way to manage hardware problems, software problems, application development tasks, and projects.

## ✨ Features

- **Dashboard:** View all tickets in one place.
- **Create Tickets:** Add new tickets with titles, descriptions, categories, and priorities.
- **Category Management:** Organize tickets into four categories:
  - Hardware Problem
  - Software Problem
  - Application Development
  - Project
- **Priority Management:** Assign priorities from 1 to 5.
- **Progress Tracking:** Track ticket progress from 0% to 100%.
- **Status Management:** Manage tickets using three statuses:
  - Not Started
  - Started
  - Done
- **Edit Tickets:** Update existing ticket information.
- **Delete Tickets:** Remove tickets with confirmation.
- **Search Tickets:** Find tickets using their title or description.
- **Category Filtering:** Filter tickets by category.
- **Statistics:** View total, completed, in-progress, and not-started ticket counts.
- **Responsive Design:** Use the application on desktop and mobile devices.
- **Database Integration:** Store ticket information persistently using MongoDB.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend and backend framework |
| React.js | User interface |
| Tailwind CSS | Styling and responsive design |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JavaScript | Application functionality |
| Node.js | JavaScript runtime |
| REST API | Communication between frontend and backend |

## 📁 Project Structure

```text
TicketDesk/
│
├── app/
│   ├── api/
│   │   └── tickets/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
│   │
│   ├── ticket/
│   │   ├── new/
│   │   │   └── page.jsx
│   │   └── [id]/
│   │       └── page.jsx
│   │
│   ├── layout.jsx
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── DashboardContent.jsx
│   ├── NavMenu.jsx
│   ├── TicketCard.jsx
│   ├── TicketForm.jsx
│   └── DeleteBlock.jsx
│
├── lib/
│   ├── db.js
│   └── pick.js
│
├── models/
│   └── Ticket.js
│
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run TicketDesk on your local machine.

### 1. Prerequisites

Make sure you have installed:

- Node.js
- npm
- Visual Studio Code
- MongoDB Atlas account
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/TicketDesk.git
```

Navigate into the project directory:

```bash
cd TicketDesk
```

### 3. Install Dependencies

```bash
npm install
```

If Mongoose is not already installed:

```bash
npm install mongoose
```

### 4. Configure MongoDB

1. Create a MongoDB Atlas account.
2. Create a database cluster.
3. Create a database user.
4. Configure your network access.
5. Copy your MongoDB connection string.

Create a `.env.local` file in the project root.

Add the following configuration:

```env
MONGODB_URI=your_mongodb_connection_string
BASE_URL=http://localhost:3000
```

Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

**Important:** Never upload `.env.local` or your database credentials to GitHub.

### 5. Run the Development Server

Start the application:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

TicketDesk should now be running locally.

## 🔌 API Endpoints

The application uses REST API routes to manage tickets.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tickets` | Retrieve all tickets |
| POST | `/api/tickets` | Create a new ticket |
| GET | `/api/tickets/[id]` | Retrieve a specific ticket |
| PUT | `/api/tickets/[id]` | Update a ticket |
| DELETE | `/api/tickets/[id]` | Delete a ticket |

## 🗄️ Database Schema

The application uses a MongoDB collection named `tickets`.

Each ticket contains the following fields:

| Field | Data Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique ticket identifier |
| `title` | String | Ticket title |
| `description` | String | Ticket description |
| `category` | String | Ticket category |
| `priority` | Number | Priority level (1–5) |
| `progress` | Number | Completion percentage (0–100) |
| `status` | String | Current ticket status |
| `createdAt` | Date | Ticket creation date |
| `updatedAt` | Date | Last update date |

## 📊 Ticket Categories

TicketDesk supports four main categories:

1. **Hardware Problem:** Issues related to physical computer components and devices.
2. **Software Problem:** Issues related to software installation, configuration, and errors.
3. **Application Development:** Tasks related to application development and improvements.
4. **Project:** Tasks related to project planning, implementation, and documentation.

## 🔮 Future Enhancements

The following features can be considered for future versions:

- User registration and authentication.
- Role-based access control.
- Email notifications.
- File attachments.
- Ticket comments and activity history.
- Advanced reporting and analytics.
- User profile management.

## 🎯 Project Objective

The main objective of TicketDesk is to develop a simple, efficient, and user-friendly web-based ticket management system that allows users to organize, track, and manage tickets in a centralized platform.

## 👨‍💻 Author

**Project Name:** TicketDesk – Ticket Management System

**Project Type:** Mini Project

**Technology Stack:** Next.js, React.js, Tailwind CSS, MongoDB, Mongoose

## 📄 License

This project is developed for educational and learning purposes.
