import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller()
export class AppController {
  @Get()
  getRoot(@Req() req: Request, @Res() res: Response) {
    const acceptsHtml = req.headers.accept && req.headers.accept.includes("text/html");

    if (acceptsHtml) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jewellery ERP API — Operational</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at top right, #1E1815 0%, #0B0C0E 70%);
      color: #F3F4F6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: rgba(18, 20, 24, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      max-width: 580px;
      width: 100%;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34D399;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.9); }
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    p.desc {
      font-size: 13px;
      color: #9CA3AF;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .endpoints-box {
      background: rgba(10, 11, 14, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    .endpoints-title {
      font-size: 10px;
      font-weight: 700;
      color: #F59E0B;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .endpoint-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 12px;
    }
    .endpoint-item:last-child { border-bottom: none; }
    .method {
      background: rgba(200, 35, 42, 0.18);
      color: #F87171;
      font-weight: 700;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 6px;
      font-family: monospace;
    }
    .route {
      color: #E5E7EB;
      font-family: monospace;
      font-size: 12px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #6B7280;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge-pill">
      <span class="dot"></span>
      API Operational • Vercel Edge Serverless
    </div>
    <h1>Jewellery ERP Backend API</h1>
    <p class="desc">
      Enterprise NestJS API connected to MongoDB Atlas. Serving real-time data for product catalogs, customer authentication, and admin dashboards.
    </p>

    <div class="endpoints-box">
      <div class="endpoints-title">Active API Endpoints</div>
      <div class="endpoint-item">
        <span class="route">/api/products</span>
        <span class="method">GET / POST</span>
      </div>
      <div class="endpoint-item">
        <span class="route">/api/orders</span>
        <span class="method">GET / POST</span>
      </div>
      <div class="endpoint-item">
        <span class="route">/api/auth/admin-login</span>
        <span class="method">POST</span>
      </div>
      <div class="endpoint-item">
        <span class="route">/api/customers</span>
        <span class="method">GET / POST</span>
      </div>
      <div class="endpoint-item">
        <span class="route">/api/support</span>
        <span class="method">GET / POST</span>
      </div>
      <div class="endpoint-item">
        <span class="route">/api/admin/search</span>
        <span class="method">GET</span>
      </div>
    </div>

    <div class="footer">
      <span>Jewellery ERP v1.0.0</span>
      <span style="color: #34D399; font-weight: 600;">● Online</span>
    </div>
  </div>
</body>
</html>`);
    }

    return res.json({
      status: "online",
      name: "Jewellery ERP API",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "production",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      endpoints: {
        products: "/api/products",
        orders: "/api/orders",
        adminLogin: "/api/auth/admin-login",
        customers: "/api/customers",
        support: "/api/support",
        search: "/api/admin/search",
      },
    });
  }

  @Get("health")
  getHealth() {
    return {
      status: "healthy",
      service: "jewellery-erp-backend",
      timestamp: new Date().toISOString(),
    };
  }
}
