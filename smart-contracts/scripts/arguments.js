const fs = require("fs");
const path = require("path");

const ROUTER_ADDRESS = "0xC22a79eBA640940ABB6dF0f7982cc119578E11De"

// Initialize functions settings
const source = fs
.readFileSync(path.resolve(__dirname, "verifyStravaRun.js"))
.toString();

module.exports = [
    ROUTER_ADDRESS,
    source
];