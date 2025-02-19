const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Webprogrammierung\\Web-Programmierung\\Database\\Webprogrammierung.db'); // SQLite-Datenbankverbindung

// GET: Alle Kunden abrufen
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Kundenstamm';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Abrufen der Kunden', error: err.message });
        }
        res.json(rows); // Rückgabe der Kunden als JSON
    });
});

// POST: Einen neuen Kunden hinzufügen
router.post('/', (req, res) => {
    const { name, adresse, email, telefon, firma } = req.body;

    // Validierung der Eingabedaten
    if (!name || !adresse || !email || !telefon || !firma) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
    }

    // SQL-Abfrage zum Einfügen eines neuen Kunden
    const sql = 'INSERT INTO Kundenstamm (name, adresse, email, telefon, firma) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [name, adresse, email, telefon, firma], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Hinzufügen des Kunden', error: err.message });
        }
        res.status(201).json({ message: 'Kunde erfolgreich hinzugefügt', id: this.lastID });
    });
});
module.exports = router;
