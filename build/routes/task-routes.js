"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const task_services_1 = require("../services/task-services");
router.get('/', (_req, res) => {
    res.send((0, task_services_1.getAllTasks)());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = (0, task_services_1.getTask)(Number(id));
    if (task) {
        res.send(task);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    const { title, description, priority, completed, createdAt } = req.body;
    const task = {
        title,
        description,
        priority,
        completed,
        createdAt
    };
    (0, task_services_1.addTask)(task);
    res.send({ message: 'Task added successfully' });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, priority, completed, createdAt } = req.body;
    const task = {
        title,
        description,
        priority,
        completed,
        createdAt
    };
    (0, task_services_1.updateTask)(Number(id), task);
    res.send({ message: 'Task updated' });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    (0, task_services_1.deleteTask)(Number(id));
    res.send({ message: 'Task deleted' });
});
module.exports = router;
