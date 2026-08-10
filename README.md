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

### Koyeb (Recommended - No Credit Card Required)

1. Go to [https://app.koyeb.com](https://app.koyeb.com) and sign up with GitHub
2. Click **Create Web Service** → select your repo `Juadul-Ahmed/postgresql-project`
3. Choose **Docker** as the builder (uses the `Dockerfile` in the repo)
4. Set **Port** to `5000`
5. Add environment variables:
   - `DATABASE_URL` — your Neon PostgreSQL connection string
   - `JWT_SECRET` — your JWT secret
   - `JWT_EXPIRES_IN` — `7d`
   - `BCRYPT_ROUNDS` — `10`
6. Click **Deploy**

### Vercel

See `vercel.json` for configuration. Requires environment variables set in Vercel dashboard.

### Netlify

See `netlify.toml` and `netlify/functions/express.js` for configuration.

## License

ISC
