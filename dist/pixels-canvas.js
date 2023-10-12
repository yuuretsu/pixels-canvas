class r {
  constructor(a) {
    const { width: t, height: e, pixelSize: n, canvas: s } = { pixelSize: 1, ...a };
    this.canvasContext = (s || document.createElement("canvas")).getContext("2d", { willReadFrequently: !0 }), this.canvas.width = t, this.canvas.height = e, g(this.canvas, {
      width: `${t * n}px`,
      height: `${e * n}px`,
      imageRendering: "pixelated"
    }), this.imageData = new ImageData(t, e);
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
  refreshImageData() {
    this.imageData = this.canvasContext.getImageData(0, 0, this.width, this.height);
  }
  putImageData(a, t, e) {
    this.canvasContext.putImageData(e, a, t), this.refreshImageData();
  }
  setPixels(a, t, e) {
    const n = a[0].length, s = new ImageData(new Uint8ClampedArray(a.flatMap((c) => c.flat())), n);
    this.putImageData(t, e, s);
  }
  getPixels() {
    return h(h([...this.imageData.data], 4), this.width);
  }
}
function h(i, a) {
  const t = [];
  for (let e = 0; e < i.length; e += a)
    t.push(i.slice(e, e + a));
  return t;
}
function g(i, a) {
  for (const t in a)
    i.style[t] = a[t];
}
export {
  r as PixelsCanvas
};
