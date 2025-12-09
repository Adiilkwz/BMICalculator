const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serving static files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (!weight || weight <= 0 || !height || height <= 0) {
        return res.send(`
            <link rel="stylesheet" href="/style.css">
            <div class="result-box">
                <h2 style="color: red;">Error</h2>
                <p>Invalid input.</p>
                <a href="/">Go Back</a>
            </div>
        `);
    }

    const bmi = (weight / (height * height));
    const bmiRounded = bmi.toFixed(2);
    let category = '';
    let cssClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        cssClass = 'underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
        cssClass = 'normal';
    } else if (bmi < 29.9) {
        category = 'Overweight';
        cssClass = 'overweight';
    } else {
        category = 'Obese';
        cssClass = 'obese';
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>BMI Result</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="result-box">
                <h1>Your BMI Result</h1>
                <p>Weight: ${weight} kg | Height: ${height} m</p>
                <h2>Your BMI is: ${bmiRounded}</h2>
                <h3 class="${cssClass}">Category: ${category}</h3>
                <a href="/">Calculate Again</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});