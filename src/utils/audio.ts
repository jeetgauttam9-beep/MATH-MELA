/**
 * Offline Audio System for Bal Hanuman Math Magic Land
 * Uses Web Audio API for synthesized sounds & Web Speech API for read-aloud
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private voiceEnabled: boolean = true;
  private isSpeaking: boolean = false;

  constructor() {
    // Read user audio preference from localStorage
    try {
      const savedSound = localStorage.getItem('bal_hanuman_sound');
      if (savedSound !== null) this.soundEnabled = savedSound === 'true';
      const savedVoice = localStorage.getItem('bal_hanuman_voice');
      if (savedVoice !== null) this.voiceEnabled = savedVoice === 'true';
    } catch {
      // Ignore localStorage errors
    }
  }

  private initCtx(): AudioContext | null {
    if (!this.soundEnabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isSoundOn(): boolean {
    return this.soundEnabled;
  }

  public setSoundOn(on: boolean) {
    this.soundEnabled = on;
    try {
      localStorage.setItem('bal_hanuman_sound', String(on));
    } catch {}
  }

  public isVoiceOn(): boolean {
    return this.voiceEnabled;
  }

  public setVoiceOn(on: boolean) {
    this.voiceEnabled = on;
    try {
      localStorage.setItem('bal_hanuman_voice', String(on));
    } catch {}
    if (!on) {
      this.stopVoice();
    }
  }

  // Quick tactile pop on button click
  public playPop() {
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  // Joyful rising arpeggio on correct answer (C5, E5, G5, C6)
  public playCorrect() {
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch {}
  }

  // Gentle low double-boop on incorrect attempt (never harsh)
  public playGentleRetry() {
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const notes = [330, 261.63]; // E4 -> C4
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.12);
      });
    } catch {}
  }

  // Shimmering star sparkle
  public playStarSparkle() {
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const freqs = [1046.5, 1318.51, 1567.98, 2093.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.3);
      });
    } catch {}
  }

  // Victory fanfare
  public playFanfare() {
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const melody = [
        { f: 523.25, t: 0.0, d: 0.15 },
        { f: 523.25, t: 0.15, d: 0.15 },
        { f: 523.25, t: 0.3, d: 0.15 },
        { f: 659.25, t: 0.45, d: 0.3 },
        { f: 783.99, t: 0.75, d: 0.2 },
        { f: 1046.5, t: 0.95, d: 0.5 },
      ];
      melody.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch {}
  }

  // Read aloud math question using Web Speech API
  public speakText(text: string, onStart?: () => void, onEnd?: () => void) {
    if (!this.voiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      // Replace math symbols for child-friendly natural speech
      const cleanedText = text
        .replace(/\+/g, ' plus ')
        .replace(/-/g, ' minus ')
        .replace(/×|\*/g, ' times ')
        .replace(/÷|\//g, ' divided by ')
        .replace(/=/g, ' equals ')
        .replace(/\?/g, 'what?');

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 0.9; // Friendly, clear pace for children
      utterance.pitch = 1.15; // Cheerful warm pitch

      utterance.onstart = () => {
        this.isSpeaking = true;
        onStart?.();
      };
      utterance.onend = () => {
        this.isSpeaking = false;
        onEnd?.();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      onEnd?.();
    }
  }

  public stopVoice() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.isSpeaking = false;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const soundManager = new SoundManager();
