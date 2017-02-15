/**
 * 说明
 * saveLocalStorage对应的是{id:{key:value}}存入window.localStorage.__seller__
 * getLocalStorage对应的是获取window.localStorage.__seller__[id][key]
 */
export function saveLocalStorage (id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
    seller[id][key] = value;
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {}
    }
    seller[id][key] = value;
  }
  window.localStorage.__seller__ = JSON.stringify(seller);
}

export function getLocalStorage (id, key, df) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return df;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return df;
  }
  seller = seller[key];
  if (!seller) {
    return df;
  }
  return seller;
}
