import React from "react";

export default ({ ide, totalIde, aides, totalAides }) => {
  return (
    <div>
      <h3>IDE</h3>
      <div>
        Total: {ide}/{totalIde}
      </div>
      <div>Réanimation: 3/12</div>
      <div>Ratio 1:5</div>
      <div>Soins intensifs: 2/4</div>
      <div>Ratio 1:3</div>
      <h3>Aide soignant(e)s</h3>
      <div>
        Total: {aides}/{totalAides}
      </div>
      <div>Réanimation: 9/31</div>
      <div>Ratio 1:2</div>
    </div>
  );
};
