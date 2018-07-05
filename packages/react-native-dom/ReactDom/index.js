/** @flow */

import "pepjs";
import "@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce";
import "web-animations-js/web-animations-next.min";

import RCTRootView from "RCTRootView";
import bundleFromRoot from "BundleFromRoot";
import type { NativeModuleImports } from "RCTModule";
import type { RCTUIManager as _RCTUIManager } from "RCTUIManager";
import RCTBridge, {
  RCTFunctionTypeNormal,
  RCTFunctionTypePromise,
  RCTFunctionTypeSync,
  RCT_EXPORT_METHOD,
  RCT_EXPORT_MODULE
} from "RCTBridge";
import UIView from "UIView";
import RCTView from "RCTView";
import RCTViewManager from "RCTViewManager";
import RCTEventEmitter from "RCTNativeEventEmitter";
import CustomElement from "CustomElement";
import RCTEventDispatcher, { type RCTEvent } from "RCTEventDispatcher";

declare var __DEV__: boolean;

global.process = global.process || {};
global.process.env = global.process.env || {};
if (!global.process.env.NODE_ENV) {
  global.process.env.NODE_ENV = __DEV__ ? "development" : "production";
}

// Export native modules to provide ability for others to provide their own modules
export {
  RCT_EXPORT_MODULE,
  RCT_EXPORT_METHOD,
  RCTFunctionTypeNormal,
  RCTFunctionTypePromise,
  RCTFunctionTypeSync,
  RCTView,
  RCTViewManager,
  RCTEventEmitter,
  UIView,
  CustomElement,
  RCTRootView
};

// Export type definitions useful for native module development
export type { RCTEventDispatcher, RCTBridge, RCTEvent };
export type RCTUIManager = _RCTUIManager;

// Register Built-in Native Modules
const builtInNativeModules: any[] = [
  require("RCTSourceCode"),
  require("RCTEventDispatcher"),
  require("RCTDeviceInfo"),
  require("RCTPlatform"),
  require("RCTTiming"),
  require("RCTUIManager"),
  require("RCTViewManager"),
  require("RCTTextManager"),
  require("RCTRawTextManager"),
  require("RCTScrollViewManager"),
  require("RCTScrollContentViewManager"),
  require("RCTNativeAnimatedModule"),
  require("RCTAsyncLocalStorage"),
  require("RCTImageViewManager"),
  require("RCTLinkingManager"),
  require("RCTTextInputManager"),
  require("RCTImageLoader"),
  require("RCTActivityIndicatorViewManager"),
  require("RCTWebSocketModule"),
  require("RCTAppState"),
  require("RCTSafeAreaViewManager"),
  require("RCTSwitchManager"),
  require("RCTStatusBarManager"),
  require("RCTDeviceEventManager"),
  require("RCTKeyboardObserver"),
  require("RCTExceptionsManager"),
  require("RCTRedBox"),
  require("RCTWebViewManager"),
  require("RCTNetworkingNative"),
  require("RCTBlobManager"),
  require("RCTVibration")
];

// Development Specific Native Modules
if (__DEV__) {
  builtInNativeModules.push(require("RCTDevLoadingView"));
  builtInNativeModules.push(require("RCTDevSettings"));
  builtInNativeModules.push(require("RCTDevMenu"));
}

type RNDomInstanceOptions = {
  enableHotReload?: boolean,
  nativeModules?: any[],
  bundleFromRoot?: boolean
};

// React Native Web Entrypoint instance
export class RNDomInstance {
  rootView: RCTRootView;

  constructor(
    bundle: string,
    moduleName: string,
    parent: HTMLElement,
    options: RNDomInstanceOptions = {}
  ) {
    const enableHotReload = options.enableHotReload
      ? options.enableHotReload
      : false;

    const userNativeModules = options.nativeModules
      ? options.nativeModules
      : [];

    const shouldBundleFromRoot = options.bundleFromRoot
      ? options.bundleFromRoot
      : true;

    this.rootView = new RCTRootView(
      shouldBundleFromRoot ? bundleFromRoot(bundle) : bundle,
      moduleName,
      parent,
      enableHotReload,
      (builtInNativeModules.concat(userNativeModules): NativeModuleImports)
    );
  }

  start() {
    this.rootView.render();
  }
}
