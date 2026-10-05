/**
 * Tiny coordination channel so only one signal point moves at a time:
 * the explorer waits for the hero signal to finish before it continues.
 */
let heroDone = false;
const listeners = new Set<() => void>();

export const signalBus = {
  markHeroDone() {
    if (heroDone) return;
    heroDone = true;
    listeners.forEach((l) => l());
    listeners.clear();
  },
  onHeroDone(cb: () => void) {
    if (heroDone) {
      cb();
      return () => {};
    }
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
};
