.

# 📘 **Post-Frontend Roadmap — GitCourse**

This document outlines all tasks to be executed **after the frontend is completed**, with the goal of consolidating the backend, strengthening the infrastructure, and preparing the environment for a professional, secure, and scalable production deployment.

## 🟩 1) Backend Review and Hardening (Short Term)

### **1.1 Adjust the systemd service**

- Move `StartLimitIntervalSec` and `StartLimitBurst` to the `[Unit]` section

- Ensure `EnvironmentFile=/var/www/gitcourse/.env` is correct

- Validate file permissions and ownership

- Confirm the service starts without warnings

### **1.2 Create real Alembic migrations**

- Add migration for `created_at` and `updated_at` fields

- Add migration for the `role` ENUM

- Review SQLAlchemy and Pydantic models for consistency

- Run `alembic upgrade head` and validate changes in the database

### **1.3 Review logging**

- Ensure uvicorn logs are flowing into journald

- Add `logrotate` rules (optional but recommended)

- Validate healthcheck and monitoring logs

## 🟦 2) Production Infrastructure (Medium Term)

### **2.1 Configure Nginx as a reverse proxy**

- Route `/api` → FastAPI backend (port 8000)

- Route `/` → compiled frontend

- Enable static file caching

- Add security headers (CSP, HSTS, X-Frame-Options, etc.)

### **2.2 Configure automatic HTTPS**

- Install Certbot

- Issue certificates for the domain

- Set up automatic renewal

- Redirect HTTP → HTTPS

### **2.3 Set up automatic PostgreSQL backups**

- Daily `pg_dump` script

- Compression (`.gz`)

- Retention policy (7–30 days)

- Test restoration in an isolated environment

## 🟧 3) Automation and Reliability (Long Term)

### **3.1 Automated deployment**

- Create CI pipeline (GitHub Actions or GitLab CI)

- Deploy via SSH with automatic service restart

- Run tests before deployment

- Add success/failure notifications

### **3.2 Monitoring**

- Healthcheck via systemd timers

- Failure alerts (email, Telegram, etc.)

- Uptime monitoring

- Optional: centralized logging

### **3.3 Security hardening**

- Create a dedicated user for the backend (avoid running as root)

- Review directory permissions

- Configure firewall (UFW)

- Disable unnecessary ports

- Review SSH keys and access policies

## 🟩 4) Organization and Documentation (When Time Allows)

### **4.1 Internal documentation**

- Document the deployment workflow

- Document backend structure

- Document environment variables

- Create a migration checklist

### **4.2 Repository organization**

- Add internal README for developers

- Create a `/docs` folder with setup instructions

- Standardize maintenance scripts

## 🟦 Strategic Summary

- **None of these tasks are urgent right now.**

- **All of them become important once the frontend is ready.**

- The backend is currently clean, stable, and functional.

- This roadmap ensures the system evolves professionally and securely.
