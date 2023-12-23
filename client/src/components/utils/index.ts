export const isString = (str: string, validateNotEmpty: boolean = false) =>
  validateNotEmpty ? typeof str === "string" && str.trim() !== "" : typeof str === "string";

export const camelCase = (str: string) =>
  isString(str, true)
    ? str
        .replace(/[^a-z0-9]+/gim, " ")
        .trim()
        .replace(/([a-z0-9 ])([A-Z])/gm, (_, m1, m2) => `${m1} ${m2}`)
        .replace(/([0-9 ])([a-z])/gim, (_, m1, m2) => `${m1} ${m2}`)
        .replace(/([A-Z]{2,})([a-z]{2,})/gm, (_, m1, m2) => `${m1} ${m2}`)
        .toLowerCase()
        .trim()
        .replace(/ +(\w)/gm, (_, m) => m.toUpperCase())
    : str;

export const deCamelCase = (str: string) =>
  isString(str, true) ? str.replace(/ *([A-Z])/gm, " $1").replace(/^./, m => m.toUpperCase()) : str;
