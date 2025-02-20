
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kundenverwaltung</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #5e72e4, #825ee4);
      color: white;
    }
    header {
      padding: 40px;
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
      text-align: center;
    }
    header h1 {
      font-size: 36px;
      margin: 0;
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .intro {
      padding: 150px 20px 20px;
      max-width: 900px; /* Etwas breiter */
      margin: 0 auto;
      text-align: center;
    }
    .intro h2 {
      font-size: 40px;
      color: #fff;
      margin-bottom: 30px;
    }
    .intro p {
      font-size: 22px;
      color: #eee;
      margin-bottom: 40px;
    }
    .intro button {
      padding: 20px 50px;
      font-size: 24px;
      color: #fff;
      background-color: #6c63ff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 70%;
      margin-bottom: 15px;
    }
    .intro button:hover {
      background-color: #5a4eed;
    }
    .footer {
      padding: 20px;
      background-color: #222;
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
    }

    /* Breitere Container */
    .page-content {
      max-width: 1200px; /* Container noch breiter */
      margin: 100px auto;
      padding: 40px; /* Etwas mehr Padding */
      background-color: white;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      display: none;
    }
    .page-content h2 {
      font-size: 28px;
      color: #6c63ff;
      margin-bottom: 20px;
    }
    .page-content p {
      font-size: 20px;
      color: #555;
    }
    button {
      padding: 15px 30px;
      font-size: 18px;
      color: white;
      background-color: #6c63ff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      margin-top: 25px;
      transition: all 0.3s ease;
    }
    button:hover {
      background-color: #5a4eed;
    }
    input, textarea, select {
      padding: 15px;
      font-size: 18px;
      margin: 10px 0;
      width: 100%; /* Die Eingabefelder sind jetzt immer breiter */
      max-width: 100%; /* Maximale Breite auf 100% setzen */
      border-radius: 8px;
      border: 2px solid #ddd;
      background-color: #f9f9f9;
    }
    input:focus, textarea:focus, select:focus {
      border-color: #6c63ff;
    }
    label {
      font-size: 18px;
      color: #444;
    }
    /* Zellen und Buttons für das Formular */
    #angebotResponseMessage {
      font-size: 22px;
      color: #4CAF50;
      padding: 20px;
      border: 2px solid #4CAF50;
      margin-top: 20px;
      border-radius: 8px;
    }

    /* Fehler Style */
    .error-message {
      color: #ff4d4d;
      background-color: #f8d7da;
      border: 2px solid #f5c6cb;
      padding: 10px;
      border-radius: 8px;
      font-size: 18px;
    }

    /* Hilfs-Texte für mehr Klarheit */
    .help-text {
      font-size: 16px;
      color: #888;
      margin-top: 5px;
    }

  </style>
</head>
<body>

  <!-- Header -->
  <header>
    <h1>Kundenverwaltung</h1>
  </header>

  <!-- Startseite -->
  <div class="intro">
    <h2>Willkommen in der Kundenverwaltung</h2>
    <p>Nutzen Sie unser Tool, um Ihre Kunden und Angebote effizient zu verwalten.</p>
    <button onclick="showPage('kunden')">Kundenstamm anzeigen</button>
    <button onclick="showPage('angebote')">Angebote anzeigen</button>
  </div>

  <!-- Kundenverwaltung Page -->
  <div class="page-content" id="kunden">
    <h2>Kundenübersicht</h2>
    <p>Hier können Sie den Kundenstamm verwalten. Klicken Sie auf den Button, um alle Kunden anzuzeigen.</p>
    <button onclick="loadKunden()">Kunden anzeigen</button>
    <div id="kundenList"></div>
    <!-- Formular zum Hinzufügen eines neuen Kunden -->
    <form id="kundenForm">
      <h2>Neuen Kunden hinzufügen</h2>
      <input type="text" id="name" placeholder="Name" required />
      <input type="text" id="adresse" placeholder="Adresse" required />
      <input type="email" id="email" placeholder="E-Mail" required />
      <input type="text" id="telefon" placeholder="Telefonnummer" required />
      <input type="text" id="firma" placeholder="Firma" required />
      <button type="submit">Kunden hinzufügen</button>
      <div id="kundenError" class="error-message" style="display: none;"></div>
    </form>
  </div>

  <!-- Angebote Page -->
  <div class="page-content" id="angebote">
    <h2>Angebotsübersicht</h2>
    <p>Hier können Sie alle aktuellen Angebote einsehen. Klicken Sie auf den Button, um Angebote zu laden.</p>
    <button onclick="loadAngebote()">Angebote anzeigen</button>
    <div id="angeboteList"></div>
    <!-- Formular zum Hinzufügen eines neuen Angebots -->
    <form id="angebotForm">
      <h2>Neues Angebot erstellen</h2>
      <label for="angebot_kunde_id">Kunde auswählen:</label>
      <select id="angebot_kunde_id" name="angebot_kunde_id" required>
        <option value="">-- Kunde auswählen --</option>
      </select>

      <label for="angebot_name">Name:</label>
      <input type="text" id="angebot_name" name="angebot_name" required />

      <label for="angebot_beschreibung">Beschreibung:</label>
      <textarea id="angebot_beschreibung" name="angebot_beschreibung"></textarea>

      <label for="angebot_preis">Preis:</label>
      <input type="number" step="0.01" id="angebot_preis" name="angebot_preis" required />

      <label for="angebot_waehrung">Währung:</label>
      <input type="text" id="angebot_waehrung" name="angebot_waehrung" required />

      <label for="angebot_status">Status:</label>
      <input type="text" id="angebot_status" name="angebot_status" placeholder="z.B. offen" />

      <button type="submit">Angebot erstellen</button>
      <div id="angebotResponseMessage"></div>
      <div id="angebotError" class="error-message" style="display: none;"></div>
    </form>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>&copy; 2025 Kundenverwaltung</p>
  </div>

  <script>
    // Funktion, um zwischen den Seiten zu wechseln
    function showPage(pageId) {
      const pages = document.querySelectorAll('.page-content');
      pages.forEach(page => page.style.display = 'none');
      document.getElementById(pageId).style.display = 'block';
    }

    // Funktion, um Kunden anzuzeigen
    function loadKunden() {
      document.getElementById('kundenList').innerHTML = '<p>Lädt Kunden...</p>';
      const kunden = [
        { name: 'Max Mustermann', firma: 'Muster GmbH' },
        { name: 'Maria Musterfrau', firma: 'Muster AG' }
      ];
      let html = '<ul>';
      kunden.forEach(kunde => {
        html += `<li>${kunde.name} - ${kunde.firma}</li>`;
      });
      html += '</ul>';
      document.getElementById('kundenList').innerHTML = html;
    }

    // Funktion, um Angebote anzuzeigen
    function loadAngebote() {
      document.getElementById('angeboteList').innerHTML = '<p>Lädt Angebote...</p>';
      const angebote = [
        { name: 'Webseite erstellen', preis: '500', waehrung: '€' },
        { name: 'App entwickeln', preis: '1000', waehrung: '€' }
      ];
      let html = '<ul>';
      angebote.forEach(angebot => {
        html += `<li>${angebot.name} - ${angebot.preis} ${angebot.waehrung}</li>`;
      });
      html += '</ul>';
      document.getElementById('angeboteList').innerHTML = html;
    }
  </script>

</body>
</html>
