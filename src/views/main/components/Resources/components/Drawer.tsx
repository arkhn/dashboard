import * as React from "react";

import Threshold from "../../Threshold";

interface IProps {
  warningIde: number;
  setWarningIde: any;
  notifyWarningIde: boolean;
  setNotifyWarningIde: any;
  dangerIde: number;
  setDangerIde: any;
  notifyDangerIde: boolean;
  setNotifyDangerIde: any;
  warningAides: number;
  setWarningAides: any;
  notifyWarningAides: boolean;
  setNotifyWarningAides: any;
  dangerAides: number;
  setDangerAides: any;
  notifyDangerAides: boolean;
  setNotifyDangerAides: any;
  visible: boolean;
}

const Component = ({
  warningIde,
  setWarningIde,
  notifyWarningIde,
  setNotifyWarningIde,
  dangerIde,
  setDangerIde,
  notifyDangerIde,
  setNotifyDangerIde,
  warningAides,
  setWarningAides,
  notifyWarningAides,
  setNotifyWarningAides,
  dangerAides,
  setDangerAides,
  notifyDangerAides,
  setNotifyDangerAides,
  visible
}: IProps) => {
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <Threshold
        warning
        label="Avertissement IDE"
        threshold={warningIde}
        setThreshold={setWarningIde}
        notify={notifyWarningIde}
        setNotify={setNotifyWarningIde}
      />
      <Threshold
        danger
        label="Danger IDE"
        threshold={dangerIde}
        setThreshold={setDangerIde}
        notify={notifyDangerIde}
        setNotify={setNotifyDangerIde}
      />
      <Threshold
        warning
        label="Avertissement Aides"
        threshold={warningAides}
        setThreshold={setWarningAides}
        notify={notifyWarningAides}
        setNotify={setNotifyWarningAides}
      />
      <Threshold
        danger
        label="Danger Aides"
        threshold={dangerAides}
        setThreshold={setDangerAides}
        notify={notifyDangerAides}
        setNotify={setNotifyDangerAides}
      />
    </div>
  );
};

export default Component;
