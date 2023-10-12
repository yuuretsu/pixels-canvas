export type RGBA = [r: number, g: number, b: number, a: number];

export interface PixelsCanvasParameters {
  width: number;
  height: number;
  pixelSize?: number;
  canvas?: HTMLCanvasElement
}

export class PixelsCanvas {
  imageData: ImageData;
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

    this.imageData = new ImageData(width, height);
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

  private refreshImageData() {
    this.imageData = this.canvasContext.getImageData(0, 0, this.width, this.height);
  }

  private putImageData(x: number, y: number, imageData: ImageData) {
    this.canvasContext.putImageData(imageData, x, y);
    this.refreshImageData();
  }

  setPixels(pixels: RGBA[][], x: number, y: number) {
    const width = pixels[0]!.length;
    const imageData = new ImageData(new Uint8ClampedArray(pixels.flatMap(row => row.flat())), width);
    this.putImageData(x, y, imageData);
  }

  getPixels(): RGBA[][] {
    return chunk(chunk([...this.imageData.data], 4) as RGBA[], this.width)
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
