/**
 * Wedding Countdown Timer & Calendar ICS Generator
 * Wedding of Annamalai & Sarmila - 22 Nov 2026, Madurai
 */

document.addEventListener('DOMContentLoaded', () => {
  // Auspicious Subha Muhurtham: 22 November 2026 at 06:00 AM IST
  const weddingDate = new Date('2026-11-22T06:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      const heading = document.querySelector('.countdown-heading');
      if (heading) heading.textContent = 'The Auspicious Muhurtham Has Arrived!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Add to Calendar (.ics download)
  const calendarBtn = document.getElementById('add-to-calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadCalendarInvite();
    });
  }

  function downloadCalendarInvite() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Annamalai and Sarmila Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-annamalai-sarmila-2026@madurai',
      'DTSTAMP:20260901T000000Z',
      'DTSTART:20261122T003000Z', // 06:00 IST is 00:30 UTC
      'DTEND:20261122T170000Z',
      'SUMMARY:Wedding of Annamalai & Sarmila',
      'DESCRIPTION:We cordially invite you to celebrate the auspicious South Indian wedding ceremony of Annamalai & Sarmila at Thiruparankundram Murugan Temple\\, Madurai\\, Tamil Nadu.',
      'LOCATION:Thiruparankundram Murugan Temple\\, Madurai\\, Tamil Nadu\\, India',
      'URL:https://maps.app.goo.gl/XvsBgxvmvMFd9t9U6',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Annamalai-and-Sarmila-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.showToast) {
      window.showToast('Calendar invitation downloaded!');
    }
  }
});
