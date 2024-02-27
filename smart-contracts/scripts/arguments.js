const fs = require("fs");
const path = require("path");

const ROUTER_ADDRESS = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C"

// Initialize functions settings
const source = fs
.readFileSync(path.resolve(__dirname, "verifyStravaRun.js"))
.toString();

module.exports = [
    ROUTER_ADDRESS,
    source
];