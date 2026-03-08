# OmniTrust Africa - Cybersecurity Solutions Website

A comprehensive, production-ready full-stack website for OmniTrust Africa, a Nairobi-based cybersecurity company providing services across Africa.

## Features

### Core Features
- **Modern Dark UI**: Professional dark theme with custom color scheme
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Custom Navigation**: Floating sidebar navigation with mobile menu
- **SEO Optimized**: Proper metadata and structured markup

### Pages
- **Homepage**: Hero section with services overview
- **Services**: Detailed service pages with dynamic routing
- **Academy**: Course listings with detailed course pages
- **Blog**: Blog posts with full article pages
- **Case Studies**: Success stories and client testimonials
- **About**: Company information and team bios
- **Contact**: Contact form and FAQ section
- **Pricing**: Pricing plans and service packages
- **Careers**: Job listings and recruitment information
- **Authentication**: Login/Signup pages with password reset
- **Dashboard**: Client portal with analytics
- **Legal**: Privacy policy and terms of service

### Technical Stack
- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber (future integration)
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form with Zod validation
- **Email**: Resend (configured but not yet integrated)
- **UI Components**: shadcn/ui (40+ components)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /api                    # API routes
    /contact             # Contact form endpoint
    /newsletter          # Newsletter subscription
    /quote              # Quote request endpoint
    /health             # Health check endpoint
  /services              # Service detail pages
  /academy               # Course detail pages
  /blog                  # Blog post pages
  /dashboard             # Client dashboard
  /careers               # Job listings
  /case-studies          # Client success stories
  /login                 # Login page
  /signup                # Registration page
  /forgot-password       # Password reset
  /privacy               # Privacy policy
  /terms                 # Terms of service
  globals.css            # Global styles
  layout.tsx             # Root layout
  page.tsx               # Homepage
  not-found.tsx          # 404 page

/components
  /navigation            # Navigation components
  /ui                    # shadcn/ui components
  /3d                    # 3D scene components
  /animations            # Framer Motion animations
  /sections              # Reusable page sections

/lib
  auth.ts               # NextAuth configuration
  db.ts                 # Prisma client
  constants.ts          # App constants
  validation.ts         # Zod schemas
  animations.ts         # Animation utilities

/prisma
  schema.prisma         # Database schema

/public                 # Static assets
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""

# Email
RESEND_API_KEY=""

# Payments (optional)
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
FLUTTERWAVE_SECRET_KEY=""
```

## Key Components

### Navigation
- **SidebarNav**: Custom sidebar navigation with mobile responsiveness
- Mobile menu toggle for small screens
- Active route highlighting

### Animations
- **FloatingCard**: Vertical floating animation
- **FadeInUp**: Fade and slide up on scroll
- **ScaleOnHover**: Scale effect on hover
- **Parallax**: Parallax scrolling effect

### Forms
- Contact form with validation
- Quote request form
- Newsletter subscription
- Login/signup forms

### 3D Components
- **AnimatedGlobe**: Interactive rotating Earth globe
- Smooth animations and lighting
- Responsive canvas rendering

## API Routes

### POST /api/contact
Submit a contact form message
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "message": "string"
}
```

### POST /api/newsletter
Subscribe to newsletter
```json
{
  "email": "string"
}
```

### POST /api/quote
Request a quote
```json
{
  "companyName": "string",
  "email": "string",
  "phone": "string",
  "serviceType": "string",
  "companySize": "string",
  "description": "string"
}
```

## Database Schema

The Prisma schema includes models for:
- Users (with roles: admin, client, student)
- Services
- Engagements
- Reports
- Invoices & Payments
- Courses & Lessons
- Enrollments & Progress
- Blog Posts
- Leads
- Testimonials

See `/prisma/schema.prisma` for full details.

## Styling

### Design System
- **Colors**: Primary (tech blue), neutral grays, accent colors
- **Typography**: Geist for sans-serif, Geist Mono for code
- **Spacing**: Tailwind's standardized spacing scale
- **Radius**: 0.625rem default border radius

### Design Tokens (CSS Variables)
All colors are theme-aware with light/dark mode support:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--muted`, `--accent`
- `--destructive` (for errors/warnings)
- `--border`, `--input`, `--ring`

## Future Enhancements

- [ ] Complete NextAuth integration with OAuth providers
- [ ] Database connection and user management
- [ ] Payment integration (Stripe, Flutterwave, M-Pesa)
- [ ] Email notifications (Resend)
- [ ] Advanced 3D graphics and animations
- [ ] Client portal with secure document vault
- [ ] Real-time incident response features
- [ ] Course enrollment and payment flow
- [ ] Admin dashboard for content management
- [ ] Analytics and reporting

## Performance

- Server-Side Rendering (SSR) for SEO
- Static generation where possible
- Optimized images and assets
- Code splitting and lazy loading
- Font optimization with next/font

## Security

- Protected API routes with validation
- Secure session management (NextAuth)
- CSRF protection
- Input sanitization with Zod
- Environment variable protection
- Security headers configured

## Deployment

The project is ready for deployment to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

## Support

For questions or issues, contact:
- Email: zentrixlabs.com@gmail.com
- Phone: +254 (0) 108655123
- Website: https://omni-trust-africa-website-n4tp7u6ju.vercel.app/

## License

Proprietary - All rights reserved

## Author

Misheck 
