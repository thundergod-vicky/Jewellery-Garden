"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const email = "bsouvik986@gmail.com";
    const firebaseId = "jg-uid-bsouvik986";
    const username = "Souvik Basu";
    const customer = await prisma.customer.upsert({
        where: { email },
        update: {
            username,
            phone: "+91 98765 43210",
            superPearls: 500,
        },
        create: {
            firebaseId,
            email,
            username,
            phone: "+91 98765 43210",
            superPearls: 500,
            addresses: [
                JSON.stringify({
                    country: "India",
                    fullName: "Souvik Basu",
                    mobile: "9876543210",
                    pincode: "713216",
                    flat: "Flat 4B, Emerald Heights",
                    area: "City Centre",
                    landmark: "Near Junction Mall",
                    city: "Durgapur",
                    state: "West Bengal",
                    isDefault: true,
                    addressType: "House",
                    saturdays: "Yes",
                    sundays: "Yes",
                    openDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    deliveryInstructions: "Please call before delivery.",
                }),
            ],
        },
    });
    console.log("✔ Customer Account Created/Updated in Database:");
    console.log(customer);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-user.js.map