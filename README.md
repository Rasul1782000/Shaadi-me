# 💍 ShaadiMe — Wedding Planning Platform

<p align="center">
  <strong>Your dream wedding, beautifully planned.</strong><br>
  <em>A full‑stack wedding planning platform with an Angular SPA frontend & Laravel REST API backend.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular&logoColor=white" alt="Angular 21">
  <img src="https://img.shields.io/badge/Laravel-12-FB503B?logo=laravel&logoColor=white" alt="Laravel 12">
  <img src="https://img.shields.io/badge/PHP-8.3-777BB4?logo=php&logoColor=white" alt="PHP 8.3">
  <img src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/PrimeNG-21-06B6D4?logo=primeng&logoColor=white" alt="PrimeNG 21">
  <img src="https://img.shields.io/badge/tests-20_passing-28a745?logo=phpunit&logoColor=white" alt="20 tests passing">
</p>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗 Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [📡 API Endpoints](#-api-endpoints)
- [🗄 Database](#-database)
- [🧪 Testing](#-testing)
- [📂 Project Structure](#-project-structure)
- [🛠 Recent Changes](#-recent-changes)

---

## ✨ Features

| Area | Details |
|------|---------|
| 👰 **Multi‑Step Intake Form** | 5‑step wedding planner wizard collecting couple details, date, budget, style preferences, events & services |
| 🌍 **Community Templates** | 12 cultural traditions (Punjabi, Telugu, Tamil, Kannada, Malayali, Marathi, Gujarati, Bengali, Rajasthani, Marwari, Muslim, Christian) with tailored ceremony event lists |
| 🎨 **Style Selection** | 6 wedding styles (Royal Grandeur, Intimate Garden, Traditional South Indian, Minimalist Modern, Floral Extravaganza, Destination) |
| 🛎 **Service Selection** | 12 planning services (Venue, Photography, Catering, Music & DJ, Bridal Makeup, etc.) |
| 🏟 **Venue Discovery** | Paginated venue listings with filtering by city, type & keyword search |
| 📊 **Lead Management** | Backend lead storage with filtering by city, community, date range & full‑text search |
| ⚡ **Rate Limiting** | Lead submission throttled at 10 requests/minute per IP |
| 📱 **Responsive UI** | Tailwind CSS 4 + PrimeNG 21 — desktop & mobile friendly |

---

## 🏗 Architecture

```
ShaadiMe/
├── backend/         Laravel 12 REST API   (PHP 8.3, SQLite)
├── frontend/        Angular 21 SPA        (TypeScript 5.9, PrimeNG, Tailwind CSS 4)
└── run-dev.sh       Launch both apps together
```

The frontend proxies `/api/*` requests to the Laravel backend (default `localhost:8000`).

---

## 🚀 Quick Start

### 🔧 Prerequisites

- PHP **8.3+** with SQLite support
- Composer **2.x**
- Node.js **20+**
- Angular CLI **21.x** (`npm install -g @angular/cli`)

### 🖥 Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8000
```

> 💡 `--seed` loads 12 venues across Hyderabad, Bengaluru & Chennai, plus 3 sample leads.

### 🌐 Frontend Setup

```bash
cd frontend
npm install
ng serve --port 3000 --host 127.0.0.1 --proxy-config proxy.conf.json
```

Open **http://localhost:3000** 🎉

### 🔄 Run Both Simultaneously

```bash
./run-dev.sh
```

Override ports if needed:

```bash
BACKEND_PORT=8001 FRONTEND_PORT=3001 ./run-dev.sh
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/leads` | Submit a new wedding lead | ⚡ Rate‑limited (10/min) |
| `GET` | `/api/leads` | List leads (paginated, filterable) | ❌ |
| `GET` | `/api/venues` | List venues (paginated, filterable) | ❌ |

### 🔍 Lead Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `city` | `string` | Filter by city |
| `community` | `string` | Filter by community/tradition |
| `from_date` | `date` | Leads created on or after this date |
| `to_date` | `date` | Leads created on or before this date |
| `search` | `string` | Search by bride name, groom name, email or phone |

### 🔍 Venue Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `city` | `string` | Filter by city |
| `type` | `string` | Filter by venue type (heritage, hotel, resort, farmhouse, beach, banquet) |
| `search` | `string` | Search by venue name or description |

> 📖 All list endpoints return **10 items per page** with `current_page`, `last_page`, `total` metadata.

---

## 🗄 Database

| Table | Description |
|-------|-------------|
| `leads` | Wedding inquiries — couple info, community, dates, budget, styles, services, ceremony events |
| `venues` | Wedding venues — name, description, city, type, capacity, image |
| `users` | Admin users (authenticatable) |
| `sessions` / `cache` / `jobs` | Laravel infrastructure tables |

**Seeder data:**

- 🏟 **12 venues** across Hyderabad, Bengaluru & Chennai (6 types: heritage, hotel, resort, farmhouse, beach, banquet)
- 👰 **3 sample leads** (Punjabi/Bengaluru, Telugu/Hyderabad, Tamil/Chennai)

---

## 🧪 Testing

### PHPUnit (Backend)

```bash
cd backend
php artisan test
```

<details>
<summary>📊 20 tests · 69 assertions</summary>

| Test Suite | Tests | Coverage |
|------------|-------|----------|
| `LeadApiTest` | 11 | Lead CRUD, validation, pagination, filtering (city, community, date range), search (name, email), ordering |
| `VenueApiTest` | 7 | Venue listing, pagination, filtering (city, type, combined), search (name, description), alphabetical ordering |
| `ExampleTest` | 2 | Sanity checks |
</details>

### Vitest (Frontend)

```bash
cd frontend
ng test
```

---

## 📂 Project Structure

```
backend/
├── app/
│   ├── Http/Controllers/Api/   LeadController, VenueController
│   ├── Models/                  Lead, Venue, User
│   └── Providers/               AppServiceProvider (rate limiter)
├── database/
│   ├── factories/               LeadFactory, VenueFactory, UserFactory
│   ├── migrations/              7 migration files
│   └── seeders/                 DatabaseSeeder, VenueSeeder, LeadSeeder
├── routes/
│   └── api.php                  API route definitions
└── tests/
    ├── Feature/                 LeadApiTest, VenueApiTest, ExampleTest
    └── Unit/                    ExampleTest

frontend/
├── src/app/
│   ├── components/
│   │   ├── intake-form/         5‑step wedding planner wizard
│   │   ├── navbar/              Navigation bar
│   │   ├── footer/              Footer
│   │   └── landing-page/        Hero, cities, decor, themes, venues, FAQ, why-shaadime
│   ├── pages/                   home, weddings, venues, services, destinations, about, press, contact, plan
│   ├── services/                LeadService, PlannerUiService
│   ├── layouts/                 MainLayoutComponent
│   └── app-routing.module.ts    Route definitions
└── proxy.conf.json              API proxy config
```

---

## 🛠 Recent Changes

### 🔄 Database Fixes
- Renamed `guest_count` → `guests` and `wedding_type` → `venue_type` in the `leads` table via a new migration to match the model, controller and frontend contracts
- Removed unused `planning_preference` column

### 🌱 Seeding
- **`LeadFactory`** — generates realistic leads with random communities, cities, styles, services & ceremony events
- **`VenueFactory`** — generates venues with random names, types & capacities for testing
- **`LeadSeeder`** — seeds 3 diverse sample leads for development & demo purposes
- Updated `DatabaseSeeder` to call both `VenueSeeder` and `LeadSeeder`

### ✅ Testing
- **`LeadApiTest`** — 11 comprehensive tests covering:
  - Lead creation (minimal fields & all fields)
  - Validation (required fields, email format)
  - Pagination (15 records → 10 per page)
  - Filtering (city, community, date range)
  - Search (by name & email)
  - Ordering (reverse chronological)
- **`VenueApiTest`** — 7 comprehensive tests covering:
  - Pagination
  - Filtering (city, type, combined)
  - Search (by name & description)
  - Ordering (alphabetical)
- **All 20 tests passing** with 69 assertions

---

<p align="center">
  Made with ❤️ for couples everywhere<br>
  <sub>ShaadiMe © 2026</sub>
</p>
