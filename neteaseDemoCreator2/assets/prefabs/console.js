cc.Class({
  extends: cc.Component,

  properties: {
    item: cc.Node,
    scrollView: cc.ScrollView,
  },

  log(...args) {
    this.scheduleOnce(() => {
      const { item, str } = this.addItem(null, ...args);
      if (item) cc.log(str);
    });
  },

  error(...args) {
    this.scheduleOnce(() => {
      const { item, str } = this.addItem(({ label }) => {
        label.color = cc.color(255, 0, 0);
      }, ...args);
      if (item) cc.error(str);
    });
  },

  clear() {
    const scrollContent = this.getScrollContent();
    if (scrollContent) scrollContent.removeAllChildren();
  },

  addItem(onBuildItem, ...args) {
    const msgs = args.map((arg) => {
      if (arg === null) {
        return 'null';
      }
      if (arg === undefined) {
        return 'undefined';
      }
      if (
        arg.toString().startsWith('[object ') ||
        arg.toString() === 'object'
      ) {
        return JSON.stringify(arg);
      }
      return arg.toString();
    });
    const str = msgs.join(' ');

    const item = cc.instantiate(this.item);
    const label = item.getComponent(cc.Label);
    if (!label) {
      cc.log('Cannot get the label component of item');
      return { item: null, str: '' };
    }
    label.string = str;
    item.active = true;

    if (onBuildItem) onBuildItem({ item, label });

    const scrollContent = this.getScrollContent();
    if (scrollContent) scrollContent.addChild(item);
    this.scrollView.scrollToBottom(0.5);

    return { item, str };
  },

  getScrollContent() {
    if (!this.scrollView.content) {
      cc.log('Cannot get the content component of scroll view');
      return null;
    }
    return this.scrollView.content;
  },
});
