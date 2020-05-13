
export const timeInputMask = (el) => {

  el.addEventListener('keydown', down);
  el.addEventListener('keyup', up);
  el.addEventListener('select', unselect);
  el.addEventListener('paste', preventDefault);
  el.addEventListener('drop', preventDefault);

  return {
    destroy: () => {
      el.removeEventListener('keydown', down);
      el.removeEventListener('keyup', up);
      el.removeEventListener('select', unselect);
      el.removeEventListener('paste', preventDefault);
      el.removeEventListener('drop', preventDefault);
    },
  };
};

const digitRe = /^\d$/;
const formatRe = /^\d{2}:\d{2}$/;
const colonPos = 2;
const prevValue = Symbol('prevValue');

function down(e) {
  let val = this[prevValue] = this.value;
  if (digitRe.test(e.key)) {
    val = val.slice(0, this.selectionStart) + e.key + val.slice(this.selectionStart + 1);
    console.log(val);
    if (formatRe.test(val)) {
      // select digit to get replaced
      this.selectionEnd = this.selectionStart + 1;
      return;
    }
  } else if (e.key.startsWith('Arrow')) {
    if (e.key === 'ArrowLeft' && this.selectionStart === colonPos + 1) {
      this.selectionStart = this.selectionEnd = colonPos;
    }
    if (e.key === 'ArrowRight' && this.selectionStart === colonPos - 1) {
      this.selectionStart = this.selectionEnd = colonPos;
    }
    return;
  } else if (e.key === 'Backspace' && this.selectionStart > 0) {
    let start = this.selectionStart;
    if (start === colonPos + 1) start = colonPos;
    this.value = val.slice(0, start) + '0' + val.slice(start);
    this.selectionEnd = this.selectionStart = start;
    return;
  }
  e.preventDefault();
}

function up(e) {
  let val = this.value;
  if (!formatRe.test(val)) {
    this.value = this[prevValue];
  }
  if (this.selectionStart === colonPos) {
    this.selectionStart = this.selectionEnd = colonPos + 1;
  }
}

function unselect() {
  let start = this.selectionStart;
  if (start === colonPos) start = colonPos + 1;
  this.selectionEnd = this.selectionStart = start;
}

function preventDefault(e) {
  e.preventDefault();
}