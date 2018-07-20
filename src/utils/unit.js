const units = ['', '万', '亿']
const minute = 1000 * 60
const hour = minute * 60
const day = hour * 24
const halfamonth = day * 15
const month = day * 30

const diff = (dv) => {
  return { mc: dv / month, wc: dv / (7 * day), dc: dv / day, hc: dv / hour, mic: dv / minute }
}

export const int2unit = (int) => {
  const k = 10000;
  const i = Math.floor(Math.log(int) / Math.log(k));
  if (i > 0) {
    return (int / Math.pow(k, i)).toPrecision(3) + '' + units[i];
  }

  return int;
}
export const format = (time) => {
  const diffValue = Date.now() - time
  if (diffValue < 0) return ''

  const dv = diff(diffValue)
  let formatStr = ''

  if (dv.mc >= 1) {
    formatStr = `${parseInt(dv.mc)}月前`
  }
  else if (dv.wc >= 1) {
    formatStr = `${parseInt(dv.wc)}周前`
  }
  else if (dv.dc >= 1) {
    formatStr = `${parseInt(dv.dc)}天前`
  }
  else if (dv.hc >= 1) {
    formatStr = `${parseInt(dv.hc)}小时前`
  }
  else if (dv.mic >= 1) {
    formatStr = `${parseInt(dv.mic)}分钟前`
  } else {
    formatStr = '刚刚'
  }
  return formatStr
}