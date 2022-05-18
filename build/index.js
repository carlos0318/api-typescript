"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.use("/api/tasks", require("./routes/task-routes"));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
