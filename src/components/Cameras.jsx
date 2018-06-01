import React, { PureComponent } from "react";
import { func } from "prop-types";
import Instascan from "instascan";

export default class Cameras extends PureComponent {
  static propTypes = {
    children: func.isRequired
  };

  _cameras = null;
  state = { ready: false };

  componentDidMount() {
    Instascan.Camera.getCameras().then(cameras => {
      this._cameras = cameras;
      this.setState({ ready: true });
    });
  }

  render() {
    return this.state.ready ? this.props.children(this._cameras) : null;
  }
}
