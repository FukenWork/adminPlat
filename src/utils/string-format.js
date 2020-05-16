export const stringFormatArr = (str, data) => {
  if (!data || data === undefined) {
    return str
  }
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // eslint-disable-next-line
      str = str.replace(new RegExp("\{" + key + "\}", "g"), data[key]);
    }
  }
  return str;
}