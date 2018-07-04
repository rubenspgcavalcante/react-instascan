import React, { Children, cloneElement, Component, createRef } from "react";
import { bool, func, node, object } from "prop-types";
import Instascan from "instascan";
import nil from "../utils/nil";

export default class Scanner extends Component {
  displayName = "Scanner";

  static propTypes = {
    children: node.isRequired,
    camera: object.isRequired,
    onStart: func,
    onStop: func,
    onScan: func,
    onActive: func,
    onInactive: func,
    stop: bool,
    options: object
  };

  _scanner = null;
  _ref = null;

  shouldComponentUpdate({ stop, onStart = nil, onStop = nil, camera }) {
    if (this._scanner) {
      stop
        ? this._scanner
            .stop()
            .then(onStop)
            .catch(onStop)
        : this._scanner
            .start(camera)
            .then(onStart)
            .catch(onStart);
    }

    return false;
  }

  componentDidMount() {
    const {
      options = {},
      camera,
      stop,
      onScan = nil,
      onActive = nil,
      onInactive = nil
    } = this.props;

    this._scanner = new Instascan.Scanner({ ...options, video: this._ref.current });
    if (!stop) {
      this._scanner.addListener("scan", onScan);
    }
    this._scanner.addListener("active", onActive);
    this._scanner.addListener("inactive", onInactive);

    this._scanner.start(camera);
  }

  componentWillUnmount() {
    this._scanner.removeAllListeners();
    this._scanner.stop();
  }

  render() {
    const child = Children.only(this.props.children);
    this._ref = createRef();

    return cloneElement(child, { ref: this._ref });
  }
}
