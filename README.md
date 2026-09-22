# Annamalai & Sarmila — South Indian Wedding Celebration 🪔🌸

A responsive, high-aesthetic South Indian digital wedding invitation website built with HTML5, CSS3, and modern JavaScript. Inspired by traditional temple grandeur and atelier digital craftsmanship like **The Digital Yes** (`@thedigitalyes`).

Designed for **Annamalai & Sarmila's wedding** in **Madurai, Tamil Nadu** on **22 November 2026** at the historic **Thiruparankundram Sri Murugan Temple**.

Optimized for **GitHub Pages** deployment with zero build tools or server dependencies.

---

## ✨ Features & Highlights

- ✉️ **Royal South Indian Wedding Envelope (Lagna Patrika)**: A royal crimson silk textured envelope with gold borders, sealed with an embossed royal gold stamp with monogram `A & S 2026`. Clicking or tapping breaks the seal, showers golden sparkles, and smoothly slides the card into view.
- 🪔 **Authentic South Indian Aesthetic**:
  - Auspicious colors: *Kumkum Crimson, Temple Gold, Turmeric Yellow, Peacock Green, and Raw Silk Ivory*.
  - Fine-art traditional South Indian couple portrait, temple gopuram, sacred Thali (Mangalsutra), and Akshata rice shower photography.
  - Tamil invocations (`|| ஓம் முருகா ||`, `|| சுபமுகூர்த்தம் ||`).
- ⏳ **Live Countdown to Subha Muhurtham**: Real-time counter ticking down to **22 November 2026 at 06:00 AM IST** (Brahma Muhurtham).
- 📅 **Save to Calendar**: One-click `.ics` iCalendar download with wedding venue details for Apple Calendar, Google Calendar, and Outlook.
- 🛕 **Order of Auspicious Events**:
  - *Nov 21 &bull; 18:30 IST* &mdash; Mappillai Azhaippu, Nichayathartham & Sangeeth Evening
  - *Nov 22 &bull; 05:30 IST* &mdash; Mangala Isai & Nadaswaram Ragas
  - *Nov 22 &bull; 06:00 &ndash; 07:30 IST* &mdash; Subha Muhurtham & Sacred Thali Kettu
  - *Nov 22 &bull; 08:00 IST* &mdash; Traditional South Indian Kalyana Virundhu (Banana Leaf Feast)
  - *Nov 22 &bull; 18:30 IST* &mdash; Grand Wedding Reception & Musical Evening
- 📍 **Venues & Direct Google Maps**:
  - Direct integration with Google Maps: [Thiruparankundram Murugan Temple, Madurai](https://maps.app.goo.gl/XvsBgxvmvMFd9t9U6)
  - Apple Maps & "Copy Address" buttons with animated toast alerts.
- 👗 **Traditional Attire & Palette Guide**: Guidance on Kanchipuram Silk Sarees (Pattu Pudavai), temple jewelry, and traditional Silk Veshti & Angavastram.
- 🖼️ **Touch-Enabled Photo Lightbox**: Zoomable gallery with keyboard and touch swipe navigation.
- 📝 **Live RSVP with WhatsApp Sync & CSV Export**:
  - Confirms attendance for Muhurtham and the traditional Kalyana Virundhu feast.
  - Celebratory confetti & yellow Akshata shower on submission.
  - Sends instant formatted confirmation via WhatsApp.
  - Built-in **Couple Admin Roster** with live confirmed headcount and a one-click **"Export CSV File"** button.
- 🤫 **Silent & Music-Free**: No background music, respecting the user's preference.
- 📱 **Mobile & Desktop Responsive**: Seamlessly adapts from 375px mobile viewports to 4K displays.

---

## 🚀 Instant Deployment to GitHub Pages

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: Annamalai & Sarmila South Indian wedding invitation"
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

## 🛠️ Personalization

- **WhatsApp Phone Number**: In `js/rsvp.js`, update `COUPLE_PHONE_NUMBER` with your WhatsApp number (e.g. `919876543210`).
- **Target Date**: In `js/countdown.js`, the date is configured for `2026-11-22T06:00:00+05:30`.
- **Venue Link**: In `index.html`, the venue points to `https://maps.app.goo.gl/XvsBgxvmvMFd9t9U6`.

---

## 📄 License
Crafted with love for Annamalai & Sarmila's auspicious wedding celebration.
