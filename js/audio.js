/**
 * Chettinad Heritage Ambient Carnatic Audio Engine
 * Plays soothing Saraswati Veena & Tanpura drone in Raga Mohanam / Kalyani
 * Pure Web Audio API synthesis - zero external audio dependencies, 100% reliable
 */

class CarnaticAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.timerId = null;
    this.droneOscillators = [];
    this.noteIndex = 0;

    // Raga Mohanam frequencies (Root C4 = 261.63Hz: Sa, Ri2, Ga3, Pa, Dha2, Sa')
    this.ragaFrequencies = [
      261.63, // Sa (C4)
      293.66, // Ri (D4)
      329.63, // Ga (E4)
      392.00, // Pa (G4)
      440.00, // Dha (A4)
      523.25, // Sa' (C5)
      440.00, // Dha (A4)
      392.00, // Pa (G4)
      329.63, // Ga (E4)
      293.66, // Ri (D4)
      261.63, // Sa (C4)
      196.00, // Pa. (G3)
      220.00, // Dha. (A3)
      261.63  // Sa (C4)
    ];

    this.initControls();
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      this.audioCtx = new AudioContext();

      // Master Gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.audioCtx.currentTime);

      // Warm Chettinad acoustic filter (gentle lowpass for warm timber)
      const lowpass = this.audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(2400, this.audioCtx.currentTime);
      lowpass.Q.setValueAtTime(1.2, this.audioCtx.currentTime);

      this.masterGain.connect(lowpass);
      lowpass.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return true;
  }

  start() {
    if (!this.ensureContext()) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.isMuted = false;
    this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.22, this.audioCtx.currentTime + 2.5);

    this.startTanpuraDrone();
    this.scheduleVeenaMelody();
    this.updateUI(true);
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
    }
    clearTimeout(this.timerId);
    setTimeout(() => {
      this.stopDrone();
    }, 1100);
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying && !this.isMuted) {
      this.isMuted = true;
      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.3);
      }
      this.updateUI(false);
    } else if (this.isPlaying && this.isMuted) {
      this.isMuted = false;
      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.linearRampToValueAtTime(0.22, this.audioCtx.currentTime + 0.5);
      }
      this.updateUI(true);
    } else {
      this.start();
    }
  }

  // Resonant Sacred Tanpura Drone (Root C3 = 130.81Hz, Pa = 196.00Hz, Sa' = 261.63Hz)
  startTanpuraDrone() {
    this.stopDrone();
    if (!this.audioCtx) return;

    const droneFreqs = [130.81, 131.10, 196.00, 261.63]; // Slight detune for acoustic shimmer
    droneFreqs.forEach(freq => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Low pass to tame sawtooth into warm acoustic tanpura drone
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.025, this.audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneOscillators.push({ osc, gain });
    });
  }

  stopDrone() {
    this.droneOscillators.forEach(d => {
      try {
        d.osc.stop();
        d.osc.disconnect();
      } catch (e) {}
    });
    this.droneOscillators = [];
  }

  // Plucked Veena Note with realistic envelope and sympathetic resonance
  pluckVeena(freq, duration = 1.8) {
    if (!this.audioCtx || !this.isPlaying || this.isMuted) return;

    const now = this.audioCtx.currentTime;

    // Pluck oscillator (fundamental)
    const osc = this.audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle microtonal gamaka (gentle frequency bend typical of Veena)
    osc.frequency.linearRampToValueAtTime(freq * 1.012, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.45);

    // Harmonic overtones (pluck snap)
    const overtone = this.audioCtx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);

    // Note Gain Envelope
    const noteGain = this.audioCtx.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.03); // Quick pluck attack
    noteGain.gain.exponentialRampToValueAtTime(0.06, now + 0.35); // Initial decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // Long lingering decay

    const overtoneGain = this.audioCtx.createGain();
    overtoneGain.gain.setValueAtTime(0.08, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(noteGain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration + 0.1);
    overtone.stop(now + duration + 0.1);
  }

  scheduleVeenaMelody() {
    if (!this.isPlaying) return;

    const freq = this.ragaFrequencies[this.noteIndex % this.ragaFrequencies.length];
    this.noteIndex++;

    // Randomize duration slightly for natural human rubato
    const durations = [2.2, 1.8, 3.2, 2.0, 2.6];
    const duration = durations[this.noteIndex % durations.length];

    this.pluckVeena(freq, duration);

    // Schedule next note with graceful pause
    const interval = (duration * 0.85) * 1000;
    this.timerId = setTimeout(() => {
      this.scheduleVeenaMelody();
    }, interval);
  }

  updateUI(playing) {
    const toggles = document.querySelectorAll('.music-toggle-btn');
    toggles.forEach(btn => {
      if (playing) {
        btn.classList.add('is-playing');
        btn.setAttribute('aria-label', 'Mute Traditional Music');
        const text = btn.querySelector('.music-toggle-text');
        if (text) text.textContent = 'Veena / Nadaswaram Playing';
      } else {
        btn.classList.remove('is-playing');
        btn.setAttribute('aria-label', 'Play Traditional Music');
        const text = btn.querySelector('.music-toggle-text');
        if (text) text.textContent = 'Music Muted (Click to Play)';
      }
    });
  }

  initControls() {
    document.addEventListener('DOMContentLoaded', () => {
      const toggles = document.querySelectorAll('.music-toggle-btn');
      toggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggle();
        });
      });

      // Autoplay attempt on first user gesture anywhere
      const firstInteraction = () => {
        if (!this.isPlaying && !this.isMuted) {
          this.start();
        }
        document.removeEventListener('click', firstInteraction);
        document.removeEventListener('keydown', firstInteraction);
      };

      document.addEventListener('click', firstInteraction, { once: true });
      document.addEventListener('keydown', firstInteraction, { once: true });
    });
  }
}

// Global Singleton
window.carnaticAudio = new CarnaticAudioEngine();

