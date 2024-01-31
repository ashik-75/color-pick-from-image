export function hexToRGB(hex: string) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

export function hexToRYB(hex: string) {
  const { r, g, b } = hexToRGB(hex);
  return rgbToryb(r, g, b);
}
interface RGBObject {
  r: number;
  g: number;
  b: number;
}

export function objToRgb(colorObj: RGBObject): string {
  const { r, g, b } = colorObj;
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToObj(
  rgbColor: string,
): { r: number; g: number; b: number } | null {
  // Extract the numerical values from the RGB string
  const values = rgbColor.match(/\d+/g);

  if (!values || values.length !== 3) {
    // Handle invalid input
    return null;
  }

  // Create an object with 'r', 'g', and 'b' properties
  const colorObj = {
    r: parseInt(values[0], 10),
    g: parseInt(values[1], 10),
    b: parseInt(values[2], 10),
  };

  return colorObj;
}

export function rgbToryb(iRed: number, iGreen: number, iBlue: number) {
  // Remove the white from the color
  const iWhite = Math.min(iRed, iGreen, iBlue);

  iRed -= iWhite;
  iGreen -= iWhite;
  iBlue -= iWhite;

  const iMaxGreen = Math.max(iRed, iGreen, iBlue);

  // Get the yellow out of the red+green

  let iYellow = Math.min(iRed, iGreen);

  iRed -= iYellow;
  iGreen -= iYellow;

  // If this unfortunate conversion combines blue and green, then cut each in half to
  // preserve the value's maximum range.
  if (iBlue > 0 && iGreen > 0) {
    iBlue /= 2;
    iGreen /= 2;
  }

  // Redistribute the remaining green.
  iYellow += iGreen;
  iBlue += iGreen;

  // Normalize to values.
  const iMaxYellow = Math.max(iRed, iYellow, iBlue);

  if (iMaxYellow > 0) {
    const iN = iMaxGreen / iMaxYellow;

    iRed *= iN;
    iYellow *= iN;
    iBlue *= iN;
  }

  // Add the white back in.
  iRed += iWhite;
  iYellow += iWhite;
  iBlue += iWhite;

  return { r: Math.trunc(iRed), y: Math.trunc(iYellow), b: Math.trunc(iBlue) };
}

export function ryb2rgb(iRed: number, iYellow: number, iBlue: number) {
  // Remove the whiteness from the color.
  const iWhite = Math.min(iRed, iYellow, iBlue);

  iRed -= iWhite;
  iYellow -= iWhite;
  iBlue -= iWhite;

  const iMaxYellow = Math.max(iRed, iYellow, iBlue);

  // Get the green out of the yellow and blue
  let iGreen = Math.min(iYellow, iBlue);

  iYellow -= iGreen;
  iBlue -= iGreen;

  if (iBlue > 0 && iGreen > 0) {
    iBlue *= 2.0;
    iGreen *= 2.0;
  }

  // Redistribute the remaining yellow.
  iRed += iYellow;
  iGreen += iYellow;

  // Normalize to values.
  const iMaxGreen = Math.max(iRed, iGreen, iBlue);

  if (iMaxGreen > 0) {
    const iN = iMaxYellow / iMaxGreen;

    iRed *= iN;
    iGreen *= iN;
    iBlue *= iN;
  }

  // Add the white back in.
  iRed += iWhite;
  iGreen += iWhite;
  iBlue += iWhite;

  // Save the RGB
  return { r: Math.trunc(iRed), g: Math.trunc(iGreen), b: Math.trunc(iBlue) };
}

export const RGBTORYB = (value: string) => {
  const output = rgbToObj(value);
  if (output) {
    return rgbToryb(output.r, output?.g, output?.b);
  }
  return { r: 0, y: 0, b: 0 };
};

export const RYBTORGB = ({ r, y, b }: { r: number; y: number; b: number }) => {
  return objToRgb(ryb2rgb(r, y, b));
};
export function rgbToCmyk(value: string) {
  const output = rgbToObj(value);
  if (output) {
    const { r, g, b } = output;

    // Normalize RGB values
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    // Calculate CMY values
    const k = 1 - Math.max(normalizedR, normalizedG, normalizedB);
    const c = (1 - normalizedR - k) / (1 - k);
    const m = (1 - normalizedG - k) / (1 - k);
    const y = (1 - normalizedB - k) / (1 - k);

    // Adjust values to percentage
    const cPercent = Math.round(c * 100);
    const mPercent = Math.round(m * 100);
    const yPercent = Math.round(y * 100);
    const kPercent = Math.round(k * 100);

    return { c: cPercent, m: mPercent, y: yPercent, k: kPercent };
  }

  return { c: 0, m: 0, y: 0, k: 0 };
}

export function cmykToRgb(c: number, m: number, y: number, k: number) {
  const normalizedC = c / 100;
  const normalizedM = m / 100;
  const normalizedY = y / 100;
  const normalizedK = k / 100;

  const r = Math.round(255 * (1 - normalizedC) * (1 - normalizedK));
  const g = Math.round(255 * (1 - normalizedM) * (1 - normalizedK));
  const b = Math.round(255 * (1 - normalizedY) * (1 - normalizedK));

  return { r, g, b };
}
