# 🎨 Cozy Coloring Chaos — TikTok Landing Page

Sito web statico, moderno, responsive e ultra-leggero per il brand **Cozy Coloring Chaos**, progettato specificamente per la bio di TikTok e pronto per essere pubblicato gratuitamente su **GitHub Pages**.

---

## 📚 Libri Attualmente Configurati

1. **Innocent Paws**
   - **Autore**: Isaac McClour
   - **Sottotitolo**: *A Cozy Murder Coloring Book | Darkly Humorous Murder Scenes in Cozy Everyday Settings for Adults and Teens*
   - **ASIN**: `B0HFGBJW8Y`
   - **Store iniziale**: Amazon.com 🇺🇸 (selezionabile qualsiasi altro store dal menu)

2. **Non Rompetemi i Coglioni**
   - **Autore**: Lucas C. Morica
   - **Sottotitolo**: *Il libro da colorare per sfogarsi senza finire nei guai | Libro antistress kawaii per adulti*
   - **ASIN**: `B0HF7WZBYD`
   - **Store iniziale**: Amazon.it 🇮🇹 (selezionabile qualsiasi altro store dal menu)

---

## ✨ Come Funziona il Selettore Amazon

Grazie al codice **ASIN**, il sito calcola in tempo reale il link corretto per qualsiasi negozio Amazon selezionato dal visitatore:
- 🇮🇹 Amazon.it (`https://www.amazon.it/dp/ASIN`)
- 🇺🇸 Amazon.com (`https://www.amazon.com/dp/ASIN`)
- 🇬🇧 Amazon.co.uk (`https://www.amazon.co.uk/dp/ASIN`)
- 🇩🇪 Amazon.de (`https://www.amazon.de/dp/ASIN`)
- 🇫🇷 Amazon.fr (`https://www.amazon.fr/dp/ASIN`)
- 🇪🇸 Amazon.es (`https://www.amazon.es/dp/ASIN`)
- 🇨🇦 Amazon.ca (`https://www.amazon.ca/dp/ASIN`)
- 🇦🇺 Amazon.com.au (`https://www.amazon.com.au/dp/ASIN`)

---

## ➕ Come Aggiungere un Nuovo Libro

Apri [**`script.js`**](script.js) e aggiungi un nuovo blocco all'array `BOOKS`:

```javascript
{
  id: "nuovo-libro",
  title: "Titolo del Libro",
  subtitle: "Sottotitolo dettagliato",
  author: "Nome Autore",
  language: "Italiano", // oppure "English", "Español", ecc.
  cover: "assets/CartellaLibro/Front.Cover.png",
  defaultMarket: "it", // "it" oppure "com", "uk", "de", ecc.
  asin: "B0XXXXXXXX"
}
```

---

## 🚀 Pubblicazione su GitHub Pages

1. Crea un repository su GitHub (es. `cozy-coloring-chaos`).
2. Carica i file (`index.html`, `style.css`, `script.js` e la cartella `assets/`).
3. Vai in **Settings** > **Pages** > Branch: **`main` / `root`** > **Save**.
4. Inserisci il link nella bio di TikTok!
