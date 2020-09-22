// The wake lock sentinel.
let wakeLock = null;
let video;

const supported = 'wakeLock' in navigator;

// Function that attempts to request a screen wake lock.
export const requestWakeLock = async () => {
  if (!supported) {
    addVideo();
    video.play();
    return;
  }
  try {
    if (wakeLock) await wakeLock.release();
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock was released');
    });
    console.log('Screen Wake Lock is active');
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

export const releaseWakeLock = async () => {
  if (!supported && video) {
    video.pause();
    return;
  }
  if (!wakeLock) return;
  await wakeLock.release();
  wakeLock = null;
};


function addVideo() {
  if (video) return;

  const addSourceToVideo = (element, src, type) => {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
  }

  video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.playsinline = true;
  addSourceToVideo(video, 'video/blank.m4v');
  addSourceToVideo(video, 'video/blank.ogv', 'video/ogg');
  addSourceToVideo(video, 'video/blank.webm', 'video/webm');
  video.style.visibility = 'hidden';
  document.body.append(video);
}
