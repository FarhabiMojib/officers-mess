# Officers' Mess Live

A mobile-first Progressive Web App (PWA) for managing an Officers' Mess—covering daily meal & guest scheduling, extra egg tracking, expense & account ledgers, approvals, kitchen prep, and printable mess bills—backed by Firebase Realtime Database and Firebase Hosting.

## Features

- **Role-Based Access**: Separate views for **Admin**, **Officers**, and **Cook (Kitchen Prep)**.
- **Admin 2FA & Trusted Devices**: Salted SHA-256 PIN hashing, cryptographic trusted-device verification with remote approval/revocation, and optional RFC 6238 TOTP Authenticator 2FA.
- **Meal, Guest & Extra-Egg Engine**: Breakfast (`0.5`), Lunch (`1.0`), Dinner (`1.0`), continuous auto-schedules, and daily extra-egg tracking.
- **Server-Synced Cutoffs**: Enforces same-day cutoffs (5:00 AM Breakfast, 10:00 AM Lunch, 5:00 PM Dinner) and retroactive locks using Firebase's `.info/serverTimeOffset`.
- **Approval Workflows**: Officers can submit **Deposit Requests** and **Preferred Meal Requests**; Admin approval atomically updates balances, transactions, and the Menu & Notice Board.
- **Bangla Kitchen Prep Dashboard**: Dedicated Bangla interface for the cook with **Today / Tomorrow** toggles, active menu & notice display, and live meal/egg headcount alerts.
- **Ledgers, Billing & Backups**: Category-wise expense ledger, monthly/archived account ledgers, 6-per-page legal-size PDF bill printing, monthly CSV export, JSON backup/restore, and an Admin activity audit log.

## Project Structure

```text
.
├── .gitignore
├── README.md
├── firebase.json
└── public/
    ├── 404.html
    ├── index.html
    └── sw.js
```

## Deployment (Firebase Hosting)

This app uses Firebase Hosting's reserved auto-initialization endpoints (`/__/firebase/init.js`), so no Firebase API keys are stored in the repository.

```bash
npm install -g firebase-tools
firebase login
firebase use <your-firebase-project-id>
firebase deploy --only hosting
```
