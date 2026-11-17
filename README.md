# NestJS RealWorld API

Pet project: a Medium-like blogging platform API (based on the [RealWorld](https://github.com/gothinkster/realworld) spec), built step by step while learning [NestJS](https://nestjs.com/).

Built while going through the Udemy course *"NestJS: Building Real Project API From Scratch"*.

## Stack

- NestJS + TypeScript
- (planned) PostgreSQL + TypeORM
- (planned) JWT authentication

## Roadmap

- [x] Project setup
- [ ] Database & config
- [ ] Tags
- [ ] Users: registration, login, auth middleware
- [ ] Articles: CRUD, slugs
- [ ] Favorites & feed
- [ ] Profiles & follows
- [ ] Comments

## Getting started

```bash
npm install
npm run start:dev
```

The app runs on http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Compile to `dist/` |
| `npm run lint` | Lint the code |
| `npm test` | Unit tests |
| `npm run test:e2e` | End-to-end tests |
