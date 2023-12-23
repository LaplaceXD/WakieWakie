export const isString = (str, validateNotEmpty = false) =>
  validateNotEmpty ? typeof str === "string" && str.trim() !== "" : typeof str === "string";

export const camelCase = str =>
  isString(str, true)
    ? str
        .replace(/[^a-z0-9]+/gim, " ")
        .trim()
        .replace(/([a-z0-9 ])([A-Z])/gm, (w, m1, m2) => `${m1} ${m2}`)
        .replace(/([0-9 ])([a-z])/gim, (w, m1, m2) => `${m1} ${m2}`)
        .replace(/([A-Z]{2,})([a-z]{2,})/gm, (w, m1, m2) => `${m1} ${m2}`)
        .toLowerCase()
        .trim()
        .replace(/ +(\w)/gm, (w, m) => m.toUpperCase())
    : str;

export const deCamelCase = str =>
  isString(str, true) ? str.replace(/ *([A-Z])/gm, " $1").replace(/^./, m => m.toUpperCase()) : str;
