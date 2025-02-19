const express = require('express');
const router = express.Router();
const kundenRouten = require('./kunden');
const angeboteRouten = require('./angebote');
const authentifizierungRouten = require('./authentifizierung');

// Hier definierst du die verschiedenen Routen
router.use('/kunden', kundenRouten);
router.use('/angebote', angeboteRouten);
router.use('/auth', authentifizierungRouten);

module.exports = router;
