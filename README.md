# 🎨 Cozy Coloring Chaos — TikTok Landing Page

Sito web statico, moderno, responsive e ultra-leggero per il brand **Cozy Coloring Chaos**, progettato per la bio di TikTok e pronto per essere pubblicato gratuitamente su **GitHub Pages**.

---

## 🌟 Nuove Funzionalità Aggiunte

1. **Selettore Lingua Interfaccia (in alto a destra)**:
   - Rilevamento automatico della lingua del browser del visitatore (Italiano o Inglese).
   - Pulsanti switch `[ 🇮🇹 IT | 🇬🇧 EN ]` per cambiare lingua manualmente (con salvataggio preferenza in `localStorage`).
   - Traduzione istantanea di titoli, pulsanti, etichette dei negozi Amazon, autore e footer.

2. **Filtro Libri per Lingua (al centro in alto)**:
   - Visualizza **Tutti** (default), solo **Italiano** 🇮🇹 o solo **English** 🇬🇧.
   - Contatore dinamico dei libri presenti in catalogo per ciascuna lingua.
   - Transizione fluida e reattiva con messaggi di stato.

3. **Link Diretto a TikTok (nel footer)**:
   - Pulsante social scuro in stile TikTok con logo, animazione hover e link diretto a **[@cozycoloringchaos](https://www.tiktok.com/@cozycoloringchaos)**.

---

## 📚 Libri Attualmente Configurati

1. **Impossible Worlds**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HFZZ2TMH`
   - **Store iniziale**: Amazon.com 🇺🇸

2. **Italian Girls**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HGJBKMGZ`
   - **Store iniziale**: Amazon.com 🇺🇸

3. **Innocent Paws**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HFGBJW8Y`
   - **Store iniziale**: Amazon.com 🇺🇸

4. **Killer Paws**
   - **Autore**: Isaac McClour
   - **Lingua**: English (`langCode: "en"`)
   - **ASIN**: `B0HGGQ3GZ8`
   - **Store iniziale**: Amazon.com 🇺🇸

5. **Non Rompetemi i Coglioni**
   - **Autore**: Lucas C. Morica
   - **Lingua**: Italiano (`langCode: "it"`)
   - **ASIN**: `B0HF7WZBYD`
   - **Store iniziale**: Amazon.it 🇮🇹

---

## ✨ Come Aggiungere un Nuovo Libro

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

## 🚀 Pubblicazione su GitHub Pages

1. Carica i file (`index.html`, `style.css`, `script.js` e la cartella `assets/`) nel tuo repository GitHub.
2. Vai in **Settings** > **Pages** > Seleziona branch **`main`** / cartella **`root`** > **Save**.
3. Inserisci il link generato nella bio di TikTok!

...
