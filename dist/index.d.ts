export declare class PixelsCanvas {
    private readonly canvasContext;
    constructor(options: PixelsCanvasParameters);
    get canvas(): HTMLCanvasElement;
    get width(): number;
    get height(): number;
    setPixels(pixels: RGBA[][], x: number, y: number): void;
    private chunkChannels;
    createPixels(): RGBA[][];
    getPixels(): RGBA[][];
    clear(): void;
}

export declare interface PixelsCanvasParameters {
    width: number;
    height: number;
    pixelSize?: number;
    canvas?: HTMLCanvasElement;
}

export declare type RGBA = [r: number, g: number, b: number, a: number];

export { }
