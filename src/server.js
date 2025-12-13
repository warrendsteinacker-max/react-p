import express from 'express';
import D from './data.json';
import fs from 'fs';
const app = express();
const PORT = 3000;

app.use(express.json());


app.post('/api/data', (req, res) => {
    const newItem = req.body;
    fs.appendFileSync('./data.json', JSON.stringify(newItem, null, 2));
    res.status(201).json(newItem);
});

app.get('/api/data', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        };
});
app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const index = D.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        D.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
