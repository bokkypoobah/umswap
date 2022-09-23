const generateRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const delay = ms => new Promise(res => setTimeout(res, ms));
