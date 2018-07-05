import React, { PureComponent } from "react";
import { func } from "prop-types";
import Instascan from "instascan-umd";

export default class Cameras extends PureComponent {
  static propTypes = {
    children: func.isRequired
  };

  _cameras = null;
  state = { ready: false };

  componentDidMount() {
    Instascan.Camera.getCameras()
      .then(cameras => {
        this._cameras = cameras;
        this.setState({ ready: true });
      })
      .catch(err => this.props.children(err));
  }

  render() {
    return this.state.ready ? this.props.children(this._cameras) : null;
  }
}
