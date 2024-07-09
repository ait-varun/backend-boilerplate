"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customersRoutes_1 = __importDefault(require("./customersRoutes"));
const router = (0, express_1.Router)();
// Root route
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.use("/customers", customersRoutes_1.default);
exports.default = router;
