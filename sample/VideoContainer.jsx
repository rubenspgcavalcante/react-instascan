import React from "react";
import { bool, node } from "prop-types";
import { Cameras, Scanner } from "../src";

const onScan = res => console.log(res);

const VideoContainer = ({ children, stop }) => (
  <div>
    <Cameras>
      {cameras => (
        <Scanner camera={cameras[0]} stop={stop} onScan={onScan}>
          <video style={{ width: 400, height: 400 }} id="scanner" />
        </Scanner>
      )}
    </Cameras>
    {children}
  </div>
);

VideoContainer.propTypes = {
  children: node,
  stop: bool
};

export default VideoContainer;
