import React from "react";
import { shallow } from "enzyme";
import Lines from "./index";

describe("Lines component", () => {
  it("Renders without crashing", () => {
    shallow(<Lines width={400} height={400} />);
  });
});
