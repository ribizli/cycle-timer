export const timeInputMask = (el) => {

  el.addEventListener('keydown', moveCursor);
  el.addEventListener('beforeinput', beforeInput);
  el.addEventListener('input', input);

  return {
    destroy: () => {
      el.removeEventListener('keydown', moveCursor);
      el.addEventListener('beforeinput', beforeInput);
      el.addEventListener('input', input);
    },
  };
};

const formatRe = /^\d{2}:\d{2}$/;
const colonPos = 2;
const prevValue = Symbol('prevValue');

function moveCursor(e) {
  if (e.key === 'ArrowLeft' && this.selectionStart === colonPos + 1) {
    this.selectionStart = this.selectionEnd = colonPos;
  }
  if (e.key === 'ArrowRight' && this.selectionStart === colonPos - 1) {
    this.selectionStart = this.selectionEnd = colonPos;
  }
}

function beforeInput(e) {
  let val = this[prevValue] = this.value;
  //console.log('beforeInput', e, val);
  if (e.inputType === 'insertText') {
    val = val.slice(0, this.selectionStart) + e.data + val.slice(this.selectionStart + 1);
    if (formatRe.test(val)) {
      // select digit to get replaced
      this.selectionEnd = this.selectionStart + 1;
    } else {
      e.preventDefault();
    }
  } else if (e.inputType === 'deleteContentBackward') {
    let start = this.selectionStart;
    if (start === colonPos) return;
    this.value = val.slice(0, start) + '0' + val.slice(start + 1);
  }
}

function input(e) {
  let val = this.value;
  //console.log('input', e, val, this.selectionStart);
  if (!formatRe.test(val)) {
    this.value = this[prevValue];
  }
  if (this.selectionStart === colonPos) {
    this.selectionStart = this.selectionEnd = colonPos + 1;
  }
}

