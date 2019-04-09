import * as React from 'react'

import './style.less'

import Bar from '../../../components/bar'
import BarGroup from '../../../components/barGroup'
import Lines from '../../../components/lines'
import ResponsiveLines from '../../../components/responsiveLines'

import Entries from './components/entries'

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
          <div>Sextan</div>
          <Entries width={600} height={400}/>
        </div>
    }
}
