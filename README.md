# Wanderlust 🏖️🌲

Wanderlust is a high-performance, full-stack travel listing & accommodation platform engineered for scalability, security, and seamless user experience. Powered by a modern MERN stack (MongoDB, Express, React, Node.js) with Tailwind CSS, it offers a complete property management solution for travelers and hosts.

## 💎 Core Features & Engineering Solutions

### 🏨 Property Management Suite
Wanderlust provides end-to-end accommodation listing management with intuitive workflows.
- **Listing Creation**: Hosts can create, edit, and delete property listings with detailed information including title, description, location, price, and category.
- **Cloud Image Storage**: High-performance media management using Cloudinary with automatic image processing and optimized delivery.
- **Category-Based Organization**: Curated listing categories (Mountains, Beach, Desert, Arctic, Jungle, Island, Lakefront, Hill Station, Snow Stay).

### 🔒 Secure User Authentication & Authorization
Robust security layer protecting user accounts and property data.
- **Passport.js Authentication**: Local strategy with secure password hashing using Passport-Local-Mongoose.
- **Session Management**: Persistent, secure sessions stored in MongoDB using connect-mongo with 7-day cookie expiration.
- **Role-Based Access**: Only listing owners can edit or delete their properties, ensuring data isolation.

### 🔍 Interactive Search & Discovery
Smart filtering and real-time search for enhanced user engagement.
- **Real-Time Search**: Instant property search by title with dynamic result updates.
- **Category Filtering**: Browse listings by curated travel categories for targeted discovery.
- **Tax Display**: Toggle between base price and total (including 18% GST) for transparent pricing.

### 💬 Community Reviews System
User-generated content to build trust and engagement.
- **Review Creation**: Authenticated users can leave reviews on listings with author attribution.
- **Review Display**: Reviews are populated with author information for accountability.
- **Review Deletion**: Only review authors or listing owners can remove reviews.

## 🛠️ The Wanderlust Stack

**Core Backend**: Node.js + Express
**Database**: MongoDB (Mongoose ODM)
**Session Storage**: MongoDB (connect-mongo)
**Media Storage**: Cloudinary + Multer
**Validation**: Joi
**Security**: Passport.js + Express-Session
**Frontend**: React + Vite
**Styling**: Tailwind CSS
**Routing**: React Router DOM
**Notifications**: React Toastify
**API Client**: Axios

## 📂 Architecture Breakdown

```
Wanderlust/
├── backend/
│   ├── controllers/  # Business logic for listings, reviews, and users
│   ├── models/       # Mongoose schemas (Listing, Review, User)
│   ├── routes/       # REST API endpoints
│   ├── utils/        # Error handling and async wrappers
│   ├── middleware.js # Authentication and authorization middleware
│   ├── cloudConfig.js # Cloudinary configuration
│   ├── schema.js     # Joi validation schemas
│   └── server.js     # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── api/      # Axios API configuration
│   │   ├── pages/    # React page components
│   │   ├── components/ # Reusable UI components
│   │   └── App.jsx   # Main app component
└── README.md
```

## ⚡ Deployment & Setup

### 1. Prerequisites
- Node.js
- MongoDB Instance (MongoDB Atlas recommended)
- Cloudinary Account (for media storage)

### 2. Environment Configuration

#### Backend (.env file)
```env
# Database
ATLASDB_URL=mongodb+srv://<user>:<password>@cluster0.mongodb.net/wanderlust

# Session Secret
SECRET=your-super-secret-key-here

# Cloudinary
CLOUD_NAME=your-cloud-name
API_KEY=your-api-key
API_SECRET=your-api-secret
```

#### Frontend (.env file)
```env
VITE_API_URL=http://localhost:8080
```

### 3. Installation & Running

#### Backend Setup
```bash
cd backend
npm install
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Build for Production

#### Frontend
```bash
cd frontend
npm run build
```
