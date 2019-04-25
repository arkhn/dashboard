import {
  Alignment,
  Button,
  Drawer,
  MenuItem,
  Navbar,
  NumericInput
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import * as React from "react";

import "./style.less";

import Bar from "../../components/bar";
import BarGroup from "../../components/barGroup";
import Lines from "../../components/lines";
import ResponsiveLines from "../../components/responsiveLines";

import Admissions from "./components/Admissions";
import Beds from "./components/Beds";
import Bloc from "./components/Bloc";
import Consultations from "./components/Consultations";
import Gestes from "./components/Gestes";
import GestesRevenu from "./components/GestesRevenu";
import Resources from "./components/Resources";

const arkhnLogoWhite = require("../../assets/img/arkhn_logo_only_white.svg");

export interface IViewProps {}

interface IState {
  drawerComponent: any;
  isOpen: boolean;
  service: string;
}

const MainView = () => {
  const [service, setService] = React.useState("Gériatrie");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerComponent, setDrawerComponent] = React.useState(null);

  const [beds, setBeds] = React.useState(445);
  const [totalBeds, setTotalBeds] = React.useState(500);
  const [warningBeds, setWarningBeds] = React.useState(400);
  const [dangerBeds, setDangerBeds] = React.useState(480);

  const [ide, setIde] = React.useState(102);
  const [totalIde, setTotalIde] = React.useState(108);
  const [warningIde, setWarningIde] = React.useState(80);
  const [dangerIde, setDangerIde] = React.useState(100);

  const [aides, setAides] = React.useState(87);
  const [totalAides, setTotalAides] = React.useState(113);
  const [warningAides, setWarningAides] = React.useState(90);
  const [dangerAides, setDangerAides] = React.useState(100);

  const handleOpen = (component: any) => {
    setDrawerComponent(component);
    setDrawerOpen(true);
  };

  const ServiceSelect = Select.ofType<string>();

  return (
    <div>
      <Drawer
        icon="info-sign"
        isOpen={drawerOpen}
        onClose={(event: any) => {
          setDrawerOpen(false);
        }}
        title="Configuration"
      >
        <div>{drawerComponent}</div>
      </Drawer>

      <Navbar id="navbar" className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <span dangerouslySetInnerHTML={{ __html: arkhnLogoWhite }} />
            <h2>DASHBOARD</h2>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <ServiceSelect
            items={[
              "Gériatrie",
              "Paliatif",
              "Urgences",
              "Orthopédie",
              "Réanimation"
            ]}
            itemRenderer={(item: string, { handleClick, modifiers }: any) => (
              <MenuItem key={item} onClick={handleClick} text={item} />
            )}
            onItemSelect={(item: string, event: any) => {
              setService(item);
            }}
          >
            <Button icon="office" rightIcon="caret-down" text={service} />
          </ServiceSelect>
        </Navbar.Group>
      </Navbar>

      <div id="dashboard">
        <div id="admissions" className="dashboard-module">
          <Admissions />
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(null);
            }}
          />
        </div>
        <div
          id="beds"
          className={`dashboard-module ${
            beds >= warningBeds ? "warning" : ""
          } ${beds >= dangerBeds ? "danger" : ""}`}
        >
          <div className="title">Occupation des lits</div>
          <Beds beds={beds} totalBeds={totalBeds} />
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(
                <div>
                  <NumericInput
                    value={warningBeds}
                    onValueChange={(
                      valueAsNumber: number,
                      valueAsString: string
                    ) => {
                      setWarningBeds(valueAsNumber);
                    }}
                  />
                  <NumericInput
                    value={dangerBeds}
                    onValueChange={(
                      valueAsNumber: number,
                      valueAsString: string
                    ) => {
                      setDangerBeds(valueAsNumber);
                    }}
                  />
                </div>
              );
            }}
          />
        </div>
        <div id="bloc" className="dashboard-module">
          <div className="title">Bloc opératoire</div>
          <Bloc />
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(null);
            }}
          />
        </div>
        <div id="service" className="dashboard-module">
          <div className="title">Patients Hébergés Hors Service</div>
          <div className="value primary">2</div>
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(null);
            }}
          />
        </div>
        <div id="sejour" className="dashboard-module">
          <div className="title">Durée Moyenne de Séjour</div>
          <div className="value">5 jours 13 h</div>
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(null);
            }}
          />
        </div>
        <div id="consultations" className="dashboard-module">
          <div className="title">Consultations</div>
          <Consultations />
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(null);
            }}
          />
        </div>
        <div
          id="rh"
          className={`dashboard-module ${
            ide >= warningIde || aides >= warningAides ? "warning" : ""
          } ${ide >= dangerIde || aides >= dangerAides ? "danger" : ""}`}
        >
          <div className="title">Ressources Humaines</div>
          <Resources
            ide={ide}
            totalIde={totalIde}
            aides={aides}
            totalAides={totalAides}
          />
          <Button
            className="requestButton"
            minimal
            icon="cog"
            onClick={(event: any) => {
              handleOpen(
                <div>
                  <NumericInput
                    value={warningIde}
                    onValueChange={(
                      valueAsNumber: number,
                      valueAsString: string
                    ) => {
                      setWarningIde(valueAsNumber);
                    }}
                  />
                  <NumericInput
                    value={dangerIde}
                    onValueChange={(
                      valueAsNumber: number,
                      valueAsString: string
                    ) => {
                      setDangerIde(valueAsNumber);
                    }}
                  />
                  <NumericInput
                    value={warningAides}
                    onValueChange={(
                      valueAsNumber: number,
                      valueAsString: string
                    ) => {
                      setWarningAides(valueAsNumber);
                    }}
                  />
                  <NumericInput
                    value={dangerAides}
                    onValueChange={(
                      valueAsNumber: number,
                      valueAsString: string
                    ) => {
                      setDangerAides(valueAsNumber);
                    }}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainView;
