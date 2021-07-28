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

  htpIoctl() {
    if (!this.isAndroid()) {
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

  encodeAndDecodeLocal() {
    if (!this.isAndroid()) {
      this.console.log('Only supported on Android');
      return;
    }

    const inputData = 'Test text';
    this.console.log('Encode text:', inputData);
    const encodedData = netease.yidun.yidunService.encodeLocal(inputData);
    this.console.log('Encoded data:', encodedData);

    this.console.log('Decode text:', encodedData);
    const decodedData = netease.yidun.yidunService.decodeLocal(encodedData);
    this.console.log('Decoded data:', decodedData);
  }

  encodeAndDecodeLocalByte() {
    if (!this.isAndroid()) {
      this.console.log('Only supported on Android');
      return;
    }

    const inputBytes: number[] = [];
    for (let i = 0; i < 100; ++i) {
      // Generate 100 numbers that range between [-128, 127].
      // 生成100个范围在-128-127的数字。
      inputBytes.push(Math.floor(Math.random() * 256) - 128);
    }
    this.console.log('Encode bytes:', inputBytes);
    const encodedData = netease.yidun.yidunService.encodeLocalByte(inputBytes);
    this.console.log('Encoded bytes:', encodedData);

    this.console.log('Decode data:', encodedData);
    const decodedBytes = netease.yidun.yidunService.decodeLocalByte(
      encodedData
    );
    this.console.log('Decoded bytes:', decodedBytes);
  }

  isAndroid() {
    return sys.platform === sys.ANDROID;
  }
}
