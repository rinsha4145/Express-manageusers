const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// User list (in-memory array)
let users = [];
let nextId = 1; // Counter for user IDs

// POST /users (Create a new user)
app.post('/users', (req, res) => {
    const { name, email, username } = req.body;
    const newUser = {
        id: nextId++,
        name,
        email,
        username
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET /users (Get all users)
app.get('/users', (req, res) => {
    res.json(users);
});

// GET /users/:id (Get a specific user by ID)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// PUT /users/:id (Update a specific user by ID)
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, username } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;

    res.json(user);
});

// DELETE /users/:id (Delete a specific user by ID)
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send(); // No content
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
