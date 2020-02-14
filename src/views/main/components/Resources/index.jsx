import { ProgressBar } from "@blueprintjs/core";
import React from "react";

export default ({ ide, totalIde, aides, totalAides }) => {
  return (
    <div>
      <h3>IDE</h3>
      <div>
        Total: {ide}/{totalIde}
        <ProgressBar intent={"danger"} stripes={false} value={ide / totalIde} />
      </div>
      <div>
        Réanimation: 3/12
        <ProgressBar intent={"success"} stripes={false} value={3 / 12} />
      </div>
      <div>Ratio 1:5</div>
      <div>
        Soins intensifs: 2/4
        <ProgressBar intent={"success"} stripes={false} value={2 / 4} />
      </div>
      <div>Ratio 1:3</div>
      <h3>Aide soignant(e)s</h3>
      <div>
        Total: {aides}/{totalAides}
        <ProgressBar
          intent={"warning"}
          stripes={false}
          value={aides / totalAides}
        />
      </div>
      <div>
        Réanimation: 9/31
        <ProgressBar intent={"success"} stripes={false} value={9 / 31} />
      </div>
      <div>Ratio 1:2</div>
    </div>
  );
};
