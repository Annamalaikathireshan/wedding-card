# Annamalai & Sarmila — Chettinad Heritage Wedding Celebration 🪔🏛️

An interactive, responsive Chettinad Heritage wedding invitation simulating a majestic walkthrough into an ancestral Chettinad heritage mansion in Tamil Nadu. Built with HTML5, CSS3 3D transforms, Web Audio API, and vanilla JavaScript for **Annamalai & Sarmila's wedding** on **22 November 2026** at the historic **Thiruparankundram Sri Murugan Temple, Madurai**.

Optimized for **GitHub Pages** deployment with zero build tools or server dependencies.

---

## ✨ Walkthrough Experience & Highlights

1. **🏛️ Landing Screen (The Auspicious Start)**:
   - A Chettinad brass-accented invitation card enclosed in a vintage vermillion letter envelope, sealed with an embossed royal wax stamp (`A & S 2026`).
   - Gentle Carnatic Veena & Nadaswaram ambient background track playing softly with an animated equalizer and toggleable Mute/Unmute button (synthesized with Web Audio API).
   - Clicking the wax seal bursts golden sparkles & Akshata, unfolds the envelope flaps, and glides the camera forward.

2. **🚪 The Grand Entrance (Mukappu Vaasal & Thinnai)**:
   - 3D camera zoom transition stops right in front of carved Burma teakwood double doors with brass lion-head knockers, studs, and a fresh mango leaf and marigold toran.
   - Clicking the door ("திறக்க சொடுக்கவும் • Click to Open") swings both doors open in 3D perspective (`rotateY(-108deg)` and `108deg`).
   - Glides past the raised veranda (*thinnai*) and polished stone pillars, unveiling an embedded cinematic couple-reveal motion portrait greeting from Annamalai & Sarmila.

3. **🪷 The Central Courtyard / Mutram (The Main Hub)**:
   - The camera settles into the sunlit central open courtyard (*mutram*) paved with geometric Athangudi tiles, glowing brass lamps (*kuthuvilakku*), and a central bronze Urli with floating water, blooming lotuses, and marigolds.
   - **4 Interactive Architectural Navigation Pillars**:
     1. 🛕 **Manavarai (மணவறை)**: Direct glide to the sacred stage, displaying the Subha Muhurtham & Reception timelines, countdown, and Add to Calendar (.ics).
     2. 🍃 **Virundhu Koodam (விருந்து கூடம்)**: Unfolds an authentic banana-leaf feast menu animation with course tabs and signature Chettinad dishes (Vellai Paniyaram, Ponni Rice & Ghee, Kalyana Sambar, Ennai Kathirikai Gothsu, Potato Roast, Pineapple Rasam, Paal Payasam, Thamboolam).
     3. 🖼️ **Ninaivu Arangam (நினைவு அரங்கம்)**: Corridor of framed moments in carved teakwood borders that enlarge on click into a touch-enabled lightbox gallery.
     4. 📜 **Vazhikaatti (வழிகாட்டி)**: Rolls out like an antique parchment map, embedding live Google Maps directions to the temple and reception mandapam.

4. **🎨 Chettinad Heritage Grandeur Design System (`design.md`)**:
   - Palette: Deep Terracotta Vermillion (`#9B2226`), Temple Gold (`#D4AF37`), Athangudi Indigo (`#1D3557`), Teakwood Charcoal (`#2B1E16`), Sandalwood Ivory Canvas (`#FFF9ED`).
   - Typography: Playfair Display (Royal Headers), EB Garamond (Narrative Body), Plus Jakarta Sans (Labels, Form Inputs, Timestamps).
   - Hot-stamped gold foil insets, warm brass ambient shadows, and Dravidian temple arch frames.

5. **📝 Sacred RSVP with WhatsApp Sync & CSV Export**:
   - Live guest attendance, headcount, banana leaf dietary preferences, and blessings.
   - Direct formatted confirmation via WhatsApp (`+91 98765 43210`).
   - Couple Admin modal with live headcount roster and one-click "Export CSV File".

---

## 🚀 Instant Deployment to GitHub Pages

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: Chettinad heritage wedding invitation revamp"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In GitHub repository **Settings** &rarr; **Pages**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` &bull; `/ (root)`
   - Click **Save**.
3. Your website will be live in minutes at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 💻 Local Testing & Preview

Run locally using Python:
```bash
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📄 License
Crafted with love for Annamalai & Sarmila's Chettinad Heritage wedding celebration.
