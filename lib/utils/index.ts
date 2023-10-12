export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function setStyles(
  element: ElementCSSInlineStyle,
  style: Partial<CSSStyleDeclaration>
) {
  for (const key in style) {
    element.style[key] = style[key]!;
  }
}
