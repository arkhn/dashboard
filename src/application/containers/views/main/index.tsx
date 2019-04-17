import { Alignment, Button, Drawer, MenuItem, Navbar } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import * as React from "react";

import "./style.less";

import Bar from "../../../components/bar";
import BarGroup from "../../../components/barGroup";
import Lines from "../../../components/lines";
import ResponsiveLines from "../../../components/responsiveLines";

import Admissions from "./components/admissions";
import Gestes from "./components/gestes2";
import GestesRevenu from "./components/gestes";

const arkhnLogoWhite = require("../../../../assets/img/arkhn_logo_only_white.svg");

export interface IViewProps {}

interface IState {
  fhirRequest: string;
  isOpen: boolean;
  service: string;
}

export default class MainView extends React.Component<IViewProps, IState> {
  constructor(props: IViewProps) {
    super(props);
    this.state = {
      fhirRequest: null,
      isOpen: false,
      service: "Gériatrie"
    };
  }

  handleOpen = (request: any) => {
    this.setState({
      fhirRequest: request,
      isOpen: true
    });
  };

  public render = () => {
    const attenteRequest = `
bonjour
      `;

    const ServiceSelect = Select.ofType<string>();

    return (
      <div>
        <Drawer
          icon="info-sign"
          isOpen={this.state.isOpen}
          onClose={(event: any) => {
            this.setState({ isOpen: false });
          }}
          title="Requête FHIR"
        >
          <div>{this.state.fhirRequest}</div>
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
                this.setState({
                  service: item
                });
              }}
            >
              <Button
                icon="office"
                rightIcon="caret-down"
                text={this.state.service}
              />
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
                this.handleOpen("");
              }}
            />
          </div>
          <div id="attente" className="dashboard-module">
            <div className="title">
              Temps d'Attente aux Urgences
              <br />
              (24 dernières heures)
            </div>
            <div className="value primary">2 h 30 min</div>
            <Button
              className="requestButton"
              minimal
              icon="cog"
              onClick={(event: any) => {
                this.handleOpen(attenteRequest);
              }}
            />
          </div>
          <div id="hospitalisation" className="dashboard-module">
            <div className="title">Taux d'Hospitalisation aux Urgences</div>
            <div className="value danger">14 %</div>
            <Button
              className="requestButton"
              minimal
              icon="cog"
              onClick={(event: any) => {
                this.handleOpen("");
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
                this.handleOpen("");
              }}
            />
          </div>
          <div id="sejour" className="dashboard-module">
            <div className="title">Durée Moyenne de Séjour</div>
            <div className="value warning">5 jours 13 h</div>
            <Button
              className="requestButton"
              minimal
              icon="cog"
              onClick={(event: any) => {
                this.handleOpen("");
              }}
            />
          </div>
          <div id="gestes" className="dashboard-module">
            <Gestes />
            <Button
              className="requestButton"
              minimal
              icon="cog"
              onClick={(event: any) => {
                this.handleOpen("");
              }}
            />
          </div>
          <div id="gestesRevenu" className="dashboard-module">
            <GestesRevenu />
            <Button
              className="requestButton"
              minimal
              icon="cog"
              onClick={(event: any) => {
                this.handleOpen("");
              }}
            />
          </div>
        </div>
      </div>
    );
  };
}
