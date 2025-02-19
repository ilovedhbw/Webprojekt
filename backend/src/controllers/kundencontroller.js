const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Webprogrammierung\\Web-Programmierung\\Database\\Webprogrammierung.db'); // Deine SQLite-Datenbank

// POST: Einen neuen Kunden hinzufügen
exports.addKunde = (req, res) => {
    const { name, adresse, email, telefon, firma } = req.body;

    // 1. Validierung: Prüfen, ob alle erforderlichen Felder vorhanden sind
    if (!name || !adresse || !email || !telefon || !firma) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
    }

    // 2. Validierung: Überprüfe, ob die E-Mail bereits existiert (Unique Constraint)
    const checkEmailSql = 'SELECT COUNT(*) AS count FROM Kundenstamm WHERE email = ?';
    db.get(checkEmailSql, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Fehler bei der E-Mail-Überprüfung', error: err.message });
        }

        // Wenn der Kunde mit der gleichen E-Mail bereits existiert
        if (row.count > 0) {
            return res.status(400).json({ message: 'Die E-Mail-Adresse ist bereits in Verwendung' });
        }

        // 3. Validierung: Überprüfe, ob die Telefonnummer ein gültiges Format hat (optional)
        const phoneRegex = /^[0-9]{10}$/; // Beispiel: Überprüfe, ob die Telefonnummer 10 Ziffern hat
        if (!telefon.match(phoneRegex)) {
            return res.status(400).json({ message: 'Telefonnummer ist ungültig' });
        }

        // 4. Wenn alles validiert ist, füge den neuen Kunden in die Datenbank ein
        const sql = 'INSERT INTO Kundenstamm (name, adresse, email, telefon, firma) VALUES (?, ?, ?, ?, ?)';
        db.run(sql, [name, adresse, email, telefon, firma], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Fehler beim Hinzufügen des Kunden', error: err.message });
            }
            res.status(201).json({ message: 'Kunde erfolgreich hinzugefügt', id: this.lastID });
        });
    });
};
