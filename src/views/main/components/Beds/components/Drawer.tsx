import * as React from "react";

import Threshold from "../../Threshold";

interface IProps {
  warningBeds: number;
  setWarningBeds: any;
  notifyWarningBeds: boolean;
  setNotifyWarningBeds: any;
  dangerBeds: number;
  setDangerBeds: any;
  notifyDangerBeds: boolean;
  setNotifyDangerBeds: any;
  visible: boolean;
}

const Component = ({
  warningBeds,
  setWarningBeds,
  notifyWarningBeds,
  setNotifyWarningBeds,
  dangerBeds,
  setDangerBeds,
  notifyDangerBeds,
  setNotifyDangerBeds,
  visible
}: IProps) => {
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <Threshold
        label="Avertissement lits"
        threshold={warningBeds}
        setThreshold={setWarningBeds}
        notify={notifyWarningBeds}
        setNotify={setNotifyWarningBeds}
      />
      <Threshold
        label="Danger lits"
        threshold={dangerBeds}
        setThreshold={setDangerBeds}
        notify={notifyDangerBeds}
        setNotify={setNotifyDangerBeds}
      />
    </div>
  );
};

export default Component;
