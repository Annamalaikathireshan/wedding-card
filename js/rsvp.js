/**
 * Interactive RSVP Manager with WhatsApp Sync, Confetti Celebration & CSV Export
 * Wedding of Annamalai & Sarmila - Madurai, Tamil Nadu
 */

document.addEventListener('DOMContentLoaded', () => {
  const rsvpForm = document.getElementById('rsvp-form');
  const successCard = document.getElementById('rsvp-success-card');
  const guestNameSpan = document.getElementById('rsvp-success-guest-name');
  const whatsappBtn = document.getElementById('rsvp-whatsapp-btn');
  const adminTrigger = document.getElementById('admin-trigger-link');
  const adminModal = document.getElementById('admin-modal');
  const adminClose = document.getElementById('admin-close-btn');
  const exportCsvBtn = document.getElementById('export-csv-btn');
  const guestTableBody = document.getElementById('guest-list-tbody');
  const totalAttendingEl = document.getElementById('total-attending-count');

  // WhatsApp Destination Phone Number for Annamalai & Sarmila
  const COUPLE_PHONE_NUMBER = '919876543210';

  // Seed default guest list if not present
  if (!localStorage.getItem('wedding_rsvps')) {
    const defaultGuests = [
      {
        name: 'Senthil Kumar & Family',
        status: 'Attending',
        guests: 4,
        dietary: 'Traditional Pure Veg',
        song: 'Kalyana Malai Kondadum Penne',
        message: 'Heartiest congratulations to Annamalai & Sarmila! Looking forward to the Madurai feast.',
        timestamp: '2026-10-10 11:30'
      },
      {
        name: 'Meenakshi Sundaram',
        status: 'Attending',
        guests: 2,
        dietary: 'Traditional Pure Veg',
        song: 'Inbam Pongum Vennila',
        message: 'May Lord Murugan shower endless blessings upon the beautiful couple!',
        timestamp: '2026-10-12 18:15'
      }
    ];
    localStorage.setItem('wedding_rsvps', JSON.stringify(defaultGuests));
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleRsvpSubmit();
    });
  }

  function handleRsvpSubmit() {
    const nameInput = document.getElementById('guest-name');
    const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
    const countInput = document.getElementById('guest-count');
    const songInput = document.getElementById('song-request');
    const messageInput = document.getElementById('guest-message');

    // Dietary checkboxes
    const dietaryChecked = Array.from(document.querySelectorAll('input[name="dietary"]:checked'))
      .map(cb => cb.value);
    const dietaryOther = document.getElementById('dietary-other')?.value;
    if (dietaryOther) dietaryChecked.push(dietaryOther);
    const dietaryText = dietaryChecked.length > 0 ? dietaryChecked.join(', ') : 'Traditional Pure Veg';

    const name = nameInput ? nameInput.value.trim() : '';
    const status = attendanceRadio ? attendanceRadio.value : 'Attending';
    const guests = countInput ? parseInt(countInput.value, 10) || 1 : 1;
    const song = songInput ? songInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name) {
      alert('Please enter your full name.');
      return;
    }

    const rsvpEntry = {
      name,
      status,
      guests: status === 'Attending' ? guests : 0,
      dietary: dietaryText,
      song,
      message,
      timestamp: new Date().toLocaleString()
    };

    // Save to local storage
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    existing.push(rsvpEntry);
    localStorage.setItem('wedding_rsvps', JSON.stringify(existing));

    // Show success view
    if (guestNameSpan) guestNameSpan.textContent = name;
    if (rsvpForm) rsvpForm.style.display = 'none';
    if (successCard) successCard.classList.add('is-active');

    // Confetti celebration
    launchConfetti();

    if (window.showToast) {
      window.showToast('Nandri! Your RSVP has been recorded.');
    }

    // Setup WhatsApp sync button
    setupWhatsAppButton(rsvpEntry);
  }

  function setupWhatsAppButton(data) {
    if (!whatsappBtn) return;

    const emoji = data.status === 'Attending' ? '🌸🪔🙏' : '💌';
    const text = 
`*Wedding of Annamalai & Sarmila — RSVP* ${emoji}
*Guest Name:* ${data.name}
*Status:* ${data.status === 'Attending' ? 'Will Joyfully Attend (Subha Muhurtham & Feast)' : 'Regretfully Unable to Attend'}
*Total Guests:* ${data.guests}
*Preference:* ${data.dietary}
${data.song ? `*Song / Melodies:* ${data.song}\n` : ''}${data.message ? `*Wishes & Blessings:* ${data.message}` : ''}`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${COUPLE_PHONE_NUMBER}?text=${encodedText}`;

    whatsappBtn.href = waUrl;
    whatsappBtn.target = '_blank';
  }

  // Admin Drawer
  if (adminTrigger) {
    adminTrigger.addEventListener('click', () => {
      populateAdminTable();
      if (adminModal) adminModal.classList.add('is-active');
    });
  }

  if (adminClose) {
    adminClose.addEventListener('click', () => {
      if (adminModal) adminModal.classList.remove('is-active');
    });
  }

  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) adminModal.classList.remove('is-active');
    });
  }

  function populateAdminTable() {
    if (!guestTableBody) return;
    const list = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    guestTableBody.innerHTML = '';

    let totalAttending = 0;

    list.forEach(item => {
      if (item.status === 'Attending') {
        totalAttending += (item.guests || 1);
      }
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${escapeHtml(item.name)}</strong></td>
        <td><span style="color: ${item.status === 'Attending' ? '#1B5E38' : '#A31D1D'}">${item.status}</span></td>
        <td>${item.guests}</td>
        <td>${escapeHtml(item.dietary || 'Traditional Pure Veg')}</td>
        <td><small>${escapeHtml(item.song || '-')}</small></td>
      `;
      guestTableBody.appendChild(row);
    });

    if (totalAttendingEl) {
      totalAttendingEl.textContent = totalAttending;
    }
  }

  // CSV Exporter
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const list = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      if (list.length === 0) {
        alert('No RSVP entries to export.');
        return;
      }

      let csv = 'Name,Status,Guests,Dietary,Favorite Song,Blessings,Date\r\n';
      list.forEach(item => {
        csv += `"${(item.name || '').replace(/"/g, '""')}","${item.status}",${item.guests},"${(item.dietary || '').replace(/"/g, '""')}","${(item.song || '').replace(/"/g, '""')}","${(item.message || '').replace(/"/g, '""')}","${item.timestamp}"\r\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'Annamalai-Sarmila-Wedding-Guests.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (window.showToast) {
        window.showToast('Guest list exported to CSV!');
      }
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Festive Confetti & Yellow Akshata Shower
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 130;
    const pieces = [];
    // Auspicious South Indian Akshata & Petal colors: Turmeric Gold, Marigold Orange, Kumkum Red, Lotus Pink, Jasmine White
    const colors = ['#D4AF37', '#FF9933', '#8B0000', '#FFD700', '#E55381', '#FFFFFF'];

    for (let i = 0; i < confettiCount; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.8) * 15,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        alpha: 1
      });
    }

    let frames = 0;
    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frames++;

      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.rot += p.rotSpeed;
        p.alpha -= 0.008;

        if (p.alpha > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }

      if (frames < 140) {
        requestAnimationFrame(animateConfetti);
      } else {
        if (canvas.parentElement) {
          canvas.parentElement.removeChild(canvas);
        }
      }
    }

    requestAnimationFrame(animateConfetti);
  }
});
