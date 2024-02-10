const fs = require("fs");
const path = require("path");

const source = fs
.readFileSync(path.resolve(__dirname, "verifyStravaRun.js"))
.toString();

console.log(source);