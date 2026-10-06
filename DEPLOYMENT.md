# Jewellery Garden - Production Deployment Guide

This guide walks you through deploying **Jewellery Garden** into production:
- **Backend (NestJS + MongoDB Atlas)** on [Render](https://render.com)
- **Frontend (Next.js 16)** on [Netlify](https://netlify.com)

---

## Architecture Overview

```
                      +-----------------------------+
                      |       Netlify (CDN)         |
                      |   Frontend (Next.js 16)     |
                      |  jewellerygarden.netlify.app |
                      +--------------+--------------+
                                     |
                                     | API Requests (NEXT_PUBLIC_API_URL)
                                     v
                      +-----------------------------+
                      |       Render Web Service    |
                      |    Backend (NestJS API)     |
                      |  api.jewellerygarden.onrender|
                      +--------------+--------------+
                                     |
                                     | DATABASE_URL (mongodb+srv://...)
                                     v
                      +-----------------------------+
                      |      MongoDB Database       |
                      |   (MongoDB Atlas / Cloud)   |
                      +-----------------------------+
```

---

## Step 1: Deploy Backend on Render

> **Tip:** Deploy the backend first so you have your live Backend URL ready to configure in Netlify.

### Option A: 1-Click Blueprint Deploy using `render.yaml` (Recommended)

1. Push this repository to GitHub / GitLab.
2. Log into your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** > **Blueprint**.
4. Connect your `Jewellery-Garden` repository.
5. Render will detect [`render.yaml`](./render.yaml) automatically:
   - When prompted for `DATABASE_URL`, paste your MongoDB Atlas connection string (`mongodb+srv://...`).
   - It will create a **Web Service** (`jewellery-garden-backend`) configured with:
     - **Root Directory:** `Backend`
     - **Build Command:** `npm install && npx prisma generate && npm run build`
     - **Start Command:** `npx prisma db push && npm run start:prod`
6. Click **Apply**.
7. Once deployed, copy your Render Web Service URL (e.g. `https://jewellery-garden-backend.onrender.com`).

---

### Option B: Manual Web Service Setup on Render

1. Log into your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Select your GitHub repository.
4. Configure the following settings:
   - **Name:** `jewellery-garden-backend`
   - **Region:** Any close region (e.g., Oregon, Frankfurt, Singapore)
   - **Root Directory:** `Backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npx prisma db push && npm run start:prod`
5. Add the **Environment Variables**:
   | Key | Value | Notes |
   | --- | --- | --- |
   | `NODE_ENV` | `production` | Production mode |
   | `PORT` | `10000` | Port assigned by Render |
   | `DATABASE_URL` | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/jewellery_garden?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | *`random_secure_32+_char_string`* | Used for JWT authentication tokens |
   | `JWT_EXPIRES_IN` | `7d` | Token lifetime |
   | `ADMIN_EMAIL` | `admin@jewellerygardenpvtltd.com` | Default admin email |
   | `ADMIN_PASSWORD` | `Admin@Garden2026!` | Set your secure admin password |
   | `SMTP_HOST` | `smtp.gmail.com` | (Optional) For email OTP |
   | `SMTP_PORT` | `587` | (Optional) |
   | `SMTP_USER` | `support@jewellerygardenpvtltd.com` | (Optional) |
   | `SMTP_PASS` | `app_password_here` | (Optional) Gmail App Password |
5. Click **Create Web Service**.
6. (Optional) Run Database Seeding:
   - Go to the **Shell** tab in your Render Web Service dashboard and run:
     ```bash
     npm run prisma:seed
     ```

---

## Step 2: Deploy Frontend on Netlify

1. Log into your [Netlify Dashboard](https://app.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Authorize GitHub and select your `Jewellery-Garden` repository.
4. Netlify will automatically detect the settings from [`netlify.toml`](./netlify.toml):
   - **Base directory:** `Frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `Frontend/.next`
   - **Plugin:** `@netlify/plugin-nextjs`
5. Click **Add environment variables** and configure:
   | Key | Value | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_API_URL` | `https://jewellery-garden-backend.onrender.com` | **Your Render Backend URL** (no trailing slash) |
   | `GEMINI_API_KEY` | *`AIzaSy...`* | (Optional) Google Gemini API Key for AI Concierge Chat |
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | *(from Firebase Console)* | Optional (defaults baked into client) |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | *(from Firebase Console)* | Optional |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | *(from Firebase Console)* | Optional |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | *(from Firebase Console)* | Optional |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| *(from Firebase Console)* | Optional |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | *(from Firebase Console)* | Optional |
   | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | *(from Firebase Console)* | Optional |

6. Click **Deploy Jewellery Garden**.
7. Netlify will build the Next.js site and publish it live!

---

## Step 3: Authorize Netlify Domain in Firebase (For Google Authentication)

If you use Google Sign-in:
1. Go to the [Firebase Console](https://console.firebase.google.com).
2. Open your project: **jewellry-garden**.
3. Navigate to **Authentication** > **Settings** > **Authorized domains**.
4. Click **Add domain** and enter your Netlify site domain:
   ```
   your-site-name.netlify.app
   ```
   *(and your custom domain if you connect one later)*.

---

## Verification Checklist

- [ ] Backend is running healthy on Render (`https://your-backend.onrender.com`).
- [ ] Database tables created automatically via `npx prisma db push`.
- [ ] Frontend successfully deployed on Netlify.
- [ ] `NEXT_PUBLIC_API_URL` is set in Netlify environment variables pointing to Render.
- [ ] Customer login, Wishlist, Cart, and Admin Dashboard connect to live Render API.
- [ ] Netlify domain added to Firebase Authorized Domains for Google Auth.
