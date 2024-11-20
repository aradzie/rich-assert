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
  if (typeof value === "string") {
    return `<string ${escape(value)}>`;
  }
  if (value instanceof Date) {
    return `<date ${value.toISOString()}>`;
  }
  return Object.prototype.toString.call(value);
};

const escape = (value: string) => {
  value = value
    .replaceAll('"', '\\"')
    .replaceAll("\\", "\\\\")
    .replaceAll("\t", "\\t")
    .replaceAll("\r", "\\r")
    .replaceAll("\n", "\\n")
    .replaceAll("\v", "\\v");
  if (value.length > 20) {
    return `"${value.substring(0, 20)}...`;
  } else {
    return `"${value}"`;
  }
};
