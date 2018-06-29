import React from "react";
import Instascan from "instascan";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Scanner from "../../src/components/Scanner";

jest.restoreAllMocks();
configure({ adapter: new Adapter() });
jest.mock("instascan");

describe("<Scanner />", () => {
  const getInstance = (idx = 0) => Instascan.Scanner.instances[idx];
  const getLastInstance = () => getInstance(Instascan.Scanner.instances.length - 1);

  const opts = { foo: "bar" };
  const fakeCamera = { name: "frontCamera", stop: jest.fn() };

  it("Should pass property as options to Instascan.Scanner", () => {
    mount(
      <Scanner camera={fakeCamera} options={opts}>
        <video />
      </Scanner>
    );

    const { getOptions } = getLastInstance().__mock__;
    expect(Instascan.Scanner).toHaveBeenCalledWith(getOptions());
  });

  it("Should not start video on mount if stop is given, and vice versa", () => {
    const onScan = jest.fn();
    const scannerFactory = (stop = false) => (
      <Scanner onScan={onScan} stop={stop} camera={fakeCamera}>
        <video />
      </Scanner>
    );

    mount(scannerFactory(true));
    expect(onScan).not.toHaveBeenCalled();

    mount(scannerFactory(false));
    expect(onScan).toHaveBeenCalled();
  });

  it("Should remove all listeners on un-mount", () => {
    const wrapper = mount(
      <Scanner camera={fakeCamera}>
        <video />
      </Scanner>
    );
    const mockedScanner = getLastInstance();
    mockedScanner.removeAllListeners = jest.fn();

    wrapper.unmount();
    expect(mockedScanner.removeAllListeners).toHaveBeenCalled();
    expect(fakeCamera.stop).toHaveBeenCalled();
  });

  describe("Starting and stoping camera", () => {
    it("Should be able to stop the camera", () => {
      const onStop = jest.fn();
      const wrapper = mount(
        <Scanner camera={fakeCamera} stop={false} onStop={onStop}>
          <video />
        </Scanner>
      );

      wrapper.setProps({ stop: true });
      process.nextTick(() => expect(onStop).toHaveBeenCalled());
    });

    it("Should be able to start the camera", () => {
      const onStart = jest.fn();
      const wrapper = mount(
        <Scanner camera={fakeCamera} stop={true} onStart={onStart}>
          <video />
        </Scanner>
      );
      wrapper.setProps({ stop: false });
      process.nextTick(() => expect(onStart).toHaveBeenCalledWith(fakeCamera));
    });
  });
});
