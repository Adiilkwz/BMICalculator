const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
    console.log(req.body);
    res.send("Data received!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});