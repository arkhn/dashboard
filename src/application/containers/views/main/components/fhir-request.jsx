import React, { Component } from 'react'

import { Drawer, Classes } from '@blueprintjs/core'

export class FhirRequest extends Component {

    constructor() {
        super()
        this.state = { isOpen: true}
        this.openDrawer = this.openDrawer.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
    }

    
    openDrawer() {
        this.setState({isOpen: true})
    }
    closeDrawer() {
        this.setState({isOpen: false})
    }

    render() {
        return (
            <span>
                <a href="" onClick={this.openDrawer}>Show request</a>
                <Drawer
                className={Classes.DARK}
                icon="info-sigh"
                onClose={this.closeDrawer}
                title="Requete FHIR"
                isOpen={this.state.isOpen}
                >
                <div className={Classes.DRAWER_BODY}>Ma requête FHIR biatch</div> 
                </Drawer>
            </span>

        )
    }
}
