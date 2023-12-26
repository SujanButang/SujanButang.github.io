import { ALPHABET_SET, NUMBER_SET } from "./constants";

/**
 * return random number between provided values
 * @param min
 * @param max
 * @returns number
 */
export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * return random string of provided length
 * @param length
 * @returns string
 */
export function getRandomString(length: number): string {
  const characterSet = ALPHABET_SET + NUMBER_SET;

  let output = "";

  for (let i = 0; i < length; i++) {
    output += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    );
  }

  return output;
}

/**
 * Apply styles to element
 * @param element
 * @param styles
 */
export function setStyle(
  element: HTMLElement,
  styles: Record<string, string | null> = {}
) {
  console.log(element);
  Object.keys(styles).forEach((styleName: string) => {
    const styleValue = styles[styleName];
    element.style.setProperty(styleName, styleValue);
  });
}

/**
 * Set attributes to an element
 * @param element
 * @param attributes
 */
export function setAttribute(
  element: HTMLElement,
  attributes: Record<string, string> = {}
) {
  Object.keys(attributes).forEach((attributeName: string) => {
    const attributeValue = attributes[attributeName];
    element.setAttribute(attributeName, attributeValue);
  });
}
