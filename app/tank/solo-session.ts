import { Match, TICK_MS } from './src/core/runtime';
import { idleInput, legacyInput, type TankInput } from './src/core/input';

export class SoloSession {
  match: Match;
  playing = false;
  keyboard = idleInput();
  stick = { x: 0, y: 0 };
  drive = { moving: false, reverse: false };
  fireHeld = false;
  firePulse = false;
  private accumulator = 0;

  constructor(seed = Date.now() >>> 0) {
    this.match = new Match({ players: [{ name: '你', ai: false }, { name: 'Laika', ai: true }] }, seed);
  }
  clearInput() {
    this.keyboard = idleInput();
    this.stick = { x: 0, y: 0 };
    this.drive = { moving: false, reverse: false };
    this.fireHeld = false;
    this.firePulse = false;
  }
  pause() { this.playing = false; this.accumulator = 0; this.clearInput(); }
  resume() { this.clearInput(); this.accumulator = 0; this.playing = true; }
  restart(seed = Date.now() >>> 0) {
    this.pause();
    this.match = new Match({ players: [{ name: '你', ai: false }, { name: 'Laika', ai: true }] }, seed);
  }
  input(): TankInput {
    const tank = this.match.view().entities.find(e => e.kind === 'gameTank' && e.player === 0);
    const fire = this.fireHeld || this.firePulse || this.keyboard.fire;
    const keyboardDriving = this.keyboard.forward || this.keyboard.backup || this.keyboard.turnLeft || this.keyboard.turnRight;
    const input = keyboardDriving && Math.hypot(this.stick.x, this.stick.y) <= .05
      ? { ...this.keyboard, fire }
      : legacyInput(this.stick.x, this.stick.y, tank?.rotation ?? 0, fire);
    this.firePulse = false;
    return input;
  }
  advance(elapsed: number) {
    if (!this.playing) return;
    this.accumulator += Math.max(0, Math.min(200, elapsed));
    while (this.accumulator >= TICK_MS) {
      this.accumulator -= TICK_MS;
      this.match.step([this.input()]);
    }
    // The preview never exports replay checkpoints: keep long sessions bounded.
    this.match.history.length = 0;
  }
}
