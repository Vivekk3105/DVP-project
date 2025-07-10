# Medical Diagnosis System

A comprehensive medical diagnosis project management system built with React, Vite, Tailwind CSS, Node.js, and MongoDB.

## Features

- **User Authentication**: Secure login system with JWT tokens
- **Project Management**: Create, manage, and track medical diagnosis projects
- **User Management**: Add and manage system users with different roles
- **Client Management**: Manage medical clients and organizations
- **Medical Report Scanner**: AI-powered diagnosis analysis from uploaded medical reports
- **Dashboard**: Overview of system statistics and recent activities
- **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file with your configuration:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medical-diagnosis
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
\`\`\`

4. Seed the database with sample data:
\`\`\`bash
node seedData.js
\`\`\`

5. Start the server:
\`\`\`bash
npm run dev
\`\`\`

The backend will be available at `http://localhost:5000`

## Default Login Credentials

After running the seed script, you can login with:
- **Email**: admin@medical.com
- **Password**: admin123

## Project Structure

\`\`\`
medical-diagnosis-system/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Layout.jsx
│   │   ├── CreateProject.jsx
│   │   ├── ProjectList.jsx
│   │   ├── UserManagement.jsx
│   │   ├── ClientManagement.jsx
│   │   └── DiagnosisScanner.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Client.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── clients.js
│   │   └── projects.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── seedData.js
└── README.md
\`\`\`

## Key Features

### Dashboard
- System statistics overview
- Quick action buttons
- Recent activity feed

### Project Management
- Create new medical diagnosis projects
- Select DVP categories and sub-systems
- Assign users to projects
- Upload reference documents
- Track project status

### User Management
- Add/edit/delete system users
- Assign roles (System Engineer, System User, System Lead, etc.)
- Manage user status (active/inactive)

### Client Management
- Manage medical clients and organizations
- Store contact information and addresses
- Track client status

### Medical Report Scanner
- Upload medical reports (images/PDFs)
- AI-powered diagnosis analysis
- Generate recommendations and risk assessments
- Download analysis reports
- View scan history

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
