"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", page_routes_1.default);
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}...`);
});
