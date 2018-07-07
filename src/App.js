import React, { Component } from 'react';
import './App.css';
import GenericLayout from './shared_components/GenericLayout'
import {FormGroup, FormControl, Button} from 'react-bootstrap'
import { observer } from 'mobx-react'
import AdminStore from './stores/adminStore'
import EventEmitter from './helpers/EmitterHelper.helper'
import Constants from './helpers/Constants.helper'
import propTypes from 'prop-types'

const App = observer(
  class App extends Component {

    constructor () {
      super()
      this.state = {
        fullName:'',
        phone:'',
        businessName:'',
        password:''
      }
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
      EventEmitter.emitter.addListener(Constants.EMITTERS.AdminSignup, ()=>{
        this.context.router.history.push('/agent')
      })
    }

    handleChange (e) {
      const temporaryState = {}
      temporaryState[e.target.id] = e.target.value
      this.setState(temporaryState)
    }

    handleSave (e) {
      e.preventDefault()
      AdminStore.adminSignUp(this.state)
    }

    _renderForm () {
      return <form noValidate >

                <FormGroup controlId="fullName">
                  <FormControl type="text" placeholder="Full name" 
                    onChange={this.handleChange}
                    value={this.state.fullName}
                  />
                </FormGroup>

                <FormGroup controlId="phone">
                  <FormControl type="text" placeholder="Phone" 
                    onChange={this.handleChange}
                    value={this.state.phone}
                  />
                </FormGroup>

                <FormGroup controlId="businessName">
                  <FormControl type="text" placeholder="Business Name"
                    onChange={this.handleChange}
                    value={this.state.businessName}
                  />
                </FormGroup>

                <FormGroup controlId="password">
                  <FormControl type="password" placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </FormGroup>
                
                <Button bsStyle="primary" onClick={this.handleSave.bind(this)}
                  type="submit">
                  Submit
                </Button>

              </form>
    }

    render() {
      return (
        <GenericLayout>
          <div className='row'>
            <div className='col-xs-12 col-md-6 center-div'>
              <h2>Admin Registration</h2>
              
              {
                AdminStore.isLoading ? <h1>Please wait ... </h1> : this._renderForm()
              }

            </div>
          </div>
        </GenericLayout>
      );
    }
  }
)

App.contextTypes = {
  router: propTypes.object
}

export default App;