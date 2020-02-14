import React from "react";
import { shallow } from "enzyme";
import Threshold from "./index";

describe("Threshold component", () => {
  it("Renders without crashing", () => {
    shallow(
      <Threshold
        danger
        label="test"
        threshold={80}
        setThreshold={() => {}}
        notify={true}
        setNotify={() => {}}
      />
    );
  });
});
