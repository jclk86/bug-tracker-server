"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.default.get("/", (req, res) => {
    res.send("Hello World");
});
const PORT = process.env.PORT || 8000;
app_1.default.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map