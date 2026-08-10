const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "node_modules", ".prisma");
const target = path.join(__dirname, "..", "node_modules", "@prisma", "client", ".prisma");

if (fs.existsSync(source)) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
  fs.cpSync(source, target, { recursive: true });
  console.log("Fixed Prisma client path");
}
