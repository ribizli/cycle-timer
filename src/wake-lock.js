import { writable, derived, get } from 'svelte/store';


// The wake lock sentinel.
let wakelockOrVideo;

let _locked = writable(false);

export const locked = { subscribe: _locked.subscribe };

const supported = 'wakeLock' in navigator;

// Function that attempts to request a screen wake lock.
export const requestWakeLock = async () => {
  if (!supported) {
    addVideo();
    wakelockOrVideo?.play();
    _locked.set(true);
    return;
  }
  try {
    if (!(wakelockOrVideo?.released ?? true)) return;
    wakelockOrVideo = await navigator.wakeLock.request('screen');
    _locked.set(true);
    wakelockOrVideo.addEventListener('release', () => {
      console.log('Screen Wake Lock was released');
      _locked.set(false);
    });
    console.log('Screen Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

export const releaseWakeLock = async () => {
  if (!supported && video) {
    wakelockOrVideo.pause();
    _locked.set(false);
    return;
  }
  if (!wakelockOrVideo) return;
  await wakelockOrVideo.release();
  _locked.set(false);
};


function addVideo() {
  if (wakelockOrVideo) return;

  const addSourceToVideo = (element, src, type) => {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
  }

  wakelockOrVideo = document.createElement('video');
  wakelockOrVideo.muted = true;
  wakelockOrVideo.loop = true;
  wakelockOrVideo.playsinline = true;
  addSourceToVideo(wakelockOrVideo, 'video/blank.m4v');
  addSourceToVideo(wakelockOrVideo, 'video/blank.ogv', 'video/ogg');
  addSourceToVideo(wakelockOrVideo, 'video/blank.webm', 'video/webm');
  wakelockOrVideo.style.visibility = 'hidden';
  document.body.append(wakelockOrVideo);
}
