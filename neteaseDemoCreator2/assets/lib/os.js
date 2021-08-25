function isAndroid() {
  return cc.sys.platform === cc.sys.ANDROID;
}

function isIos() {
  return cc.sys.platform === cc.sys.IPAD || cc.sys.platform === cc.sys.IPHONE;
}

module.exports = {
  isAndroid,
  isIos,
};
