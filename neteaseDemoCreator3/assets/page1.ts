import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;
import { Console } from './prefabs/console';
import { isAndroid, isIos } from './lib/os';

@ccclass('Page1')
export class Page1 extends Component {
  @property({ type: Console })
  console: Console = null!;

  start() {}

  goBack() {
    director.loadScene('startup');
  }

  setRoleInfo() {
    const roleId = '123456';
    const roleName = '易小盾';
    const roleAccount = 'yd@163.com';
    const roleServer = '游戏测试服';
    const serverId = 123; // Only used on Android
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
      serverId,
      JSON.stringify(gameJson)
    );
    this.console.log('setRoleInfo');
    this.console.log('roleId:', roleId);
    this.console.log('roleName:', roleName);
    this.console.log('roleAccount:', roleAccount);
    this.console.log('roleServer:', roleServer);
    this.console.log('serverId:', serverId);
    this.console.log('gameJson:', gameJson);
  }

  ioctl() {
    if (isAndroid()) {
      this.ioctlAndroid();
    } else if (isIos()) {
      this.ioctlIos();
    }
  }

  ioctlAndroid() {
    let requestCmdId = netease.yidun.RequestCmdIdAndroid.GetEmulatorName;
    this.console.log(
      'The name of the emulator:',
      netease.yidun.yidunService.ioctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.IsRootDevice;
    this.console.log(
      'Is root device:',
      netease.yidun.yidunService.ioctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.DeviceID;
    this.console.log(
      'DeviceID:',
      netease.yidun.yidunService.ioctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.GetHTPVersion;
    this.console.log(
      'HTP Version:',
      netease.yidun.yidunService.ioctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.GetCollectData;
    this.console.log(
      'Collection Data:',
      netease.yidun.yidunService
        .ioctlAndroid(requestCmdId, '')
        .substring(0, 100)
      // Collection data字符串太长了，打印在屏幕上会有点卡，这里截断一部分后再打印。
      // the collection data string is too long to display on screen, truncate it.
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.GetEncHTPVersion;
    this.console.log(
      'Encrypted HTP Version:',
      netease.yidun.yidunService.ioctlAndroid(requestCmdId, '')
    );
  }

  ioctlIos() {
    let requestCmdId = netease.yidun.RequestCmdIdIos.QuerySignInfo;
    this.console.log(
      'Sign info:',
      netease.yidun.yidunService.ioctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QueryRootStatus;
    this.console.log(
      'Root status:',
      netease.yidun.yidunService.ioctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QuerySDKVersion;
    this.console.log(
      'SDK Version:',
      netease.yidun.yidunService.ioctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QueryYiDunCode;
    this.console.log(
      'Yidun Code:',
      netease.yidun.yidunService.ioctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QueryYiDunID;
    this.console.log(
      'Yidun ID:',
      netease.yidun.yidunService.ioctlIos(requestCmdId, '')
    );
  }

  localSaveEncodeAndDecode() {
    if (!isAndroid()) {
      this.console.log('Only supported on Android');
      return;
    }

    const inputData = 'Test text';
    this.console.log('Encode text:', inputData);
    const encodedData = netease.yidun.yidunService.localSaveEncode(
      inputData,
      0
    );
    this.console.log('Encoded data:', encodedData);

    this.console.log('Decode text:', encodedData);
    const decodedData = netease.yidun.yidunService.localSaveDecode(
      encodedData,
      0
    );
    this.console.log('Decoded data:', decodedData);
  }

  localSaveBytesEncodeAndDecode() {
    if (!isAndroid()) {
      this.console.log('Only supported on Android');
      return;
    }

    const size = 100;
    const inputBytes = new Uint8Array(size);
    for (let i = 0; i < 100; ++i) {
      // Generate 100 numbers that range between [0, 255].
      // 生成100个范围在0-255的数字。
      inputBytes[i] = Math.floor(Math.random() * 256);
    }
    this.console.log('Encode bytes:', inputBytes);
    const encodedData = netease.yidun.yidunService.localSaveBytesEncode(
      inputBytes,
      0
    );
    this.console.log('Encoded bytes:', encodedData);

    this.console.log('Decode data:', encodedData);
    const decodedBytes = netease.yidun.yidunService.localSaveBytesDecode(
      encodedData,
      0
    );
    this.console.log('Decoded bytes:', decodedBytes);
  }

  successOpportunityComes() {
    if (!isIos()) {
      this.console.log('Only supported on iOS');
      return;
    }

    const roleId = '123456';
    const roleName = '易小盾';
    const roleAccount = 'yd@163.com';
    const roleServer = '游戏测试服';
    const reportDesc = '自瞄';
    const verificationSpan = 1;
    const reportType = netease.yidun.ReportType.Plug;
    netease.yidun.yidunService.successOpportunityComes(
      roleId,
      roleName,
      roleAccount,
      roleServer,
      reportDesc,
      verificationSpan,
      reportType
    );
    this.console.log('successOpportunityComes');
    this.console.log('roleId:', roleId);
    this.console.log('roleName:', roleName);
    this.console.log('roleAccount:', roleAccount);
    this.console.log('roleServer:', roleServer);
    this.console.log('reportDesc:', reportDesc);
    this.console.log('verificationSpan:', verificationSpan);
    this.console.log('reportType:', reportType);
  }
}
