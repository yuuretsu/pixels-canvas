(function(i,n){typeof exports=="object"&&typeof module<"u"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(i=typeof globalThis<"u"?globalThis:i||self,n(i.PixelsCanvas={}))})(this,function(i){"use strict";class n{constructor(e){const{width:t,height:a,pixelSize:h,canvas:c}={pixelSize:1,...e};this.canvasContext=(c||document.createElement("canvas")).getContext("2d",{willReadFrequently:!0}),this.canvas.width=t,this.canvas.height=a,o(this.canvas,{width:`${t*h}px`,height:`${a*h}px`,imageRendering:"pixelated"}),this.imageData=new ImageData(t,a)}get canvas(){return this.canvasContext.canvas}get width(){return this.canvas.width}get height(){return this.canvas.height}refreshImageData(){this.imageData=this.canvasContext.getImageData(0,0,this.width,this.height)}putImageData(e,t,a){this.canvasContext.putImageData(a,e,t),this.refreshImageData()}setPixels(e,t,a){const h=e[0].length,c=new ImageData(new Uint8ClampedArray(e.flatMap(d=>d.flat())),h);this.putImageData(t,a,c)}getPixels(){return g(g([...this.imageData.data],4),this.width)}}function g(s,e){const t=[];for(let a=0;a<s.length;a+=e)t.push(s.slice(a,a+e));return t}function o(s,e){for(const t in e)s.style[t]=e[t]}i.PixelsCanvas=n,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});
