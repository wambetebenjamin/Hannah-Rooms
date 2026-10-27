# Hannah Rooms

A room you can trust. Room and boarding discovery for students, interns, and
travelling workers in Kenya. Built as a natural extension of the uploaded
template (`vacation-rental-master.zip`, preserved untouched in this repo and
documented in `TEMPLATE-AUDIT.md`).

## Quick start

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Node 24 is expected (see `.nvmrc`); Node 20.9+
works for local development.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Seeker | seeker@hannahrooms.test | SeekerDemo123! |
| Host | host@hannahrooms.test | HostDemo123! |

Sign-in with email and password works out of the box. Google OAuth appears when
`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.

## Environment

Copy `.env.example` to `.env.local` and fill in values. Without SMTP, Blob, KV,
and reCAPTCHA credentials the site runs in preview mode: emails are logged,
photos are stored under `public/uploads`, data lives in `.data/db.json`, and
captcha verification is skipped (the visible human check still appears if you
later enable reCAPTCHA and a score falls below 0.5).

## Pages

`/`, `/rooms`, `/rooms/[slug]`, `/list-room`, `/dashboard`,
`/dashboard/enquiries`, `/dashboard/listings`, `/pricing`, `/login`,
`/register`, `/about`, `/legal/privacy-policy`, `/legal/terms`,
`/legal/cookie-policy`, plus branded 404 and 500 pages.

## API routes

`/api/auth/register` (POST), `/api/rooms/create` (POST),
`/api/rooms/update` (PUT), `/api/enquiries/create` (POST),
`/api/enquiries/reply` (POST), `/api/send-enquiry` (POST), and the NextAuth
handler under `/api/auth/[...nextauth]`.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

## Notes

- Images: free Pexels photos, credited in `image-credits.md`.
- Every room detail page shows safety tips. Hannah Rooms is not a party to any
  lease. Verify every room in person before paying.
