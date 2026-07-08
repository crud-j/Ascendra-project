# Ascendra — batch Alembic setup for all 12 remaining services
# Run from: apps\services\

$base = "C:\Users\githu\OneDrive\Documents\Ascendra-project\apps\services"

$services = @(
    @{ name="ai-service";          db="ai_db";           model="app.models.ai_session" },
    @{ name="analytics-service";   db="analytics_db";    model="app.models.event_log" },
    @{ name="assessment-service";  db="assessment_db";   model="app.models.assessment" },
    @{ name="blockchain-service";  db="blockchain_db";   model="app.models.anchor" },
    @{ name="community-service";   db="community_db";    model="app.models.qa" },
    @{ name="economy-core";        db="economy_core_db"; model="app.models.ledgers" },
    @{ name="guild-service";       db="guild_db";        model="app.models.guild" },
    @{ name="learning-service";    db="learning_db";     model="app.models.course" },
    @{ name="marketplace-service"; db="marketplace_db";  model="app.models.bounty" },
    @{ name="mentor-service";      db="mentor_db";       model="app.models.session" },
    @{ name="notification-service";db="notification_db"; model="app.models.notification" },
    @{ name="payment-service";     db="payment_db";      model="app.models.payment" }
)

$envPyTemplate = @'
import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from app.database import Base
import {MODEL_MODULE}  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()


def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
'@

foreach ($svc in $services) {
    $svcPath = "$base\$($svc.name)"
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  $($svc.name)" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    # 1. Create venv
    Write-Host "  [1/5] Creating venv..." -ForegroundColor Yellow
    & python -m venv "$svcPath\venv" 2>&1 | Out-Null

    # 2. Install requirements
    Write-Host "  [2/5] Installing dependencies..." -ForegroundColor Yellow
    $pipOut = & "$svcPath\venv\Scripts\pip.exe" install -r "$svcPath\requirements.txt" 2>&1
    $lastLine = ($pipOut | Where-Object { $_ -match "Successfully installed|already satisfied|ERROR" } | Select-Object -Last 1)
    Write-Host "        $lastLine"

    # 3. Init Alembic
    Write-Host "  [3/5] Initialising Alembic..." -ForegroundColor Yellow
    Push-Location $svcPath
    & ".\venv\Scripts\alembic.exe" init alembic 2>&1 | Out-Null

    # 4. Patch alembic.ini with correct DB URL
    Write-Host "  [4/5] Configuring alembic.ini..." -ForegroundColor Yellow
    $iniPath = "$svcPath\alembic.ini"
    (Get-Content $iniPath) -replace "sqlalchemy\.url = driver://user:pass@localhost/dbname", "sqlalchemy.url = postgresql+asyncpg://ascendra:ascendra@localhost:5432/$($svc.db)" | Set-Content $iniPath

    # 5. Write async env.py
    Write-Host "  [5/5] Writing env.py..." -ForegroundColor Yellow
    $envPy = $envPyTemplate -replace "\{MODEL_MODULE\}", $svc.model
    Set-Content -Path "$svcPath\alembic\env.py" -Value $envPy -Encoding UTF8

    # 6. Generate migration
    Write-Host "  [6/6] Generating + running migration..." -ForegroundColor Yellow
    $revOut = & ".\venv\Scripts\alembic.exe" revision --autogenerate -m "initial_schema" 2>&1
    $detected = $revOut | Where-Object { $_ -match "Detected added" }
    if ($detected) { $detected | ForEach-Object { Write-Host "        $_" } }

    # 7. Run migration
    $upOut = & ".\venv\Scripts\alembic.exe" upgrade head 2>&1
    $ran = $upOut | Where-Object { $_ -match "Running upgrade" }
    if ($ran) {
        Write-Host "        $ran" -ForegroundColor Green
    } else {
        Write-Host "        (check output for errors)" -ForegroundColor Red
        $upOut | Select-Object -Last 5 | ForEach-Object { Write-Host "        $_" }
    }

    Pop-Location
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  All done!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
