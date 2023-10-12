class w {
  constructor(t) {
    const { width: e, height: a, pixelSize: n, canvas: h } = { pixelSize: 1, ...t };
    this.canvasContext = (h || document.createElement("canvas")).getContext("2d", { willReadFrequently: !0 }), this.canvas.width = e, this.canvas.height = a, x(this.canvas, {
      width: `${e * n}px`,
      height: `${a * n}px`,
      imageRendering: "pixelated"
    });
  }
  get canvas() {
    return this.canvasContext.canvas;
  }
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  setPixels(t, e, a) {
    const n = t[0].length, h = t.length, i = new ImageData(n, h);
    for (let c = 0; c < h; c++)
      for (let g = 0; g < n; g++) {
        const [d, l, u, v] = t[c][g], o = (c * n + g) * 4;
        i.data[o] = d, i.data[o + 1] = l, i.data[o + 2] = u, i.data[o + 3] = v;
      }
    this.canvasContext.putImageData(i, e, a);
  }
  getPixels() {
    const t = this.canvasContext.getImageData(0, 0, this.width, this.height);
    return r(r([...t.data], 4), this.width);
  }
}
function r(s, t) {
  const e = [];
  for (let a = 0; a < s.length; a += t)
    e.push(s.slice(a, a + t));
  return e;
}
function x(s, t) {
  for (const e in t)
    s.style[e] = t[e];
}
export {
  w as PixelsCanvas
};
