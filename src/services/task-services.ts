import tasksData from '../data/tasks.json';
import { Task, BaseTask } from '../types';

const tasks: Task[] = tasksData as Task[];

export const getAllTasks = ():Task[] => tasks;

export const getTask = (id: number):Task | undefined => tasks.find(task => task.id === id);

export const addTask = (task: BaseTask):void => {
    const newTask = { ...task, id: tasks.length + 1 };
    tasks.push(newTask);
};

export const updateTask = (id: number, task: BaseTask):void => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...task };
    }
};

export const deleteTask = (id: number):void => {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
};