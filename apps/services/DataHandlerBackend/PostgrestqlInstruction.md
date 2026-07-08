# Ascendra — PostgreSQL Local Setup Instructions

## What gets created

The SQL script creates **one role** and **13 databases** inside your single PostgreSQL instance:

| Database | Service |
|---|---|
| `auth_db` | auth-service |
| `learning_db` | learning-service |
| `assessment_db` | assessment-service |
| `community_db` | community-service |
| `guild_db` | guild-service |
| `mentor_db` | mentor-service |
| `marketplace_db` | marketplace-service |
| `payment_db` | payment-service |
| `blockchain_db` | blockchain-service |
| `ai_db` | ai-service |
| `notification_db` | notification-service |
| `analytics_db` | analytics-service |
| `economy_core_db` | economy-core |

Role created: `ascendra` / password: `ascendra`

---

## Step 1 — Run the SQL script in pgAdmin

1. Open **pgAdmin 4** and connect using:
   - Host: `localhost`
   - Port: `5432`
   - Username: `postgres`
   - Password: `@l03e1t3`

2. Right-click your server → **Query Tool**.

3. Open `Postgresql.sql` (File → Open) or paste its contents into the query editor.

4. Click **Execute / Run (F5)**.

5. You should see `CREATE DATABASE` repeated 13 times in the Messages panel with no errors.

---

## Step 2 — Verify in pgAdmin

In the left panel, expand: **Servers → PostgreSQL → Databases**

You should see all 13 new databases listed alongside `AscendraDatabase` and `postgres`.

---

## Step 3 — Run Alembic migrations for each service

Each service uses **Alembic** to create its tables. From the project root, run for each service:

```bash
# Example for auth-service
cd apps/services/auth-service
pip install -r requirements.txt       # first time only
alembic upgrade head

# Repeat for every service
cd ../economy-core    && alembic upgrade head
cd ../learning-service && alembic upgrade head
cd ../assessment-service && alembic upgrade head
cd ../community-service && alembic upgrade head
cd ../guild-service   && alembic upgrade head
cd ../mentor-service  && alembic upgrade head
cd ../marketplace-service && alembic upgrade head
cd ../payment-service && alembic upgrade head
cd ../blockchain-service && alembic upgrade head
cd ../ai-service      && alembic upgrade head
cd ../notification-service && alembic upgrade head
cd ../analytics-service && alembic upgrade head
```

---

## Step 4 — Start a service

```bash
cd apps/services/auth-service
uvicorn app.main:app --reload --port 8001
```

Each service reads its `.env` file automatically via `python-dotenv`.

---

## Notes

- The `.env` files have already been created for all 13 services.
- All services connect on port **5432** (your local PostgreSQL) — the different ports in `.env.example` were for Docker Compose containers.
- The `ascendra` role password is intentionally simple (`ascendra`) for local dev only.
- Never commit `.env` files to version control.
