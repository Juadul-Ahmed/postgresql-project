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
