const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let nextId = 10; 

let todos = [
  {
    id: 1,
    title: "TB Cloud Computing",
    description: "Tugas Besar Cloud Computing",
    completed: true,
    dueDate: "2025-06-25",
    createdAt: "2025-06-16T13:00:00Z"
  },
  {
    id: 2,
    title: "TB PWEB",
    description: "Tugas Besar Pemrograman Web",
    completed: true,
    dueDate: "2025-06-20",
    createdAt: "2025-06-15T09:30:00Z"
  },
  {
    id: 3,
    title: "TB Data Mining",
    description: "Tugas Besar Data Mining",
    completed: false,
    dueDate: "2025-06-22",
    createdAt: "2025-06-17T09:30:00Z"
  },
  {
    id: 4,
    title: "TB AVD",
    description: "Tugas Besar Analisis dan Visualisasi Data",
    completed: true,
    dueDate: "2025-07-01",
    createdAt: "2025-06-26T09:30:00Z"
  },
  {
    id: 5,
    title: "TB ERP",
    description: "Tugas Besar Enterprise Resource Planning",
    completed: false,
    dueDate: "2025-07-05",
    createdAt: "2025-06-27T10:00:00Z"
  },
  {
    id: 6,
    title: "TB KI",
    description: "Tugas Besar Kecerdasan Buatan",
    completed: false,
    dueDate: "2025-07-10",
    createdAt: "2025-06-28T11:00:00Z"
  },
  {
    id: 7,
    title: "TB PBD",
    description: "Tugas Besar Perancangan Basis Data",
    completed: true,
    dueDate: "2025-07-15",
    createdAt: "2025-06-29T12:00:00Z"
  },
  {
    id: 8,
    title: "TB SPK",
    description: "Tugas Besar Sistem Pendukung Keputusan",
    completed: false,
    dueDate: "2025-07-20",
    createdAt: "2025-06-30T13:00:00Z"
  },
  {
    id: 9,
    title: "Tugas RPL",
    description: "Tugas Rekayasa Perangkat Lunak",
    completed: false,
    dueDate: "2025-07-25",
    createdAt: "2025-07-01T14:00:00Z"
  }
];

function successResponse(message, data) {
  return {
    status: "success",
    message,
    data
  };
}

function errorResponse(message) {
  return {
    status: "error",
    message
  };
}

app.get('/api/todos', (req, res) => {
  res.json(successResponse('Data retrieved successfully', todos));
});

app.post('/api/todos', (req, res) => {
  const { title, description, completed, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json(errorResponse('Title, description, dan dueDate wajib diisi'));
  }

  const newTodo = {
    id: nextId++,
    title,
    description,
    completed: completed || false,
    dueDate,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  res.status(201).json(successResponse('To-do created successfully', newTodo));
});

app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json(errorResponse('To-do with the given ID not found'));
  }

  res.json(successResponse('Data retrieved successfully', todo));
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json(errorResponse('To-do with the given ID not found'));
  }

  const { title, description, completed, dueDate } = req.body;
  const updatedTodo = { ...todos[todoIndex] };

  if (title !== undefined) updatedTodo.title = title;
  if (description !== undefined) updatedTodo.description = description;
  if (completed !== undefined) updatedTodo.completed = completed;
  if (dueDate !== undefined) updatedTodo.dueDate = dueDate;

  todos[todoIndex] = updatedTodo;
  res.json(successResponse('To-do updated successfully', updatedTodo));
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json(errorResponse('To-do with the given ID not found'));
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(successResponse('To-do deleted successfully', deletedTodo));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});