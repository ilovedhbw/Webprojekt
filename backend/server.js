const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Eingebaute Middleware zum Parsen von JSON-Daten

// SQLite-Datenbankverbindung
const dbPath = 'C:\\Webprogrammierung\\Web-Programmierung\\Database\\Webprogrammierung.db';
const db = new sqlite3.Database(dbPath, (err) => {
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
const kundenRoutes = require('./src/routes/kunden');
app.use('/api/kunden', kundenRoutes);

// Routen für Angebote (API)
const angeboteRoutes = require('./src/routes/angebote');
app.use('/api/angebote', angeboteRoutes);

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
