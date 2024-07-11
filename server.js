const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/:date?', (req, res) => {
    let date;
    if (!req.params.date) {
        date = new Date();
    } else {
        const timestamp = parseInt(req.params.date);
        if (!isNaN(timestamp)) {
            date = new Date(timestamp);
        } else {
            date = new Date(req.params.date);
        }
    }

    if (date.toString() === 'Invalid Date') {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
