const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.static('public'));//静的ファイルを提供

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/epic/:earthDate', async (req, res) => {
    try {
        const epicResponse = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${req.params.earthDate}?api_key=${process.env.NASA_API_KEY}`);
        const data = await epicResponse.json();
        res.json(data);
    } catch (error) {
        console.error('エラー',error);
        res.status(500).send('サーバーエラー');
    }
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動してます。`)
});