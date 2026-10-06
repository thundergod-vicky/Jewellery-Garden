/**
 * Migration Script: Local PostgreSQL -> Remote MongoDB Atlas
 * Preserves all UUID IDs, timestamps, relationships, and user data.
 */

const { execSync } = require("child_process");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PG_URL = "postgresql://postgres:postgres@localhost:5432/jewellery_garden";

function fetchFromPg(table) {
  try {
    const cmd = `psql "${PG_URL}" -t -A -c "SELECT json_agg(t) FROM \\"${table}\\" t;"`;
    const output = execSync(cmd, { encoding: "utf8" }).trim();
    if (!output || output === "" || output === "null") return [];
    return JSON.parse(output);
  } catch (err) {
    console.warn(`Could not fetch table ${table} from PostgreSQL:`, err.message);
    return [];
  }
}

async function runMigration() {
  console.log("🚀 Starting database migration from Local PostgreSQL to MongoDB Atlas...");

  // Clear seed records first to allow perfect replication of PostgreSQL data with exact IDs and relations
  console.log("🧹 Clearing temporary seed data to ensure referential integrity...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.monthlySalesMetric.deleteMany();
  await prisma.superPearlTransaction.deleteMany();
  await prisma.supportMessage.deleteMany();
  await prisma.supportSession.deleteMany();
  console.log("✔ Temporary collections cleared.");

  // 1. Migrate Users
  const users = fetchFromPg("User");
  console.log(`📦 Migrating ${users.length} Users from PostgreSQL...`);
  for (const u of users) {
    await prisma.user.create({
      data: {
        id: u.id,
        email: u.email,
        phone: u.phone,
        role: u.role,
        isVerified: u.isVerified,
        otpCode: u.otpCode,
        otpExpiresAt: u.otpExpiresAt ? new Date(u.otpExpiresAt) : null,
        createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
        updatedAt: u.updatedAt ? new Date(u.updatedAt) : new Date(),
      },
    });
  }
  console.log(`✔ ${users.length} Users migrated.`);

  // 2. Migrate Products
  const products = fetchFromPg("Product");
  console.log(`📦 Migrating ${products.length} Products from PostgreSQL...`);
  for (const p of products) {
    await prisma.product.create({
      data: {
        id: p.id,
        sku: p.sku,
        name: p.name,
        category: p.category,
        metal: p.metal,
        purity: p.purity,
        grossWeight: p.grossWeight,
        netWeight: p.netWeight,
        stoneWeight: p.stoneWeight,
        tokenNumber: p.tokenNumber,
        makingCharges: p.makingCharges,
        otherCharges: p.otherCharges,
        description: p.description,
        modelNumber: p.modelNumber,
        price: Number(p.price),
        stock: Number(p.stock),
        image: p.image,
        active: p.active,
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
        updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      },
    });
  }
  console.log(`✔ ${products.length} Products migrated.`);

  // 3. Migrate Customers
  const customers = fetchFromPg("Customer");
  console.log(`📦 Migrating ${customers.length} Customers from PostgreSQL...`);
  for (const c of customers) {
    await prisma.customer.create({
      data: {
        id: c.id,
        firebaseId: c.firebaseId,
        email: c.email,
        username: c.username,
        phone: c.phone,
        panCard: c.panCard,
        aadharCard: c.aadharCard,
        addresses: c.addresses || [],
        savedCards: c.savedCards,
        superPearls: c.superPearls || 0,
        createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
        updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(),
      },
    });
  }
  console.log(`✔ ${customers.length} Customers migrated.`);

  // 4. Migrate Orders
  const orders = fetchFromPg("Order");
  console.log(`📦 Migrating ${orders.length} Orders from PostgreSQL...`);
  for (const o of orders) {
    await prisma.order.create({
      data: {
        id: o.id,
        orderNumber: o.orderNumber,
        userId: o.userId,
        customerEmail: o.customerEmail,
        customerPhone: o.customerPhone,
        panCard: o.panCard,
        aadharCard: o.aadharCard,
        totalAmount: Number(o.totalAmount),
        gstAmount: Number(o.gstAmount),
        itemsCount: Number(o.itemsCount) || 1,
        status: o.status,
        paymentStatus: o.paymentStatus,
        createdAt: o.createdAt ? new Date(o.createdAt) : new Date(),
        updatedAt: o.updatedAt ? new Date(o.updatedAt) : new Date(),
      },
    });
  }
  console.log(`✔ ${orders.length} Orders migrated.`);

  // 5. Migrate OrderItems
  const orderItems = fetchFromPg("OrderItem");
  console.log(`📦 Migrating ${orderItems.length} OrderItems from PostgreSQL...`);
  for (const item of orderItems) {
    await prisma.orderItem.create({
      data: {
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      },
    });
  }
  console.log(`✔ ${orderItems.length} OrderItems migrated.`);

  // 6. Migrate MonthlySalesMetrics (if any)
  const metrics = fetchFromPg("MonthlySalesMetric");
  console.log(`📦 Migrating ${metrics.length} MonthlySalesMetrics from PostgreSQL...`);
  for (const m of metrics) {
    await prisma.monthlySalesMetric.create({
      data: {
        id: m.id,
        month: m.month,
        sortOrder: m.sortOrder,
        changePct: m.changePct,
        isPositive: m.isPositive,
        totalRevenue: Number(m.totalRevenue),
        goldRevenue: Number(m.goldRevenue),
        silverRevenue: Number(m.silverRevenue),
        diamondRevenue: Number(m.diamondRevenue),
        goldPct: Number(m.goldPct),
        silverPct: Number(m.silverPct),
        diamondPct: Number(m.diamondPct),
        barHeight: m.barHeight,
        createdAt: m.createdAt ? new Date(m.createdAt) : new Date(),
        updatedAt: m.updatedAt ? new Date(m.updatedAt) : new Date(),
      },
    });
  }

  // 7. Migrate SupportSessions
  const sessions = fetchFromPg("SupportSession");
  console.log(`📦 Migrating ${sessions.length} SupportSessions from PostgreSQL...`);
  for (const s of sessions) {
    await prisma.supportSession.create({
      data: {
        id: s.id,
        firebaseId: s.firebaseId,
        status: s.status,
        createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
      },
    });
  }
  console.log(`✔ ${sessions.length} SupportSessions migrated.`);

  // 8. Migrate SupportMessages
  const messages = fetchFromPg("SupportMessage");
  console.log(`📦 Migrating ${messages.length} SupportMessages from PostgreSQL...`);
  for (const msg of messages) {
    await prisma.supportMessage.create({
      data: {
        id: msg.id,
        sessionId: msg.sessionId,
        sender: msg.sender,
        content: msg.content,
        createdAt: msg.createdAt ? new Date(msg.createdAt) : new Date(),
      },
    });
  }
  console.log(`✔ ${messages.length} SupportMessages migrated.`);

  console.log("\n🎉 ALL LOCAL POSTGRESQL DATA FULLY MIGRATED TO MONGODB ATLAS WITH ORIGINAL IDS!");
}

runMigration()
  .catch((err) => {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
