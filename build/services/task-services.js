"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTask = exports.getAllTasks = void 0;
const tasks_json_1 = __importDefault(require("../data/tasks.json"));
const tasks = tasks_json_1.default;
const getAllTasks = () => tasks;
exports.getAllTasks = getAllTasks;
const getTask = (id) => tasks.find(task => task.id === id);
exports.getTask = getTask;
const addTask = (task) => {
    const newTask = Object.assign(Object.assign({}, task), { id: tasks.length + 1 });
    tasks.push(newTask);
};
exports.addTask = addTask;
const updateTask = (id, task) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        tasks[taskIndex] = Object.assign(Object.assign({}, tasks[taskIndex]), task);
    }
};
exports.updateTask = updateTask;
const deleteTask = (id) => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
};
exports.deleteTask = deleteTask;
