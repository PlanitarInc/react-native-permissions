import { Alert } from 'react-native';
import NativeModule from './NativePermissionsModule';
import { checkLocationAccuracy, openLimitedPhotoLibraryPicker, requestLocationAccuracy } from './unsupportedPlatformMethods';
import { platformVersion, uniq } from './utils';
const TIRAMISU_VERSION_CODE = 33;
async function openSettings() {
  await NativeModule.openSettings();
}
function check(permission) {
  return NativeModule.checkPermission(permission);
}
async function request(permission, rationale) {
  if (rationale) {
    const shouldShowRationale = await NativeModule.shouldShowRequestPermissionRationale(permission);
    if (shouldShowRationale) {
      const {
        title,
        message,
        buttonPositive,
        buttonNegative,
        buttonNeutral
      } = rationale;
      return new Promise(resolve => {
        const buttons = [];
        if (buttonNegative) {
          const onPress = () => resolve(NativeModule.checkPermission(permission));
          buttonNeutral && buttons.push({
            text: buttonNeutral,
            onPress
          });
          buttons.push({
            text: buttonNegative,
            onPress
          });
        }
        buttons.push({
          text: buttonPositive,
          onPress: () => resolve(NativeModule.requestPermission(permission))
        });
        Alert.alert(title, message, buttons, {
          cancelable: false
        });
      });
    }
  }
  return NativeModule.requestPermission(permission);
}
async function checkNotifications() {
  if (platformVersion < TIRAMISU_VERSION_CODE) {
    return NativeModule.checkNotifications();
  }
  const status = await check('android.permission.POST_NOTIFICATIONS');
  return {
    status,
    settings: {}
  };
}
async function requestNotifications() {
  if (platformVersion < TIRAMISU_VERSION_CODE) {
    return NativeModule.checkNotifications();
  }
  const status = await request('android.permission.POST_NOTIFICATIONS');
  return {
    status,
    settings: {}
  };
}
function checkMultiple(permissions) {
  const dedup = uniq(permissions);
  return NativeModule.checkMultiplePermissions(dedup);
}
function requestMultiple(permissions) {
  const dedup = uniq(permissions);
  return NativeModule.requestMultiplePermissions(dedup);
}
export const methods = {
  check,
  checkLocationAccuracy,
  checkMultiple,
  checkNotifications,
  openLimitedPhotoLibraryPicker,
  openSettings,
  request,
  requestLocationAccuracy,
  requestMultiple,
  requestNotifications
};
//# sourceMappingURL=methods.android.js.map