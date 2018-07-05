/** @flow */
import type { Frame } from "InternalLib";
import UIView from "UIView";
import type RCTBridge from "RCTBridge";
import RCTEventEmitter from "RCTNativeEventEmitter";
import CustomElement from "CustomElement";

@CustomElement("rct-view")
class RCTView extends UIView {
  bridge: RCTBridge;
  onLayout: ?Function;

  constructor(bridge: RCTBridge) {
    super();
    this.bridge = bridge;
  }

  get frame(): Frame {
    return super.frame;
  }

  set frame(value: Frame) {
    super.frame = value;

    if (this.onLayout) {
      this.onLayout({
        layout: {
          x: value.left,
          y: value.top,
          width: value.width,
          height: value.height
        }
      });
    }
  }

  // TODO: Renable when I have a plan for focus styling
  // set accessible(value: boolean) {
  //   this.tabIndex = 0;
  // }
}

export default RCTView;
