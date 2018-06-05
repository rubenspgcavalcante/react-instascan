import React from "react";
import Instascan from "instascan";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Scanner from "../../src/components/Scanner";

jest.restoreAllMocks();
configure({ adapter: new Adapter() });
jest.mock("instascan");

describe("<Scanner />", () => {
  const opts = { foo: "bar" };
  const fakeCamera = { name: "frontCamera" };

  it("Should pass property as options to Instascan.Scanner", () => {
    mount(
      <Scanner camera={fakeCamera} options={opts}>
        <video />
      </Scanner>
    );

    const { getOptions } = Instascan.Scanner.instances[0].__mock__;
    expect(Instascan.Scanner).toHaveBeenCalledWith(getOptions());
  });
});
