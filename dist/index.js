"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Load environment variables from a file
process.loadEnvFile();
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // parse json bodies in the request object
// Use the middleware logger
// app.use(require('./middleware/logger'));
// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", router_1.default);
// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.message);
    res.status(500).json({
        message: "Something went rely wrong",
    });
});
// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
