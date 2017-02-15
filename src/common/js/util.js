/**
 * 示例?id=12345&a=6789
 * 转化结果{id:"12345",a:"6789"}
 */
export function urlParse () {
  let url = window.location.search;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let obj = {};
  let arr = url.match(reg);
  // arr => ["?id=12345", "&a=6789"]
  arr.forEach((item) => {
    let tmpArr = item.substr(1).split('=');
    let key = decodeURIComponent(tmpArr[0]);
    let value = decodeURIComponent(tmpArr[1]);
    obj[key] = value;
  });
  return obj;
};
