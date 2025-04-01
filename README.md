# LaptopUI - Premium Gaming Laptop E-commerce Platform

A modern, full-stack e-commerce platform for gaming laptops featuring a sleek UI, secure authentication, and seamless payment processing.

## 🌟 Live Demo

- Frontend: [https://laptop-ui-phi.vercel.app](https://laptop-ui-phi.vercel.app)
- Backend API: [https://laptopui.onrender.com](https://laptopui.onrender.com/)
- API Documentation: [https://laptopui.onrender.com/health](https://laptopui.onrender.com/health)

## ✨ Key Features

- **User Authentication**
  
      - Secure signup/login with JWT
      - Password hashing with Argon2
      - Protected routes
    
- **Product Management**
      
      - Dynamic product catalog
      - Advanced filtering and search
      - Real-time stock updates
  
- **Shopping Experience**
    
      - Interactive shopping cart
      - Secure checkout process
      - Order tracking
  
- **Payment Processing**

      - Stripe integration
      - Secure payment gateway
      - Multiple payment methods
  
- **UI/UX**
  
      - Responsive design
      - Smooth animations
      - Loading states
  
- **Admin Features**
  
      - Dashboard analytics
      - Order management
      - Product CRUD operations
      - User management

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 13
- **State Management**: Redux Toolkit
- **Styling**: 
  - Tailwind CSS
  - Framer Motion
  - HeadlessUI
- **Data Fetching**: Axios
- **Form Handling**: React Hook Form
- **Authentication**: JWT

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: 
  - MongoDB
  - Prisma ORM
- **Authentication**: 
  - JWT
  - Argon2 for password hashing
- **Payment**: Stripe API
- **File Upload**: Cloudinary

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- Stripe Account
- Cloudinary Account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shashishsoni/laptopui.git
cd laptopui
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd src/server
npm install
```

3. Environment Setup:

Create `.env.local` in root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

Create `.env` in `src/server`:
```env
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Database Setup:
```bash
cd src/server
npx prisma generate
npx prisma db push
```

5. Start Development Servers:
```bash
# Start frontend (from root directory)
npm run dev

# Start backend (in another terminal, from src/server)
npm run dev
```

## 📁 Project Structure

```
laptopui/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── product/      # Product-related components
│   │   └── ui/           # UI components
│   ├── pages/            # Next.js pages
│   ├── redux/            # Redux state management
│   │   ├── slices/       # Redux slices
│   │   └── store.ts      # Redux store
│   ├── server/           # Backend server
│   │   ├── src/
│   │   │   ├── config/   # Server configuration
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   └── prisma/       # Database schema
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
└── types/                # TypeScript types
```

## 🔒 API Endpoints

### Authentication
```
POST /api/auth/signup     # Register new user
POST /api/auth/login      # Login user
POST /api/auth/logout     # Logout user
GET  /api/auth/me         # Get current user
```

### Products
```
GET    /api/products      # Get all products
GET    /api/products/:id  # Get single product
POST   /api/products      # Create product (admin)
PUT    /api/products/:id  # Update product (admin)
DELETE /api/products/:id  # Delete product (admin)
```

### Orders
```
POST   /api/orders        # Create order
GET    /api/orders        # Get all orders (admin)
GET    /api/orders/:id    # Get order details
PUT    /api/orders/:id    # Update order status (admin)
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Add environment variables
3. Deploy with:
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Backend (Render)
1. Create Web Service on Render
2. Configure:
   - Build Command: `npm run render:build`
   - Start Command: `npm run render:start`
3. Add environment variables

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd src/server
npm test
```

## 📈 Performance Optimization

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Server-side rendering for SEO
- Redis caching (planned)
- CDN integration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- SHASHISH SONI - [GitHub](https://github.com/shashishsoni)

## 🙏 Acknowledgments

- Next.js team
- Vercel for hosting
- MongoDB Atlas
- Stripe team
- Cloudinary for media hosting

## 🎥 Demo Videos

### Product Demo

https://github.com/user-attachments/assets/9e3019aa-dd49-40e4-bf22-92a4a58e839f

### Feature Walkthrough

https://github.com/user-attachments/assets/1d95baa0-cbc5-4e61-bf8a-4eca0a7374ac


y