const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// SQLite-Datenbankverbindung
const db = new sqlite3.Database('C:\\Webprogrammierung\\Web-Programmierung\\Database\\Webprogrammierung.db');

// GET: Alle Kunden abrufen
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Kundenstamm';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Abrufen der Kunden', error: err.message });
        }
        res.json(rows);
    });
});

// GET: Einen einzelnen Kunden abrufen
router.get('/:id', (req, res) => {
    const kundeId = req.params.id;
    const sql = 'SELECT * FROM Kundenstamm WHERE kunde_id = ?';

    db.get(sql, [kundeId], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Abrufen des Kunden', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: `Kein Kunde mit ID ${kundeId} gefunden` });
        }
        res.json(row);
    });
});

// POST: Einen neuen Kunden hinzufügen
router.post('/', (req, res) => {
    const { name, adresse, email, telefon, firma } = req.body;

    if (!name || !adresse || !email || !telefon || !firma) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
    }

    const sql = 'INSERT INTO Kundenstamm (name, adresse, email, telefon, firma) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [name, adresse, email, telefon, firma], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Hinzufügen des Kunden', error: err.message });
        }
        res.status(201).json({ message: 'Kunde erfolgreich hinzugefügt', id: this.lastID });
    });
});

// PUT: Einen bestehenden Kunden aktualisieren
router.put('/:id', (req, res) => {
    const kundeId = req.params.id;
    const { name, adresse, email, telefon, firma } = req.body;

    if (!name || !adresse || !email || !telefon || !firma) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
    }

    const sql = `
        UPDATE Kundenstamm
        SET name = ?, adresse = ?, email = ?, telefon = ?, firma = ?
        WHERE kunde_id = ?
    `;

    db.run(sql, [name, adresse, email, telefon, firma, kundeId], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Aktualisieren des Kunden', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: `Kein Kunde mit ID ${kundeId} gefunden` });
        }
        res.json({ message: 'Kunde erfolgreich aktualisiert' });
    });
});

// DELETE: Einen Kunden löschen
router.delete('/:id', (req, res) => {
    const kundeId = req.params.id;
    const sql = 'DELETE FROM Kundenstamm WHERE kunde_id = ?';

    db.run(sql, [kundeId], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Fehler beim Löschen des Kunden', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: `Kein Kunde mit ID ${kundeId} gefunden` });
        }
        res.json({ message: 'Kunde erfolgreich gelöscht' });
    });
});

module.exports = router;
