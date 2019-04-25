import { ParentSize } from "@vx/responsive";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { width, height } = this.props;
    return (
      <ParentSize className="graph-container">
        {({ width: w, height: h }) => {
          return (
            <Lines
              width={w}
              height={h}
              margin={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
          );
        }}
      </ParentSize>
    );
  }
}
