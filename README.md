# PostgreSQL Project

Production-ready REST API with Express, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- Express.js
- TypeScript
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
├── api/
│   └── index.ts
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

Deployed on Vercel with Neon PostgreSQL.

## License

ISC
