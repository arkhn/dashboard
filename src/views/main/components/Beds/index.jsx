import { ProgressBar } from "@blueprintjs/core";
import React from "react";

export default ({ beds, totalBeds }) => {
  return (
    <div>
      <div>
        Total: {beds} / {totalBeds}
        <ProgressBar
          intent={"warning"}
          stripes={false}
          value={beds / totalBeds}
        />
      </div>
      <h3>Critiques</h3>
      <div>
        Surveillance continue: 12/15
        <ProgressBar intent={"warning"} stripes={false} value={12 / 15} />
      </div>
      <div>
        Réanimation: 5/8
        <ProgressBar intent={"success"} stripes={false} value={5 / 8} />
      </div>
      <div>
        Soins intensifs: 2/4
        <ProgressBar intent={"success"} stripes={false} value={2 / 4} />
      </div>
    </div>
  );
};
