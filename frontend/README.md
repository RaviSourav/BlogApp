# Blog Frontend

A modern, responsive React frontend for the Spring Boot Blog API. This application provides a complete user interface for managing blog posts, comments, and user authentication.

## Features

### 🔐 Authentication
- User registration and login
- Protected routes
- Role-based access control (Admin/User)
- Secure token-based authentication

### 📝 Blog Management
- View all blog posts with pagination
- Create new blog posts (Admin only)
- Edit existing posts (Admin only)
- Delete posts (Admin only)
- Search and sort functionality

### 💬 Comments System
- Add comments to blog posts
- View all comments for a post
- Real-time comment updates

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean, modern interface
- Loading states and error handling
- Toast notifications
- Form validation

## Technology Stack

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Toastify** - Notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:8080

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to http://localhost:3000

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.js
│   │   ├── PostCard.js
│   │   ├── Pagination.js
│   │   └── LoadingSpinner.js
│   ├── contexts/           # React contexts
│   │   └── AuthContext.js
│   ├── hooks/              # Custom hooks
│   │   └── useAuth.js
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── CreatePost.js
│   │   ├── EditPost.js
│   │   ├── PostDetail.js
│   │   └── Profile.js
│   ├── services/           # API services
│   │   └── api.js
│   ├── App.js              # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json
├── tailwind.config.js
└── README.md
```

## API Integration

The frontend integrates with the Spring Boot Blog API:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Posts Endpoints
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/{id}` - Get post by ID
- `POST /api/posts` - Create post (Admin only)
- `PUT /api/posts/{id}` - Update post (Admin only)
- `DELETE /api/posts/{id}` - Delete post (Admin only)

### Comments Endpoints
- `GET /api/posts/{postId}/comments` - Get comments for a post
- `POST /api/posts/{postId}/comments` - Create comment
- `PUT /api/posts/{postId}/comments/{commentId}` - Update comment
- `DELETE /api/posts/{postId}/comments/{commentId}` - Delete comment

## Features in Detail

### 🔐 Authentication System
- **Login/Register Forms** with validation
- **Protected Routes** for authenticated users
- **Admin Routes** for administrative functions
- **Token Management** with automatic logout on expiration

### 📝 Blog Post Management
- **Responsive Post Cards** with hover effects
- **Pagination** for large post lists
- **Search and Sort** functionality
- **Rich Text Support** for post content
- **Admin Controls** for post management

### 💬 Comments System
- **Nested Comments** display
- **Real-time Updates** using React Query
- **Form Validation** for comment submission
- **User-friendly Interface** for adding comments

### 🎨 UI/UX Features
- **Responsive Design** for mobile, tablet, and desktop
- **Loading States** for better user experience
- **Error Handling** with user-friendly messages
- **Toast Notifications** for user feedback
- **Form Validation** with real-time feedback

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Static Hosting

The built files can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3
- GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
