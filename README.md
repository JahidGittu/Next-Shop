# NextShop

NextShop is a simple e-commerce application built with **Next.js 15 (App Router)**, **NextAuth.js**, **MongoDB**, and optional **Supabase** integration. Users can browse products, view details, and logged-in users can add new products via a protected dashboard. The application is designed for modern web development best practices, including server-client separation, API routes, and React Query for data fetching.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Pages & Routes](#pages--routes)
- [Environment Variables](#environment-variables)
- [Setup & Installation](#setup--installation)
- [Running the Project Locally](#running-the-project-locally)
- [Deployment](#deployment)
- [License](#license)

---

## Project Overview
NextShop allows users to:
- Browse a catalog of products
- View product details
- Log in using NextAuth (Google OAuth or credentials)
- Add products to a protected dashboard (login required)
- Enjoy a responsive UI with grid/list views, filtering, and sorting

---

## Features

### Public Pages
1. **Landing Page (`/`)**
   - Navbar, Hero Section, Product Highlights, Footer
   - Navigation to login & product pages

2. **Login Page (`/login`)**
   - Google OAuth login via NextAuth.js
   - Credential-based login option
   - Redirects to `/products` on successful login

3. **Product List (`/products`)**
   - Shows all products
   - Filter by category, sort by name/price/newest
   - Grid & List view toggle
   - Search functionality

4. **Product Details (`/products/[id]`)**
   - Shows full product details
   - Product image, price, description, reviews
   - Add to cart, save, and share buttons

### Protected Pages
1. **Add Product (`/dashboard/add-product`)**
   - Accessible only when logged in
   - Form to add a new product to MongoDB
   - Redirects unauthenticated users to `/login`

### Optional Enhancements
- Loading skeletons & spinner
- Toast notifications on success
- Light/Dark theme toggle with `next-themes`

---

## Technologies Used
- **Next.js 15** (App Router)
- **NextAuth.js** (Authentication)
- **React Query** (Data fetching & caching)
- **MongoDB** (Database)
- **Supabase** (Optional, for alternative auth/backend)
- **TailwindCSS + DaisyUI** (Styling & UI components)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **Sonner** (Toasts)
- **bcryptjs** (Password hashing)
- **Radix UI** (UI primitives)
- **React 19**, **Node.js**

---

## Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Landing page with hero, product highlights |
| `/login` | Public | NextAuth login page |
| `/products` | Public | Product list with filters, sort & search |
| `/products/[id]` | Public | Product details page |
| `/dashboard/add-product` | Protected | Add product form (login required) |

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env

# Google OAuth for NextAuth
GOOGLE_CLIENT_ID=-----------------------------------------
GOOGLE_CLIENT_SECRET=-------------------------------------

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=------------------------------------------

# MongoDB connection
MONGODB_URI=----------------------------------------------
```

# Clone this Project
```bash
git clone https://github.com/your-username/nextshop.git
cd nextshop
```

# Install Dependencies
```bash
npm install
```

# Start development server
```bash
npm run dev
```