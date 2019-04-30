import {
  Alignment,
  Icon,
  Label,
  NumericInput,
  Switch,
  Tag
} from "@blueprintjs/core";
import * as React from "react";

import "./style.less";

interface IProps {
  danger?: boolean;
  warning?: boolean;
  label: string;
  threshold: number;
  setThreshold: any;
  notify: boolean;
  setNotify: any;
}

const Threshold = ({
  danger,
  warning,
  label,
  threshold,
  setThreshold,
  notify,
  setNotify
}: IProps) => {
  return (
    <div
      className={`threshold-group ${danger ? "danger" : ""} ${
        warning ? "warning" : ""
      }`}
    >
      <div className="value">
        <Label>{label}</Label>
        <NumericInput
          value={threshold}
          onValueChange={(valueAsNumber: number, valueAsString: string) => {
            setThreshold(valueAsNumber);
          }}
        />
      </div>
      <div className={`notifications ${notify ? "checked" : ""}`}>
        <Switch
          alignIndicator={Alignment.RIGHT}
          checked={notify}
          large
          onChange={(event: React.FormEvent<HTMLElement>) => {
            setNotify((currentNotify: boolean) => !currentNotify);
          }}
        >
          <Icon icon="notifications" />
        </Switch>
      </div>
    </div>
  );
};

export default Threshold;
