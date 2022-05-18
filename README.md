# Build a Node.js and Express.js API with Typescript.

## Structure of files

```bash
├── build
├── node_modules
├── src
│   ├── data
│   │   └── tasks.json
│   ├── routes
│   │   └── task-routes.ts
│   ├── services
│   │   └── task-service.ts
│   ├── index.ts
|   └── types.d.ts
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json
```
## Initialize the project

First, we need to initialize the project.
```bash
npm init -y
```

## Install packages
Install dependencies of the project.
```bash
npm install --save express
```

And install dev dependencies of the project.
```bash
npm install --save-dev @types/express typescript ts-node-dev
```

- express: is a Node.js web application framework.
- @types/express: is a TypeScript definition file for the express module.
- typescript: is a TypeScript compiler.
- ts-node-dev: is a TypeScript compiler that runs the server with TypeScript.

## Add scripts to package.json
Add scripts to package.json.
```bash
"scripts": {
    "dev": "ts-node-dev src/index.ts",
    "start": "node build/index.js",
    "tsc": "tsc"
}
```
- dev: is a command to run the server with TypeScript.
- start: is a command to run the server.
- tsc: is a command to compile the TypeScript code.

## Initialize TypeScript
Now initialize TypeScipt:

```bash
$ npm run tsc -- --init
```
This will create a `tsconfig.json` file, which is a TypeScript configuration file.

### Configure TypeScript
For this project, we use the following configuration:

```json
{
    "compilerOptions": {
        "target": "es2016",
        "module": "commonjs",
        "resolveJsonModule": true,
        "outDir": "./build",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "skipLibCheck": true
    }
}
```
For to know more about the configuration, please visit [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## Create a server
In this project, we will create a server with Express.js.
```typescript 
// src/index.ts
import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

And compile the server:
```bash
$ npm run dev
```

## Add data to the server
For this project we use the following data:
```json
// src/data/tasks.json
[
    {
        "id": 1,
        "title": "Task 1",
        "description": "Description 1",
        "priority": "High",
        "completed": false,
        "createdAt": "2020-01-01"
    },
    {
        "id": 2,
        "title": "Task 2",
        "description": "Description 2",
        "priority": "Low",
        "completed": false,
        "createdAt": "2020-01-02"
    },
    {
        "id": 3,
        "title": "Task 3",
        "description": "Description 3",
        "priority": "Medium",
        "completed": false,
        "createdAt": "2020-01-03"
    },
    {
        "id": 4,
        "title": "Task 4",
        "description": "Description 4",
        "priority": "High",
        "completed": false,
        "createdAt": "2020-01-04"
    },
    {
        "id": 5,
        "title": "Task 5",
        "description": "Description 5",
        "priority": "Low",
        "completed": false,
        "createdAt": "2020-01-05"
    },
    {
        "id": 6,
        "title": "Task 6",
        "description": "Description 6",
        "priority": "Medium",
        "completed": false,
        "createdAt": "2020-01-06"
    },
    {
        "id": 7,
        "title": "Task 7",
        "description": "Description 7",
        "priority": "High",
        "completed": false,
        "createdAt": "2020-01-07"
    },
    {
        "id": 8,
        "title": "Task 8",
        "description": "Description 8",
        "priority": "Low",
        "completed": false,
        "createdAt": "2020-01-08"
    },
    {
        "id": 9,
        "title": "Task 9",
        "description": "Description 9",
        "priority": "Medium",
        "completed": false,
        "createdAt": "2020-01-09"
    }
]
```
We need to add types to the tasks.json file.
```typescript
// src/types.d.ts
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
```

## Create the services.
And now we need some services to handle the requests.
```typescript
// src/services/task-services.ts
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
```

## Add a routes to the server
We will add a route to the server. 
```typescript
// src/routes/task-routes.ts
import express from "express";
const router = express.Router();
import {getAllTasks, getTask, addTask, updateTask, deleteTask} from "../services/task-services";
import {BaseTask} from "../types";

router.get('/', (_req, res) => {
    res.send(getAllTasks());
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const task = getTask(Number(id));
    if (task) {
        res.send(task);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    const {title, description, priority, completed, createdAt} = req.body;
    const task: BaseTask = {
        title,
        description,
        priority,
        completed,
        createdAt
    };
    addTask(task);
    res.send({message: 'Task added successfully'});
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, description, priority, completed, createdAt} = req.body;
    const task: BaseTask = {
        title,
        description,
        priority,
        completed,
        createdAt
    };
    updateTask(Number(id), task);
    res.send({message: 'Task updated'});
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    deleteTask(Number(id));
    res.send({message: 'Task deleted'});
});

module.exports = router;

```

And now we need to add the routes to the server.
```typescript
// src/index.ts
app.use("/api/tasks", require("./routes/task-routes"));
```

We have now created a server api that can be used to get tasks, get task, add, update and delete.