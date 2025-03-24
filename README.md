# Task Manager - Full Stack Application

A complete task management system with user authentication and CRUD operations, built with React frontend and Node.js/Express backend.

## Features

- **User Authentication**: Sign up and log in with email/password
- **Task Management**:
  - Create tasks with title, description, category, priority, and due date
  - Edit/Delete existing tasks
  - Mark tasks as pending/completed
- **Organize Tasks**:
  - Filter by category (Work/Personal/Shopping)
  - Filter by status (Pending/Completed)
  - Search tasks by title
- **Dashboard**: View statistics on task completion
- **Responsive Design**: Works on both desktop and mobile devices

## Technologies Used

**Frontend**:
- React
- React Router
- CSS Modules

**Backend**:
- Node.js
- Express.js
- SQLite Database
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Installation

1. **Clone the repository**
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager

2. **Setup for the backend**
    cd server
    npm install

3. **Setup for the frontend**
    cd ../client
    npm install



## Technologies and Libraries Used

**Frontend:**
- React for interactive user interfaces
- React Router to navigate between different views
- CSS for styling and responsive design
- React Icons to enhance the visual experience

**Backend:**
- Node.js for run-time environment
- Express.js for handling requests in server
- SQLite Database for storing task details and users credentials
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing


## Assumptions

- **User Registration:**  
  The application is designed so that users register using their email address only. No additional information such as a username or phone number is required during sign-up.

- **Due Date Reminders:**  
  Due date reminders are visual and delivered through browser notifications. These notifications will alert the user when the site is granted permission to send them.

- **User Engagement:**  
  It is assumed that users will open the app frequently, allowing them to check their due dates regularly and receive timely reminders.


## Challenges Faced and How They Were Addressed

- **Due Date Reminders**:  
  Initially, it was challenging to display due date reminders using browser notifications. I researched and implemented the Notifications API, learning how to trigger and display notifications based on task due dates.

- **Middleware & API Errors**:  
  There were several issues with middleware functions and API calls, such as authorization errors and data fetching challenges. Through debugging and adjusting the code (especially in the Express middleware for JWT verification), these issues were resolved.

- **Responsive Design**:  
  Ensuring that both the dashboard and the forms (Login, Register, Add Task) worked well on various screen sizes required iterative adjustments with media queries and testing on different devices.
