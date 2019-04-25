import {
  Alignment,
  ControlGroup,
  FormGroup,
  Icon,
  NumericInput,
  Switch,
  Tag
} from "@blueprintjs/core";
import * as React from "react";

interface IProps {
  label: string;
  threshold: number;
  setThreshold: any;
  notify: boolean;
  setNotify: any;
}

const Threshold = ({
  label,
  threshold,
  setThreshold,
  notify,
  setNotify
}: IProps) => {
  return (
    <FormGroup label={label} inline>
      <ControlGroup vertical={false}>
        <NumericInput
          value={threshold}
          onValueChange={(valueAsNumber: number, valueAsString: string) => {
            setThreshold(valueAsNumber);
          }}
        />
        <Tag large minimal>
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
        </Tag>
      </ControlGroup>
    </FormGroup>
  );
};

export default Threshold;
