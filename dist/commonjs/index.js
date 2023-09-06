"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  check: true,
  checkLocationAccuracy: true,
  checkMultiple: true,
  checkNotifications: true,
  openLimitedPhotoLibraryPicker: true,
  openSettings: true,
  request: true,
  requestLocationAccuracy: true,
  requestMultiple: true,
  requestNotifications: true,
  PERMISSIONS: true,
  RESULTS: true
};
Object.defineProperty(exports, "PERMISSIONS", {
  enumerable: true,
  get: function () {
    return _permissions.PERMISSIONS;
  }
});
Object.defineProperty(exports, "RESULTS", {
  enumerable: true,
  get: function () {
    return _results.RESULTS;
  }
});
exports.requestNotifications = exports.requestMultiple = exports.requestLocationAccuracy = exports.request = exports.openSettings = exports.openLimitedPhotoLibraryPicker = exports.default = exports.checkNotifications = exports.checkMultiple = exports.checkLocationAccuracy = exports.check = void 0;
var _methods = require("./methods");
var _permissions = require("./permissions");
var _results = require("./results");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
const check = _methods.methods.check;
exports.check = check;
const checkLocationAccuracy = _methods.methods.checkLocationAccuracy;
exports.checkLocationAccuracy = checkLocationAccuracy;
const checkMultiple = _methods.methods.checkMultiple;
exports.checkMultiple = checkMultiple;
const checkNotifications = _methods.methods.checkNotifications;
exports.checkNotifications = checkNotifications;
const openLimitedPhotoLibraryPicker = _methods.methods.openLimitedPhotoLibraryPicker;
exports.openLimitedPhotoLibraryPicker = openLimitedPhotoLibraryPicker;
const openSettings = _methods.methods.openSettings;
exports.openSettings = openSettings;
const request = _methods.methods.request;
exports.request = request;
const requestLocationAccuracy = _methods.methods.requestLocationAccuracy;
exports.requestLocationAccuracy = requestLocationAccuracy;
const requestMultiple = _methods.methods.requestMultiple;
exports.requestMultiple = requestMultiple;
const requestNotifications = _methods.methods.requestNotifications;
exports.requestNotifications = requestNotifications;
var _default = {
  PERMISSIONS: _permissions.PERMISSIONS,
  RESULTS: _results.RESULTS,
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
exports.default = _default;
//# sourceMappingURL=index.js.map