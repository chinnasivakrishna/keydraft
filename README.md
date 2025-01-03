


# Branch Management System

A modern web application for managing branch information with CRUD operations, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **Branch Management**
  - Create new branches
  - View branch details
  - Update existing branches
  - Delete branches
  - Active/Inactive status management

- **User Interface**
  - Responsive design
  - Table and Grid view options
  - Search functionality
  - Status filtering
  - Pagination
  - Card-based forms
  - Modal dialogs

- **Data Fields**
  - Branch Name
  - Branch Code
  - Branch Short Name
  - Locality
  - City
  - State
  - Manager
  - Contact Phone
  - PAN Number
  - GSTIN
  - Status

## Tech Stack

### Frontend
- React.js
- CSS3 with custom styling
- Responsive design
- Component-based architecture

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Project Structure

```
branch-management/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── BranchForm.js
│       │   ├── BranchGrid.js
│       │   ├── BranchTable.js
│       │   └── Modal.js
│       ├── services/
│       │   └── branchService.js
│       ├── styles/
│       │   ├── BranchForm.css
│       │   ├── BranchGrid.css
│       │   ├── BranchTable.css
│       │   └── Modal.css
│       ├── App.js
│       └── index.js
├── backend/
│   ├── models/
│   │   └── Branch.js
│   ├── routes/
│   │   └── branches.js
│   ├── config/
│   │   └── db.js
│   └── server.js
└── README.md
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd branch-management
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
```

4. **Set up environment variables**
Create `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

1. **Start the backend server**
```bash
cd backend
npm start
```

2. **Start the frontend development server**
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Branches

- `GET /api/branches` - Get all branches
- `GET /api/branches/:id` - Get a specific branch
- `POST /api/branches` - Create a new branch
- `PUT /api/branches/:id` - Update a branch
- `DELETE /api/branches/:id` - Delete a branch

## Data Model

### Branch Schema
```javascript
{
  name: String,
  branchCode: String,
  shortName: String,
  locality: String,
  city: String,
  state: String,
  manager: String,
  phone: String,
  panNo: String,
  gstin: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- React.js documentation
- MongoDB documentation
- Express.js documentation
- Node.js documentation



This README provides:
1. Project overview
2. Features list
3. Technical stack details
4. Installation instructions
5. Project structure
6. Running instructions
7. API documentation
8. Data model
9. Contributing guidelines

