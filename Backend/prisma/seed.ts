import { PrismaClient, MetalType, OrderStatus, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Jewellery Garden PostgreSQL Database via Prisma...");

  // 2. Seed Admin User
  await prisma.user.upsert({
    where: { email: "admin@jewellerygardenpvtltd.com" },
    update: { role: "ADMIN", isVerified: true },
    create: {
      email: "admin@jewellerygardenpvtltd.com",
      phone: "+91 98000 11223",
      role: "ADMIN",
      isVerified: true,
    },
  });

  // 3. Seed Products
  const prodMap: Record<string, any> = {};

  const productsData = [
    {
      sku: "DN-D000123787",
      name: "Splendid Flower Diamond Nose Pin",
      category: "Gold Nosepin",
      metal: MetalType.Gold,
      purity: "18KT Gold Solitaire",
      grossWeight: "0.85g",
      netWeight: "0.80g",
      price: 12796,
      stock: 14,
      image: "/images/gifts/birthday.png",
      active: true,
    },
    {
      sku: "GR-G00098231",
      name: "Crescent Wave 22KT Gold Ring",
      category: "Gold Rings",
      metal: MetalType.Gold,
      purity: "22KT 916 BIS Hallmark",
      grossWeight: "3.40g",
      netWeight: "3.40g",
      price: 12521,
      stock: 22,
      image: "/images/gifts/engagement.png",
      active: true,
    },
    {
      sku: "ER-J00088192",
      name: "Royal Peacock 22KT Gold Jhumka",
      category: "Gold Earrings",
      metal: MetalType.Gold,
      purity: "22KT BIS Hallmarked",
      grossWeight: "8.65g",
      netWeight: "8.65g",
      price: 34800,
      stock: 8,
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      active: true,
    },
    {
      sku: "NC-S00077281",
      name: "Bengali Traditional Sitahar Gold Necklace",
      category: "Gold Necklaces",
      metal: MetalType.Gold,
      purity: "22KT Heavy Bridal Gold",
      grossWeight: "24.15g",
      netWeight: "24.15g",
      price: 89500,
      stock: 5,
      image: "/images/gifts/wedding.png",
      active: true,
    },
    {
      sku: "SB-B00066123",
      name: "Handcrafted 925 Sterling Silver Bangle",
      category: "Silver Bangles",
      metal: MetalType.Silver,
      purity: "925 Gossip Silver",
      grossWeight: "28.50g",
      netWeight: "28.50g",
      price: 4850,
      stock: 35,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      active: true,
    },
  ];

  for (const p of productsData) {
    const created = await prisma.product.upsert({
      where: { sku: p.sku },
      update: p,
      create: p,
    });
    prodMap[p.sku] = created;
  }

  console.log("✔ PostgreSQL database seeded successfully with linked products and monthly metrics!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
