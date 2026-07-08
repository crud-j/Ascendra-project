-- =============================================================================
-- Ascendra — PostgreSQL Local Development Setup Script
--
-- Run this as the 'postgres' superuser in pgAdmin Query Tool or psql.
-- This creates the 'ascendra' role and all 13 service databases.
-- =============================================================================

-- Step 1: Create the ascendra role (used by all services)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'ascendra') THEN
        CREATE ROLE ascendra WITH LOGIN PASSWORD 'ascendra';
    END IF;
END
$$;

-- Step 2: Create all 13 service databases
CREATE DATABASE auth_db          OWNER ascendra;
CREATE DATABASE learning_db      OWNER ascendra;
CREATE DATABASE assessment_db    OWNER ascendra;
CREATE DATABASE community_db     OWNER ascendra;
CREATE DATABASE guild_db         OWNER ascendra;
CREATE DATABASE mentor_db        OWNER ascendra;
CREATE DATABASE marketplace_db   OWNER ascendra;
CREATE DATABASE payment_db       OWNER ascendra;
CREATE DATABASE blockchain_db    OWNER ascendra;
CREATE DATABASE ai_db            OWNER ascendra;
CREATE DATABASE notification_db  OWNER ascendra;
CREATE DATABASE analytics_db     OWNER ascendra;
CREATE DATABASE economy_core_db  OWNER ascendra;

-- Step 3: Grant all privileges on each database to ascendra
GRANT ALL PRIVILEGES ON DATABASE auth_db         TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE learning_db     TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE assessment_db   TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE community_db    TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE guild_db        TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE mentor_db       TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE marketplace_db  TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE payment_db      TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE blockchain_db   TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE ai_db           TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE notification_db TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE analytics_db    TO ascendra;
GRANT ALL PRIVILEGES ON DATABASE economy_core_db TO ascendra;
