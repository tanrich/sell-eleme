/**
 * Created by tan on 2017/2/14.
 */
export function dateFormat (date, format) {
  // fomat示例 YYYY-MM-DD hh:mm:ss
  // 因为年份比较特殊，有YYYY和YY两种
  if (/(Y+)/.test(format)) {
    // 示例若为YYYY结果为2016,若为YY结果为16
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 建立转换规则
  let obj = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in obj) {
    if (new RegExp(`(${k})`).test(format)) {
      let str = obj[k] + '';
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : addZero(str));
    }
  }
  // 根据format来判断是否补0
  function addZero (str) {
    return ('00' + str).substr(str.length)
  }

  return format;
}
