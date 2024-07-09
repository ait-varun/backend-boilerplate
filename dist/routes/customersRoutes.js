"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customersController_1 = __importDefault(require("../controllers/customersController"));
const router = express_1.default.Router();
// @route GET && POST - /posts/
router.route("/").get(customersController_1.default.getAllCustomers);
exports.default = router;
