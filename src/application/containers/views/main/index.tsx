import {
  Alignment,
  Button,
  Drawer,
  MenuItem,
  Navbar,
  Classes
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import * as React from 'react'

import './style.less'

import Bar from '../../../components/bar'
import BarGroup from '../../../components/barGroup'
import Lines from '../../../components/lines'
import ResponsiveLines from '../../../components/responsiveLines'

import Admissions from './components/admissions'
import Gestes from './components/gestes2'
import GestesRevenu from './components/gestes'
import { DRAG_HANDLE_HORIZONTAL } from '@blueprintjs/icons/lib/esm/generated/iconContents';

const arkhnLogoWhite = require("../../../../assets/img/arkhn_logo_only_white.svg")
const arkhnLogoBlack = require("../../../../assets/img/arkhn_logo_only_black.svg")

import {AverageStayLength, InAndOutPatients, AvailableBeds, ERStayDuration} from './tooltips'

export interface IViewProps {

}

interface IState {
  fhirRequest: string,
  isOpen: boolean,
  service: string,
}

export default class MainView extends React.Component<IViewProps, IState> {
    constructor(props: IViewProps) {
        super(props)
        this.state = {
          requestComponent: null,
          isOpen: false,
          service: 'Gériatrie',
        }
    }

    handleOpen = (component: any) => {
      this.setState({
        requestComponent: component,
        isOpen: true,
      })
    }

    public render = () => {


      const ServiceSelect = Select.ofType<string>();
      const inAndOutpatients = {__html: "SELECT date_trunc('month', (e.resource#>>'{period, end}')::date) as date, count(*) as sorties FROM encounter e WHERE e.resource#>>'{class, code}' = 'inpatient' OR e.resource#>>'{class, code}' = 'emergency' GROUP BY date ORDER BY date DESC LIMIT 10;<br/>SELECT date_trunc(‘month', (e.resource#>>'{period, start}')::date) as date, count(*) as entrees FROM encounter e WHERE e.resource#>>'{class, code}' = 'inpatient' OR e.resource#>>'{class, code}' = 'emergency' GROUP BY date ORDER BY date DESC LIMIT 10;"}
      return (
        <div>
          <Drawer
            icon="info-sign"
            isOpen={this.state.isOpen}
            onClose={(event: any) => {
              this.setState({ isOpen: false })
            }}
            title="Requête FHIR"
          >
            <div className={Classes.DRAWER_BODY}>
              <div className={Classes.DIALOG_BODY}>
                {this.state.requestComponent}
            </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}><span dangerouslySetInnerHTML={{__html: arkhnLogoBlack}}></span>ARKHN</div>
          </Drawer>

          <Navbar id="navbar" className="bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>
                <span dangerouslySetInnerHTML={{__html: arkhnLogoWhite}} />
                <h2>DASHBOARD</h2>
              </Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <ServiceSelect
                items={['Gériatrie', 'Paliatif', 'Urgences', 'Orthopédie', 'Réanimation']}
                itemRenderer={(item: string, {handleClick, modifiers}: any) => (
                  <MenuItem
                    key={item}
                    onClick={handleClick}
                    text={item}
                  />
                )}
                onItemSelect={(item: string, event: any) => {
                  this.setState({
                    service: item,
                  })
                }}
              >
                <Button
                  icon='office'
                  rightIcon="caret-down"
                  text={this.state.service}
                />
              </ServiceSelect>
            </Navbar.Group>
          </Navbar>

          <div id='dashboard'>
            <div id='admissions' className='dashboard-module'>
              <Admissions />
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen(<InAndOutPatients />)
                }}
              />
            </div>
            <div id='attente' className='dashboard-module'>
              <div className='title'>Temps d'Attente moyen aux Urgences</div>
              <div className='value primary'>2 h 30 min</div>
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen(<ERStayDuration/>)
                }}
              />
            </div>
            <div id='hospitalisation' className='dashboard-module'>
              <div className='title'>Taux d'Hospitalisation aux Urgences</div>
              <div className='value danger'>14 %</div>
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen('')
                }}
              />
            </div>
            <div id='service' className='dashboard-module'>
            <div className='title'>Lits disponibles</div>
              <table>
                <tr>
                  <td className='smallValue primary'>14</td>
                  <td className='rightValue'>Total</td>
                </tr>
                <tr>
                  <td className='smallValue success'>5</td>
                  <td className='rightValue'>UHCD</td>
                </tr>
                <tr>
                  <td className='smallValue danger'>0</td>
                  <td className='rightValue'>USIC</td>
                </tr>
                <tr>
                  <td className='smallValue warning'>2</td>
                  <td className='rightValue'>Réanimation</td>
                </tr>

              </table>
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen(<AvailableBeds />)
                }}
              />
            </div>
            <div id='sejour' className='dashboard-module'>
              <div className='title'>Durée Moyenne de Séjour</div>
              <div className='value warning'>5 jours</div>
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen(<AverageStayLength />)
                }}
              />
            </div>
            <div id='gestes' className='dashboard-module'>
              <Gestes />
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen('')
                }}
              />
            </div>
            <div id='gestesRevenu' className='dashboard-module'>
              <GestesRevenu />
              <Button
                className='requestButton'
                minimal icon='cog'
                onClick={(event: any) => {
                  this.handleOpen('')
                }}
              />
            </div>
          </div>
        </div>
      )
    }
}
