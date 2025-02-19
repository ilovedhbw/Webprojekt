const express = require('express');
const router = express.Router();
const angeboteController = require('../controllers/angeboteController');

// GET: Alle Angebote abrufen
router.get('/', angeboteController.getAlleAngebote);

// GET: Ein Angebot anhand seiner ID abrufen
router.get('/:id', angeboteController.getAngebotNachId);

// POST: Ein neues Angebot hinzufügen
router.post('/', angeboteController.addAngebot);

// PUT: Ein bestehendes Angebot aktualisieren
router.put('/:id', angeboteController.updateAngebot);

// DELETE: Ein Angebot löschen
router.delete('/:id', angeboteController.deleteAngebot);

module.exports = router;
