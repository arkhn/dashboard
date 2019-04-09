import {
  Alignment,
  Navbar,
} from '@blueprintjs/core'
import * as React from 'react'

import './style.less'

import Bar from '../../../components/bar'
import BarGroup from '../../../components/barGroup'
import Lines from '../../../components/lines'
import ResponsiveLines from '../../../components/responsiveLines'

import Admissions from './components/admissions'
import Gestes from './components/gestes'

const arkhnLogoWhite = require("../../../../assets/img/arkhn_logo_only_white.svg")

export interface IViewProps {

}

interface IState {

}

export default class MainView extends React.Component<IViewProps, IState> {
    constructor(props: IViewProps) {
        super(props)
    }

    public render = () => {
        return <div>
          <Navbar id="navbar" className="bp3-dark">
            <Navbar.Group align={Alignment.LEFT}>
              <Navbar.Heading>
                <span dangerouslySetInnerHTML={{__html: arkhnLogoWhite}} />
                <h2>ARKHN</h2>
              </Navbar.Heading>
            </Navbar.Group>
          </Navbar>
          <div id='dashboard'>
            <div id='attente' className='dashboard-module'>
              <div className='title'>Temps d'Attente aux Urgences<br/>(24 dernières heures)</div>
              <div className='value primary'>2 h 30 min</div>
            </div>
            <div id='service' className='dashboard-module'>
              <div className='title'>Patients Hébergés Hors Service</div>
              <div className='value primary'>8</div>
            </div>
            <div id='sejour' className='dashboard-module'>
              <div className='title'>Durée Moyenne de Séjour</div>

              <div className='value warning'>3 jours</div>
            </div>
            <div id='entrees' className='dashboard-module'>
              <Admissions />
            </div>
            <div id='gestes' className='dashboard-module'>
              <Gestes />
            </div>
          </div>
        </div>
    }
}
