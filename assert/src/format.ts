export const format = (value: unknown): string => {
  switch (value) {
    case null:
      return "<null>";
    case undefined:
      return "<undefined>";
    case true:
      return "<true>";
    case false:
      return "<false>";
  }
  if (typeof value === "number") {
    return `<number ${value}>`;
  }
  if (typeof value === "bigint") {
    return `<bigint ${value}>`;
  }
  if (typeof value === "string") {
    return `<string ${escape(value)}>`;
  }
  if (typeof value === "symbol") {
    return `<symbol ${String(value)}>`;
  }
  if (value instanceof Date) {
    return `<date ${value.toISOString()}>`;
  }
  return Object.prototype.toString.call(value);
};

const escape = (value: string): string => {
  let s = "";
  for (let i = 0; i < value.length; i++) {
    if (i === 20) {
      return `"${s}...`;
    }
    const c = value.charAt(i);
    switch (c) {
      case "\\":
        s += "\\\\";
        break;
      case '"':
        s += '\\"';
        break;
      case "\n":
        s += "\\n";
        break;
      case "\r":
        s += "\\r";
        break;
      case "\t":
        s += "\\t";
        break;
      case "\b":
        s += "\\b";
        break;
      case "\f":
        s += "\\f";
        break;
      case "\v":
        s += "\\v";
        break;
      case "\0":
        s += "\\0";
        break;
      default:
        s += c;
        break;
    }
  }
  return `"${s}"`;
};
