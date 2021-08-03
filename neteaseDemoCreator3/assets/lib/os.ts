import { sys } from 'cc';

export function isAndroid() {
  return sys.platform === sys.ANDROID;
}

export function isIos() {
  return sys.platform === sys.IPAD || sys.platform === sys.IPHONE;
}
