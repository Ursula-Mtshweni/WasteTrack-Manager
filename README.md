# WasteTrack 360 Manager

A comprehensive full-stack waste management dashboard application designed to help users schedule and manage waste pickup services across African cities. Built with modern web technologies, featuring Clerk authentication, real-time scheduling, and a beautiful responsive design.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-v20.19.3-339933)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6)

## 🌍 About

WasteTrack 360 Manager is a modern solution for waste management in African cities. It allows users to:
- Schedule waste pickup services in their area
- Manage pickup requests with real-time updates
- Learn about proper waste management practices
- Connect with waste management professionals
- Switch between light and dark themes for comfortable usage

## ✨ Features

- **🔐 Secure Authentication** - Clerk-powered authentication with sign up/sign in
- **📅 Waste Pickup Scheduling** - Easy-to-use form to book pickups in major African cities
- **🎨 Dark/Light Theme** - Toggle between themes with persistent storage
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **🌐 Multi-Page Application** - Home, Book Schedule, Connect with Us, and Awareness pages
- **✉️ Contact Form** - Get in touch with the team
- **📚 Educational Resources** - Learn about waste management best practices
- **⚡ Fast & Modern UI** - Animated components and smooth interactions

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.20** - Lightning-fast build tool
- **TypeScript 5.6.3** - Type safety
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **TanStack Query 5.60.5** - Server state management
- **Wouter 3.3.5** - Lightweight routing
- **Clerk** - Authentication and user management
- **Framer Motion & GSAP** - Animations

### Backend
- **Node.js 20.19.3** - JavaScript runtime
- **Express 4.21.2** - Web framework
- **TypeScript** - Type safety
- **Clerk SDK** - Authentication
- **Zod** - Schema validation
- **In-Memory Storage** - Development database (upgradeable to MongoDB)

### Shared
- **Drizzle ORM** - Database toolkit
- **Drizzle Zod** - Type validation
- **Zod** - Schema validation

## 📁 Project Structure

