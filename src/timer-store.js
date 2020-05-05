import { writable, derived, get } from 'svelte/store';

const _config = writable([]);

const currentIdx = writable(null);

let interval = writable(null);

export const running = derived(interval, i => !!i);
export const started = derived(currentIdx, idx => idx != null);

let currentSetter = null;

export const current = derived([_config, currentIdx], ([config, idx], set) => {
  currentSetter = set;
  const realIdx = idx % config.length;
  const item = idx != null && config[realIdx];
  if (!item) return set(null);
  set({...item, timeLeft: item.time, index: realIdx});
});

export const round = derived([_config, currentIdx], ([config, idx]) => {
  return idx != null ? Math.floor(idx / config.length) + 1 : 0;
});

export const config = {
  subscribe: _config.subscribe,
  set: value => {
    stop();
    _config.set(value);
  },
  update: updater => config.set(updater(get(_config))),
};

const cancelInterval = () => {
  const $interval = get(interval);
  if (!$interval) return;
  clearInterval($interval);
  interval.set(null);
}

const iterate = () => {
  let currentItem = get(current);
  if (!currentItem) return cancelInterval();
  if (currentItem.timeLeft-- <= 0) {
    currentIdx.update(idx => ++idx);
  } else {
    currentSetter(currentItem);
  }
};

export const start = (restart = true) => {
  if (get(running)) return;
  if (restart) {
    currentIdx.set(null);
    currentIdx.set(0);
  }
  interval.set(setInterval(iterate, 1000));
};

export const stop = () => {
  pause();
  currentIdx.set(null);
}

export const pause = () => {
  cancelInterval();
}