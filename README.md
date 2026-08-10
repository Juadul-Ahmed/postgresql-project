# PostgreSQL Project

Production-ready REST API with Express, TypeScript,5.5.4, Prisma, and PostgreSQL.

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
├── netlify/
│   └── functions/
│       └── express.js
├── api/
│   └── index.js
├── .env
├── Dockerfile
├── .dockerignore
├── package.json
├── tsconfig.json
├── vercel.json
├── netlify.toml
├── render.yaml
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

### Render

- **Config:** `render.yaml`
- **Setup:** Create PostgreSQL database + Web Service from GitHub
- **Notes:** Persistent Node.js server, Prisma works reliably

### Netlify

- **Config:** `netlify.toml` + `netlify/functions/express.js`
- **Setup:** Connect GitHub repo, set publish dir to `dist`
- **Notes:** Serverless functions, may have Prisma compatibility issues

### Docker / Koyeb

- **Config:** `Dockerfile`
- **Setup:** Use Docker builder on Koyeb or any container host
- **Port:** 5000

## License

ISC
