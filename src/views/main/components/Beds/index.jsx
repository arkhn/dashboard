import React from "react";

export default ({ beds, totalBeds }) => {
  return (
    <div>
      <div>
        Total: {beds} / {totalBeds}
      </div>
      <h3>Critiques</h3>
      <div>Surveillance continue: 12/15</div>
      <div>Réanimation: 5/8</div>
      <div>Soins intensifs: 2/4</div>
    </div>
  );
};
