import React from "react";
import Instascan from "instascan";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cameras from "../../src/components/Cameras";

configure({ adapter: new Adapter() });
jest.mock("instascan");
jest.restoreAllMocks();

describe("<Cameras />", () => {
  const FrontCamera = { name: "Front-camera" };
  const BackCamera = { name: "Back-camera" };
  const fakeCameraSetup = [FrontCamera, BackCamera];
  const cameraError = new Error("Permision Denied");

  const mockGetCameras = ({ error }) => {
    Instascan.Camera.getCameras = jest.fn(
      () => (error ? Promise.reject(cameraError) : Promise.resolve(fakeCameraSetup))
    );
  };

  it("Should provide all the available cameras", () => {
    mockGetCameras({ error: false });
    shallow(<Cameras>{cameras => expect(cameras).toBe(fakeCameraSetup)}</Cameras>);
    expect(Instascan.Camera.getCameras).toHaveBeenCalled();
    expect.assertions(2);
  });

  it("Should provide an error in case of any exception", () => {
    mockGetCameras({ error: true });
    shallow(<Cameras>{error => expect(error).toBe(cameraError)}</Cameras>);
    expect.assertions(1);
  });
});
