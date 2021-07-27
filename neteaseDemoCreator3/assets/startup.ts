import { _decorator, Component, sys } from 'cc';
const { ccclass, property } = _decorator;
import { Console } from './prefabs/console';

@ccclass('Startup')
export class Startup extends Component {
  @property({ type: Console })
  console: Console = null!;

  static isInitialized = false;

  start() {
    if (!Startup.isInitialized) {
      netease.yidun.yidunService.init();
      this.console.log('SDK is not initialized, initialize it');
      Startup.isInitialized = true;
    } else {
      this.console.log('SDK alrady initialized');
    }
  }

  setRoleInfo() {
    const roleId = '123456';
    const roleName = '易小盾';
    const roleAccount = 'yd@163.com';
    const roleServer = '游戏测试服';
    const gameJson = {
      GameVersion: '1.0.1',
      AssetVersion: '1.0.1',
      TransHost: 'test.163.com',
      TransIP: '8.8.8.8',
      TransPort: 80,
    };
    netease.yidun.yidunService.setRoleInfo(
      roleId,
      roleName,
      roleAccount,
      roleServer,
      JSON.stringify(gameJson)
    );
    this.console.log('setRoleInfo');
    this.console.log('roleId:', roleId);
    this.console.log('roleName:', roleName);
    this.console.log('roleAccount:', roleAccount);
    this.console.log('roleServer:', roleServer);
    this.console.log('gameJson:', gameJson);
  }

  async htpIoctl() {
    if (sys.platform !== sys.ANDROID) {
      this.console.log('Only supported on Android');
      return;
    }

    let requestCmdID = netease.yidun.RequestCmdID.GetEmulatorName;
    this.console.log(
      'The name of the emulator:',
      netease.yidun.yidunService.htpIoctl(requestCmdID, '')
    );

    requestCmdID = netease.yidun.RequestCmdID.IsRootDevice;
    this.console.log(
      'Is root device:',
      netease.yidun.yidunService.htpIoctl(requestCmdID, '')
    );

    requestCmdID = netease.yidun.RequestCmdID.DeviceID;
    this.console.log(
      'DeviceID:',
      netease.yidun.yidunService.htpIoctl(requestCmdID, '')
    );

    requestCmdID = netease.yidun.RequestCmdID.GetHTPVersion;
    this.console.log(
      'HTP Version:',
      netease.yidun.yidunService.htpIoctl(requestCmdID, '')
    );

    requestCmdID = netease.yidun.RequestCmdID.GetEncHTPVersion;
    this.console.log(
      'Encrypted HTP Version:',
      netease.yidun.yidunService.htpIoctl(requestCmdID, '')
    );
  }
}
