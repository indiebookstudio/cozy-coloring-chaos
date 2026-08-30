# Cozy Coloring Chaos — TikTok Landing Page

Sito web statico, moderno, responsive e ultra-leggero per il brand **Cozy Coloring Chaos**, progettato per la bio di TikTok e pronto per essere pubblicato gratuitamente su **GitHub Pages**.

---

## Nuove Funzionalità Aggiunte

1. **Selettore Lingua Interfaccia (in alto a destra)**:
   - Rilevamento automatico della lingua del browser del visitatore (Italiano o Inglese).
   - Pulsanti switch `[ IT | EN ]` per cambiare lingua manualmente (con salvataggio preferenza in `localStorage`).
   - Traduzione istantanea di titoli, pulsanti, etichette dei negozi Amazon, autore e footer.

2. **Filtro Libri per Lingua (al centro in alto)**:
   - Visualizza **Tutti** (default), solo **Italiano** o solo **English** .
   - Contatore dinamico dei libri presenti in catalogo per ciascuna lingua.
   - Transizione fluida e reattiva con messaggi di stato.

3. **Link Diretto a TikTok (nel footer)**:
   - Pulsante social scuro in stile TikTok con logo, animazione hover e link diretto a **[@cozycoloringchaos](https://www.tiktok.com/@cozycoloringchaos)**.

4. **Richiesta Free Sample PDF via Email **:
   - Pulsante **"Free Sample"** su ogni scheda libro e all'interno del visualizzatore di anteprima.
   - Modale con modulo di richiesta: **Nome**, **Cognome**, **Paese** (con autoselezione e dropdown bandiere per tutti i paesi principali) ed **Email**.
   - Invio automatico di un'email HTML reattiva ed elegante con:
     - **File PDF allegato direttamente** alla mail (da `assets/.../Sample/`).
     - **Copertina del libro** in primo piano.
     - **Pulsante Amazon personalizzato** per il marketplace del paese del destinatario.
     - **Link cliccabile al sito vetrina** (`https://indiebookstudio.github.io/cozy-coloring-chaos/`).
     - **CC automatico a `cozycoloringchaos@gmail.com`** per la raccolta lead.
     - Oggetto: `[Titolo Libro] - Free Sample Download `.

---

## Libri Attualmente Configurati

1. **Impossible Worlds**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HFZZ2TMH`
   - **Store iniziale**: Amazon.com 2. **Italian Girls**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HGJBKMGZ`
   - **Store iniziale**: Amazon.com 3. **Innocent Paws**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HFGBJW8Y`
   - **Store iniziale**: Amazon.com 4. **Killer Paws**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HGGQ3GZ8`
   - **Store iniziale**: Amazon.com 5. **Non Rompetemi i Coglioni**
   - **Autore**: Lucas C. Morica
   - **Lingua**: Italiano (`langCode: "it"`)
   - **ASIN**: `B0HF7WZBYD`
   - **Store iniziale**: Amazon.it ---

## Come Aggiungere un Nuovo Libro

Apri [**`script.js`**](script.js) e aggiungi un nuovo elemento all'array `BOOKS`:

```javascript
{
  id: "mio-nuovo-libro",
  title: "Titolo del Libro",
  subtitle: "Sottotitolo del libro",
  author: "Nome Autore",
  language: "Italiano", // oppure "English"
  langCode: "it",       // "it" per Italiano, "en" per Inglese
  cover: "assets/NomeCartella/Front.Cover.png",
  defaultMarket: "it",  // "it", "com", "uk", "de", ecc.
  asin: "B0XXXXXXXX"
}
```

---

## Architettura & Invio Free Sample (Sicurezza & Brevo)

L'invio delle email avviene tramite un backend serverless sicuro che protegge la chiave API di Brevo:

```text
                    GITHUB PAGES
                 (Frontend statico)
                         │
                         │ HTTPS POST
                         ▼
               SERVERLESS BACKEND (api/send-free-sample.js)
                         │
                         │ BREVO_API_KEY (Environment Variable)
                         ▼
                      BREVO
                         │
                         ▼
               EMAIL + PDF ALLEGATO
```

### Sviluppo Locale

1. Copia `.env.example` in `.env`:
   ```bash
   cp .env.example .env
   ```
2. Inserisci la tua chiave API Brevo in `.env`:
   ```text
   BREVO_API_KEY=xkeysib-tua-chiave-qui
   ```
3. Avvia il server locale:
   ```bash
   npm start
   ```
4. Apri `http://localhost:3000` nel browser.

### Test Automatizzati

Esegui la suite di test per validare metodi HTTP, CORS, honeypot anti-spam, validazione email e assenza di secret nel frontend:

```bash
npm test
```

---

## Deploy del Backend Serverless (es. Vercel)

1. Importa questo repository su **[Vercel](https://vercel.com)**.
2. Nelle impostazioni del progetto su Vercel:
   - Vai in **Settings** > **Environment Variables**.
   - Aggiungi la variabile:
     - **Name**: `BREVO_API_KEY`
     - **Value**: `la_tua_nuova_chiave_brevo`
3. Al termine del deploy, copia l'URL generato da Vercel (es. `https://cozy-coloring-chaos.vercel.app`).
4. Su GitHub Pages, il sito utilizzerà automaticamente l'endpoint backend serverless!

---

## Pubblicazione su GitHub Pages

1. Carica i file nel tuo repository GitHub:
   ```bash
   git add .
   git commit -m "Configure secure Brevo serverless dispatch"
   git push origin main
   ```
2. Vai in **Settings** > **Pages** > Seleziona branch **`main`** / cartella **`root`** > **Save**.
3. Inserisci il link generato (`https://indiebookstudio.github.io/cozy-coloring-chaos/`) nella bio di TikTok!
