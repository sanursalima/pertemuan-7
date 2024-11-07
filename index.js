const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'Belajar PPKN', completed: true },
  { id: 2, task: 'UTS BAHASA ARAB', completed: false }
];

app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
  
    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ada' });
    }
  
    res.json(todo);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Update ToDo
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo tidak ada' });
  }

  if (task) todo.task = task;
  if (typeof completed === 'boolean') todo.completed = completed;

  res.json({ message: 'Todo Terbaru', todo });
});

// Hapus ToDo
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Todo tidak ada' });
  }

  todos.splice(index, 1);

  res.json({ message: 'Todo Terhapus' });
});

// Jalanin servernya
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

app.get('/todos', (req, res) => {
    res.json(todos);
  });
