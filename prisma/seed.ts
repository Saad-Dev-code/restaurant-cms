import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: { passwordHash },
    create: {
      username: "admin",
      passwordHash,
    },
  });

  await prisma.restaurantSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      restaurantName: "The Bürg",
      address: "123 Burger Lane, Food City, FC 10001",
      phone: "+1 (555) 123-4567",
      whatsapp: "+15551234567",
      facebook: "https://facebook.com/theburg",
      instagram: "https://instagram.com/theburg",
      googleMaps: "https://maps.google.com/?q=The+Burg",
      openingHours: JSON.stringify([
        { day: "Monday", open: "09:00", close: "22:00", closed: false },
        { day: "Tuesday", open: "09:00", close: "22:00", closed: false },
        { day: "Wednesday", open: "09:00", close: "22:00", closed: false },
        { day: "Thursday", open: "09:00", close: "22:00", closed: false },
        { day: "Friday", open: "09:00", close: "23:00", closed: false },
        { day: "Saturday", open: "10:00", close: "23:00", closed: false },
        { day: "Sunday", open: "10:00", close: "21:00", closed: false },
      ]),
    },
  });

  console.log("Database seeded successfully");
  console.log(`Admin username: admin`);
  console.log(`Admin password: ${adminPassword}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
