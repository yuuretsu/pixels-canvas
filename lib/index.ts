export type RGBA = [r: number, g: number, b: number, a: number];

export interface PixelsCanvasParameters {
  width: number;
  height: number;
  pixelSize?: number;
  canvas?: HTMLCanvasElement
}

export class PixelsCanvas {
  private readonly canvasContext: CanvasRenderingContext2D;
  constructor(options: PixelsCanvasParameters) {
    const { width, height, pixelSize, canvas } = { pixelSize: 1, ...options };

    this.canvasContext = (canvas || document.createElement("canvas"))
      .getContext("2d", { willReadFrequently: true })!;

    this.canvas.width = width;
    this.canvas.height = height;

    setStyles(this.canvas, {
      width: `${width * pixelSize}px`,
      height: `${height * pixelSize}px`,
      imageRendering: "pixelated",
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

  setPixels(pixels: RGBA[][], x: number, y: number) {
    const width = pixels[0]!.length;
    const height = pixels.length;

    const newImageData = new ImageData(width, height);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const [r, g, b, a] = pixels[i]![j]!;
        const baseIndex = (i * width + j) * 4;
        newImageData.data[baseIndex] = r;
        newImageData.data[baseIndex + 1] = g;
        newImageData.data[baseIndex + 2] = b;
        newImageData.data[baseIndex + 3] = a;
      }
    }

    this.canvasContext.putImageData(newImageData, x, y);
  }

  private chunkChannels(array: number[]) {
    return chunk(chunk(array, 4) as RGBA[], this.width);
  }

  createPixels(): RGBA[][] {
    return this.chunkChannels(Array.from({ length: this.width * this.height * 4 }));
  }

  getPixels(): RGBA[][] {
    const imageData = this.canvasContext.getImageData(0, 0, this.width, this.height);
    return this.chunkChannels([...imageData.data]);
  }

  clear() {
    this.canvasContext.save();
    this.canvasContext.resetTransform();
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.canvasContext.restore();
  }
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function setStyles(
  element: ElementCSSInlineStyle,
  style: Partial<CSSStyleDeclaration>
) {
  for (const key in style) {
    element.style[key] = style[key]!;
  }
}
