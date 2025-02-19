const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Zum Verarbeiten von JSON-Daten

const db = new sqlite3.Database('C:\\Webprogrammierung\\Web-Programmierung\\Database\\Webprogrammierung.db', (err) => {
    if (err) {
        console.error('Datenbankfehler:', err.message);
    } else {
        console.log('Mit der SQLite-Datenbank verbunden.');
    }
});

// Beispielroute: Test, ob der Server funktioniert
app.get('/', (req, res) => {
    res.send('Backend läuft auf http://localhost:3000');
});

// Routen für Kunden (API)
const kundenRoutes = require('./src/routes/kunden'); // Ohne zusätzliche Anführungszeichen
app.use('/api/kunden', kundenRoutes);

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
