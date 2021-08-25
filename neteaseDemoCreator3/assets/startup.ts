import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;
import { Console } from './prefabs/console';

@ccclass('Startup')
export class Startup extends Component {
  @property({ type: Console })
  console: Console = null!;

  private static isInitialized = false;

  start() {
    if (!Startup.isInitialized) {
      netease.yidun.yidunService.init();
      this.console.log('SDK is not initialized, initialize it');
      Startup.isInitialized = true;
    } else {
      this.console.log('SDK alrady initialized');
    }
  }

  page1() {
    director.loadScene('page1');
  }

  page2() {
    director.loadScene('page2');
  }
}
