import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;
import { Console } from './prefabs/console';
import { isAndroid, isIos } from './lib/os';

@ccclass('Page1')
export class Page1 extends Component {
  @property({ type: Console })
  console: Console = null!;

  private static hasSetRoleInfo = false;
  private static hasRegisterInfoReceiver = false;
  private static previousViewDetailStarType: netease.yidun.ViewDetailStarType | null = null;

  start() {
    if (Page1.previousViewDetailStarType == null)
      Page1.previousViewDetailStarType =
        netease.yidun.ViewDetailStarType.ChinaMainland;
  }

  goBack() {
    director.loadScene('startup');
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
    Page1.hasSetRoleInfo = true;
    this.console.log('setRoleInfo');
    this.console.log('roleId:', roleId);
    this.console.log('roleName:', roleName);
    this.console.log('roleAccount:', roleAccount);
    this.console.log('roleServer:', roleServer);
    this.console.log('gameJson:', gameJson);
  }

  async changeViewDetailStar() {
    if (!isIos()) {
      this.console.log('Only supported on iOS');
      return;
    }
    if (
      Page1.previousViewDetailStarType ===
      netease.yidun.ViewDetailStarType.ChinaMainland
    ) {
      const viewDetailStar = netease.yidun.ViewDetailStarType.Other;
      netease.yidun.yidunService.changeViewDetailStar(viewDetailStar);
      Page1.previousViewDetailStarType = viewDetailStar;
      this.console.log('changeViewDetailStar to Other');
    } else {
      const viewDetailStar = netease.yidun.ViewDetailStarType.ChinaMainland;
      netease.yidun.yidunService.changeViewDetailStar(viewDetailStar);
      Page1.previousViewDetailStarType = viewDetailStar;
      this.console.log('changeViewDetailStar to ChinaMainland');
    }
  }

  htpIoctl() {
    if (isAndroid()) {
      this.htpIoctlAndroid();
    } else if (isIos()) {
      this.htpIoctlIos();
    }
  }

  htpIoctlAndroid() {
    let requestCmdId = netease.yidun.RequestCmdIdAndroid.GetEmulatorName;
    this.console.log(
      'The name of the emulator:',
      netease.yidun.yidunService.htpIoctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.IsRootDevice;
    this.console.log(
      'Is root device:',
      netease.yidun.yidunService.htpIoctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.DeviceID;
    this.console.log(
      'DeviceID:',
      netease.yidun.yidunService.htpIoctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.GetHTPVersion;
    this.console.log(
      'HTP Version:',
      netease.yidun.yidunService.htpIoctlAndroid(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdAndroid.GetEncHTPVersion;
    this.console.log(
      'Encrypted HTP Version:',
      netease.yidun.yidunService.htpIoctlAndroid(requestCmdId, '')
    );
  }

  htpIoctlIos() {
    let requestCmdId = netease.yidun.RequestCmdIdIos.QuerySignInfo;
    this.console.log(
      'Sign info:',
      netease.yidun.yidunService.htpIoctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QueryRootStatus;
    this.console.log(
      'Root status:',
      netease.yidun.yidunService.htpIoctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QuerySDKVersion;
    this.console.log(
      'SDK Version:',
      netease.yidun.yidunService.htpIoctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QueryYiDunCode;
    this.console.log(
      'Yidun Code:',
      netease.yidun.yidunService.htpIoctlIos(requestCmdId, '')
    );

    requestCmdId = netease.yidun.RequestCmdIdIos.QueryYiDunID;
    this.console.log(
      'Yidun ID:',
      netease.yidun.yidunService.htpIoctlIos(requestCmdId, '')
    );
  }

  encodeAndDecodeLocal() {
    if (!isAndroid()) {
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
    const encodedData = netease.yidun.yidunService.encodeLocalByte(inputBytes);
    this.console.log('Encoded bytes:', encodedData);

    this.console.log('Decode data:', encodedData);
    const decodedBytes = netease.yidun.yidunService.decodeLocalByte(
      encodedData
    );
    this.console.log('Decoded bytes:', decodedBytes);
  }

  impIoctl() {
    if (!isAndroid()) {
      this.console.log('Only supported on Android');
      return;
    }

    if (!Page1.hasSetRoleInfo) {
      this.console.log(
        'Please press the setRoleInfo button before press this button'
      );
      return;
    }

    netease.yidun.yidunService.impIoctl();
    this.console.log('impIoctl');
  }

  registInfoReceiver() {
    if (!Page1.hasRegisterInfoReceiver) {
      this.console.log('Register info receiver');
      netease.yidun.yidunService.registInfoReceiver((type, info) => {
        if (type === netease.yidun.NetHeartBeatInfoType.HeartBeat) {
          this.console.log('Receive heart beat:', info);
        } else if (type === netease.yidun.NetHeartBeatInfoType.EncHeartBeat) {
          this.console.log('Receive heart beat in encrypted form:', info);
          this.console.log('You need sending it to server for decryption');
        }
      });
      Page1.hasRegisterInfoReceiver = true;
    } else {
      this.console.log('Info receiver already registered');
    }
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
