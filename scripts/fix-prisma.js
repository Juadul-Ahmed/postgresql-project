const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "node_modules", ".prisma");
const target = path.join(__dirname, "..", "node_modules", "@prisma", "client", ".prisma");

if (fs.existsSync(source) && !fs.existsSync(target)) {
  fs.cpSync(source, target, { recursive: true });
  console.log("Fixed Prisma client path");
}
