# PostgreSQL Project

Production-ready REST API with Express, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- Express.js
- TypeScript 5.5.4
- Prisma ORM
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   ├── services/
│   └── lib/
├── scripts/
│   └── fix-prisma.js
├── api/
│   └── index.js
├── .env
├── package.json
├── tsconfig.json
├── vercel.json
└── API_DOCUMENTATION.md
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database (Neon recommended)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
PORT=5000
```

### Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## API Routes

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/profile` — Get current user profile (authenticated)

### Users (`/api/users`)
- `GET /api/users` — Get all users (admin only)
- `GET /api/users/:id` — Get user by ID (authenticated)
- `PUT /api/users/:id` — Update user (admin only)
- `DELETE /api/users/:id` — Soft delete user (admin only)

### Categories (`/api/categories`)
- `GET /api/categories` — Get all categories
- `GET /api/categories/:id` — Get category by ID
- `POST /api/categories` — Create category (authenticated, admin)
- `PUT /api/categories/:id` — Update category (authenticated, admin)
- `DELETE /api/categories/:id` — Soft delete category (authenticated, admin)

### Products (`/api/products`)
- `GET /api/products` — Get all products
- `GET /api/products/:id` — Get product by ID
- `POST /api/products` — Create product (authenticated)
- `PUT /api/products/:id` — Update product (authenticated)
- `DELETE /api/products/:id` — Soft delete product (authenticated, admin)

### Reviews (`/api/reviews`)
- `GET /api/reviews/product/:productId` — Get reviews by product
- `POST /api/reviews/product/:productId` — Create review (authenticated)
- `PUT /api/reviews/:id` — Update review (authenticated)
- `DELETE /api/reviews/:id` — Delete review (authenticated)

### Orders (`/api/orders`)
- `GET /api/orders` — Get all orders (authenticated)
- `GET /api/orders/:id` — Get order by ID (authenticated)
- `POST /api/orders` — Create order (authenticated)
- `PUT /api/orders/:id/status` — Update order status (authenticated, admin)
- `DELETE /api/orders/:id` — Soft delete order (authenticated, admin)

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for full API reference.

## Deployment

### Vercel (Production - Live)

- **Live URL:** https://postgresql-project.vercel.app
- **Build:** TypeScript 5.5.4 + Prisma generate in postinstall
- **Config:** `vercel.json`
- **Notes:** Requires `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `BCRYPT_ROUNDS` env vars set in Vercel dashboard.

## License

ISC