```
wastetrack-360/
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Footer section
│   │   │   ├── CircularText.tsx # Animated logo
│   │   │   ├── ThemeToggle.tsx  # Dark/Light theme toggle
│   │   │   └── Layout.tsx       # Main layout wrapper
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx         # Landing page
│   │   │   ├── BookSchedule.tsx # Booking form
│   │   │   ├── Connect.tsx      # Contact page
│   │   │   ├── Awareness.tsx    # Educational content
│   │   │   └── not-found.tsx    # 404 page
│   │   ├── contexts/            # React contexts
│   │   │   └── ThemeContext.tsx # Theme state management
│   │   ├── lib/                 # Utilities
│   │   │   └── queryClient.ts   # TanStack Query setup
│   │   ├── App.tsx              # Main app component
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── server/                      # Express.js backend
│   ├── app.ts                   # Express app configuration
│   ├── routes.ts                # API routes (POST, GET, PATCH, DELETE)
│   ├── storage.ts               # In-memory storage implementation
│   ├── index-dev.ts             # Development server entry
│   ├── index-prod.ts            # Production server entry
│   └── vite.ts                  # Vite integration
│
├── shared/                      # Shared code
│   └── schema.ts                # TypeScript types and Zod schemas
│
├── attached_assets/             # Image assets
│   ├── waste-sorting.png
│   ├── waste-practice.png
│   └── environmental-impact.png
│
├── package.json                 # Root dependencies (monorepo)
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── components.json              # Shadcn/ui configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v20.19.3 or higher
- npm or yarn
- Clerk account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/wastetrack-360.git
cd wastetrack-360
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

Get your Clerk keys from [Clerk Dashboard](https://dashboard.clerk.com):
- Go to **API Keys** section
- Copy your **Publishable Key** and **Secret Key**

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## 🔐 Environment Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | String | Yes | Clerk frontend key for authentication (frontend) |
| `CLERK_SECRET_KEY` | String | Yes | Clerk backend key for API verification (backend) |

**Important:** 
- Frontend key must start with `pk_test_` (development) or `pk_live_` (production)
- Backend key must start with `sk_test_` (development) or `sk_live_` (production)
- Never commit `.env` file to Git

## 📝 API Endpoints

All endpoints require Clerk authentication in production.

### Health Check
- `GET /api/secure-test` - Test authentication

### Waste Pickups (CRUD)
- `POST /api/waste-pickups` - Create new pickup request
- `GET /api/waste-pickups` - Get all pickup requests
- `GET /api/waste-pickups/:id` - Get specific pickup
- `PATCH /api/waste-pickups/:id` - Update pickup request
- `DELETE /api/waste-pickups/:id` - Delete pickup request

### Example Request Body
```json
{
  "fullName": "John Doe",
  "location": "Nairobi",
  "wasteType": "General",
  "preferredDate": "2025-12-25"
}
```
## 🌓 Theme Support

- **Light Mode** - Clean, bright interface for daytime usage
- **Dark Mode** - Eye-friendly interface for night usage
- Theme preference is saved to localStorage

## 📱 Pages

### Home
Landing page with animated welcome text and project overview

### Book Schedule
Form to schedule waste pickups (requires authentication)
- Full name (auto-filled from Clerk profile)
- Location selection
- Waste type selection
- Preferred date picker

### Connect with Us
Contact form to reach out to the waste management team

### Awareness
Educational content about waste management with three sections:
- Waste Sorting Practices
- Best Waste Management Practices
- Environmental Impact Information

## 🔑 Authentication Flow

1. User clicks "Sign Up" or "Sign In" in header
2. Clerk modal opens
3. User creates account or logs in
4. User is redirected to app with session
5. User can now access protected features (Book Schedule)
6. User profile visible in header (UserButton)
7. User can sign out via profile menu

## 📦 Building for Production

### Build Frontend
```bash
npm run build
```
## Output
dist

This generates:
- Optimized React bundle in `dist/public/`
- TypeScript checking
- Minified CSS and JavaScript

### Build Backend
```bash
npm install && npm run build
```

This generates:
- Bundled Node.js application in `dist/index.js`

### Start Production Server
```bash
npm start
```

## 🚢 Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Set root directory to `client`
5. Add environment variable: `VITE_CLERK_PUBLISHABLE_KEY`
6. Deploy

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Set root directory to `server`
6. Add environment variable: `CLERK_SECRET_KEY`
7. Deploy

### Update Frontend API URL

After deploying backend, update the API base URL in your frontend:

**File:** `client/src/lib/queryClient.ts`
```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-backend.onrender.com'
  : 'http://localhost:5000';
```

## 🧪 Testing

### Type Checking
```bash
npm run check
```

### Development Mode
```bash
npm run dev
```

Hot reload is enabled - changes refresh automatically

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build frontend and backend for production |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript type checking |

## 🔄 Database

Currently uses **in-memory storage** for development. 

### To upgrade to MongoDB/PostgreSQL:
1. Install Drizzle ORM adapters
2. Update `server/storage.ts` with your database connection
3. Configure environment variables with database URL
4. Run migrations

Example with PostgreSQL:
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);
```

## 🎯 Roadmap

- [ ] MongoDB integration
- [ ] Email notifications for pickups
- [ ] Admin dashboard to manage requests
- [ ] Real-time GPS tracking for vehicles
- [ ] Payment integration (Stripe)
- [ ] SMS notifications
- [ ] Waste statistics and reports
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Clerk Documentation:** https://clerk.com/docs
- **Express Documentation:** https://expressjs.com
- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev

## 👥 Authors

Built with ❤️ for waste management in Africa

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) for authentication
- [Shadcn/ui](https://shadcn.com) for beautiful components
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Vite](https://vitejs.dev) for fast development

## 📞 Contact

For questions or suggestions, please reach out through the "Connect with Us" page on the application.

---

**Version:** 1.0.0  
**Last Updated:** November 2025
