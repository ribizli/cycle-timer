export const formatTime = time => {
  let mins = Math.floor(time / 60);
  let secs = time % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const parseTime = timeString => {
  const [mins, secs] = timeString.split(':');
  const parsed = parseInt(mins) * 60 + parseInt(secs);
  return isNaN(parsed) ? 0 : parsed;
};

export const inputValueWrapper = (converter, initial = null) => {
  let value = initial;
  let _value$ = converter.string(initial);
  return {
    get value() {
      return value;
    },
    set value(val) {
      value = val;
      _value$ = converter.string(val);
    },
    get value$() {
      return _value$;
    },
    set value$(str) {
      _value$ = str;
      value = converter.value(str);
    },
  };
};

export const timeInputValue = initial => inputValueWrapper({
  string: formatTime,
  value: parseTime,
}, initial);
