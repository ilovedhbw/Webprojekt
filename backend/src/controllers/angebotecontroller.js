// src/controllers/angeboteController.js

const sqlite3 = require('sqlite3').verbose();

// Pfad zu deiner SQLite-Datenbank anpassen:
const dbPath = 'C:\\Webprogrammierung\\Web-Programmierung\\Database\\Webprogrammierung.db';
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Datenbankfehler:', err.message);
    } else {
        console.log('Mit der SQLite-Datenbank verbunden.');
    }
});

// GET: Alle Angebote abrufen
exports.getAlleAngebote = (req, res) => {
    const sql = 'SELECT * FROM Angebot';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: 'Fehler beim Abrufen der Angebote',
                error: err.message
            });
        }
        return res.json(rows);
    });
};

// GET: Ein Angebot anhand seiner ID abrufen
exports.getAngebotNachId = (req, res) => {
    const angebotId = req.params.id;
    const sql = 'SELECT * FROM Angebot WHERE angebot_id = ?';
    db.get(sql, [angebotId], (err, row) => {
        if (err) {
            return res.status(500).json({
                message: 'Fehler beim Abrufen des Angebots',
                error: err.message
            });
        }
        if (!row) {
            return res.status(404).json({
                message: `Kein Angebot mit ID ${angebotId} gefunden`
            });
        }
        return res.json(row);
    });
};

// POST: Ein neues Angebot hinzufügen
exports.addAngebot = (req, res) => {
    // Beachte: Hier wird jetzt "preis" (klein) verwendet
    const { kunde_id, name, beschreibung, preis, waehrung, status } = req.body;

    // Minimal-Validierung
    if (!kunde_id || !name || !preis || !waehrung) {
        return res.status(400).json({
            message: 'Bitte fülle mindestens kunde_id, name, preis und waehrung aus'
        });
    }

    const statusValue = status || 'neu';
    const sql = `
        INSERT INTO Angebot
        (kunde_id, name, beschreibung, preis, waehrung, status, erstellt_am, aktualisiert_am)
        VALUES
            (?, ?, ?, ?, ?, ?, datetime('now', 'localtime'), datetime('now','localtime'))
    `;

    db.run(sql, [kunde_id, name, beschreibung, preis, waehrung, statusValue], function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Fehler beim Hinzufügen des Angebots',
                error: err.message
            });
        }
        return res.status(201).json({
            message: 'Angebot erfolgreich hinzugefügt',
            angebot_id: this.lastID
        });
    });
};

// PUT: Ein bestehendes Angebot aktualisieren
exports.updateAngebot = (req, res) => {
    const angebotId = req.params.id;
    const { kunde_id, name, beschreibung, preis, waehrung, status } = req.body;

    if (!kunde_id || !name || !preis || !waehrung) {
        return res.status(400).json({
            message: 'Bitte fülle mindestens kunde_id, name, preis und waehrung aus'
        });
    }

    const statusValue = status || 'neu';
    const sql = `
        UPDATE Angebot
        SET
            kunde_id = ?,
            name = ?,
            beschreibung = ?,
            preis = ?,
            waehrung = ?,
            status = ?,
            aktualisiert_am = datetime('now', 'localtime')
        WHERE angebot_id = ?
    `;

    db.run(sql, [kunde_id, name, beschreibung, preis, waehrung, statusValue, angebotId], function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Fehler beim Aktualisieren des Angebots',
                error: err.message
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                message: `Kein Angebot mit ID ${angebotId} gefunden`
            });
        }
        return res.json({
            message: 'Angebot erfolgreich aktualisiert'
        });
    });
};

// DELETE: Ein Angebot löschen
exports.deleteAngebot = (req, res) => {
    const angebotId = req.params.id;
    const sql = 'DELETE FROM Angebot WHERE angebot_id = ?';

    db.run(sql, [angebotId], function (err) {
        if (err) {
            return res.status(500).json({
                message: 'Fehler beim Löschen des Angebots',
                error: err.message
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({
                message: `Kein Angebot mit ID ${angebotId} gefunden`
            });
        }
        return res.json({
            message: 'Angebot erfolgreich gelöscht'
        });
    });
};
