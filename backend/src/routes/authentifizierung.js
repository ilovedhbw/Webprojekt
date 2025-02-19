const express = require('express');
const router = express.Router();
const authentifizierungController = require('../controllers/authentifizierungController');

// POST: Benutzer anmelden
router.post('/anmelden', authentifizierungController.login);

// POST: Benutzer registrieren
router.post('/registrieren', authentifizierungController.register);

module.exports = router;
