class w {
  constructor(t) {
    const { width: e, height: a, pixelSize: n, canvas: i } = { pixelSize: 1, ...t };
    this.canvasContext = (i || document.createElement("canvas")).getContext("2d", { willReadFrequently: !0 }), this.canvas.width = e, this.canvas.height = a, x(this.canvas, {
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
    const n = t[0].length, i = t.length, h = new ImageData(n, i);
    for (let c = 0; c < i; c++)
      for (let r = 0; r < n; r++) {
        const [l, d, u, v] = t[c][r], o = (c * n + r) * 4;
        h.data[o] = l, h.data[o + 1] = d, h.data[o + 2] = u, h.data[o + 3] = v;
      }
    this.canvasContext.putImageData(h, e, a);
  }
  chunkChannels(t) {
    return g(g(t, 4), this.width);
  }
  createPixels() {
    return this.chunkChannels(Array.from({ length: this.width * this.height * 4 }));
  }
  getPixels() {
    const t = this.canvasContext.getImageData(0, 0, this.width, this.height);
    return this.chunkChannels([...t.data]);
  }
  clear() {
    this.canvasContext.save(), this.canvasContext.resetTransform(), this.canvasContext.clearRect(0, 0, this.width, this.height), this.canvasContext.restore();
  }
}
function g(s, t) {
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
