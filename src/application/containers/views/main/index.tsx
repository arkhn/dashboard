import * as React from 'react'

import './style.less'

import Bar from '../../../components/bar'
import Lines from '../../../components/lines'
import ResponsiveLines from '../../../components/responsiveLines'

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
            <Bar width={400} height={400} />
            <Lines width={400} height={400} />
            <ResponsiveLines height={400} />
        </div>
    }
}
