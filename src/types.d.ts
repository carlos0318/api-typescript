export type Priority = 'Low' | 'Medium' | 'High';

export interface BaseTask {
    title: string;
    description: string;
    priority: Priority;
    completed: boolean;
    createdAt: string;
}

export interface Task extends BaseTask {
    id: number;
}