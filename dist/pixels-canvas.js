class r {
  constructor(a) {
    const { width: t, height: e, pixelSize: s, canvas: n } = { pixelSize: 1, ...a };
    this.canvasContext = (n || document.createElement("canvas")).getContext("2d"), this.canvas.width = t, this.canvas.height = e, g(this.canvas, {
      width: `${t * s}px`,
      height: `${e * s}px`,
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
    const s = a[0].length, n = new ImageData(new Uint8ClampedArray(a.flatMap((c) => c.flat())), s);
    this.putImageData(t, e, n);
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
