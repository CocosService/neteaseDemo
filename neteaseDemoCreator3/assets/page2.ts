import { _decorator, Component, sys, director } from 'cc';
const { ccclass, property } = _decorator;
import { Console } from './prefabs/console';
import { isIos } from './lib/os';

@ccclass('Page2')
export class Page2 extends Component {
  @property({ type: Console })
  console: Console = null!;

  private hasRegisterInfoReceiver = false;

  goBack() {
    director.loadScene('startup');
  }

  registInfoReceiver() {
    if (!this.hasRegisterInfoReceiver) {
      this.console.log('Register info receiver');
      netease.yidun.yidunService.registInfoReceiver((type, info) => {
        if (type === netease.yidun.NetHeartBeatInfoType.HeartBeat) {
          this.console.log('Receive heart beat:', info);
        } else if (type === netease.yidun.NetHeartBeatInfoType.EncHeartBeat) {
          this.console.log('Receive heart beat in encrypted form:', info);
          this.console.log('You need sending it to server for decryption');
        }
      });
      this.hasRegisterInfoReceiver = true;
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

  whetherWeatherPicked() {
    if (!isIos()) {
      this.console.log('Only supported on iOS');
      return;
    }

    const data = netease.yidun.yidunService.whetherWeatherPicked();
    this.console.log('whetherWeatherPicked, data:', data);
  }

  onDestroy() {
    netease.yidun.yidunService.clearInfoReceivers();
  }
}
