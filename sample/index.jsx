import React, { PureComponent } from "react";
import { render } from "react-dom";

import VideoContainer from "./VideoContainer";

const App = class extends PureComponent {
  displayName = "App";
  state = { stop: false };

  render() {
    const { stop } = this.state;

    return (
      <VideoContainer stop={this.state.stop}>
        <button onClick={() => this.setState({ stop: !stop })}>{stop ? "Start" : "Stop"}</button>
      </VideoContainer>
    );
  }
};

render(<App />, document.getElementById("app"));
