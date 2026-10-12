# Backend setup

1. Copy `.env.example` to `.env` and set `MONGO_URI`, `ADMIN_EMAIL`, and a long random `JWT_SECRET`.
2. Generate a bcrypt password hash and place it in `ADMIN_PASSWORD_HASH`:

   ```powershell
   node --input-type=module -e "import bcrypt from 'bcryptjs'; console.log(await bcrypt.hash('YOUR_PASSWORD', 12))"
   ```

   Replace `YOUR_PASSWORD` with a strong admin password before running the command. Store only the resulting hash in `.env`.
3. Set `FRONTEND_URL` to the frontend origin, then start the API with `npm run dev`.
4. Start the frontend with `npm run dev` from `frontend`. Open `/admin/login` to sign in and manage contact requests and projects.

Admin access uses an eight-hour, HTTP-only, same-site cookie. The dashboard can list, search, and update inquiry statuses; email and phone links open the visitor's email app or dialer.

## Projects

Open `/admin/projects` after signing in to publish or remove portfolio projects. Each project includes a name, category, headline, description, HTTPS preview image URL, and optional HTTPS project link. Project data is stored in MongoDB and appears in the public Work section.

- `GET /api/projects` returns the public project list.
- `GET /api/admin/projects` lists projects for an authenticated admin.
- `POST /api/admin/projects` creates a project for an authenticated admin.
- `DELETE /api/admin/projects/:id` removes a project for an authenticated admin.

Project requests follow the route → controller → service → model layers; the frontend feature uses an API module and a shared React hook for public and admin views.
