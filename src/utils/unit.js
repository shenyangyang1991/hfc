const units = ['', '万', '亿'];
export const int2unit = (int) => {
  const k = 10000;
  const i = Math.floor(Math.log(int) / Math.log(k));
  if (i > 0) {
    return (int / Math.pow(k, i)).toPrecision(3) + '' + units[i];
  }

  return int;
}