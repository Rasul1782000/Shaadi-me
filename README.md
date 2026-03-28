# ShaadiMe

This repository is organized around two applications:

- `backend/`: Laravel PHP backend
- `frontend/`: Angular web app

## Structure

- `backend/app/`: Laravel controllers and models
- `backend/routes/`: Laravel API route definitions
- `backend/database/migrations/`: database schema migrations
- `frontend/src/app/pages/`: route-level Angular pages
- `frontend/src/app/components/`: shared Angular UI components
- `frontend/src/app/services/`: Angular API services

## Run The Angular App

From the Angular app directory:

```bash
cd frontend
npm install
npm run start -- --port 3000 --host 127.0.0.1 --proxy-config proxy.conf.json
```

Open `http://localhost:3000`.

## Run Both Together

From the repository root:

```bash
./run-dev.sh
```

Override ports or hosts if needed:

```bash
BACKEND_PORT=8001 FRONTEND_PORT=3001 ./run-dev.sh
```

## Run The Laravel Backend

The Angular proxy forwards `/api` requests to `http://localhost:8000`.

From the backend directory:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

The backend is now a real Laravel application using SQLite for local development.

## Available API Endpoints

- `POST /api/leads`
- `GET /api/venues`
