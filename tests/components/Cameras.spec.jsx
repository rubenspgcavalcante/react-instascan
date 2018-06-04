import React from "react";
import Instascan from "instascan";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cameras from "../../src/components/Cameras";

configure({ adapter: new Adapter() });
jest.mock("instascan");

describe("<Cameras />", () => {
  const FrontCamera = { name: "Front-camera" };
  const BackCamera = { name: "Back-camera" };
  const fakeCameraSetup = [FrontCamera, BackCamera];

  beforeEach(() => {
    Instascan.Camera.getCameras = jest.fn(() => Promise.resolve(fakeCameraSetup));
  });

  it("Should provide all the available cameras", () => {
    shallow(<Cameras>{cameras => expect(cameras).toBe(fakeCameraSetup)}</Cameras>);
    expect(Instascan.Camera.getCameras).toHaveBeenCalled();
    expect.assertions(2);
  });
});
