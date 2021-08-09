let isInitialized = false;

cc.Class({
  extends: cc.Component,

  properties: {
    console: require('console'),
  },

  start() {
    if (!isInitialized) {
      netease.yidun.yidunService.init();
      this.console.log('SDK is not initialized, initialize it');
      isInitialized = true;
    } else {
      this.console.log('SDK alrady initialized');
    }
  },

  page1() {
    cc.director.loadScene('page1');
  },

  page2() {
    cc.director.loadScene('page2');
  },
});
