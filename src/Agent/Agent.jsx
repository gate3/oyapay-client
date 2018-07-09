import React,{Component} from 'react';
import './Agent.css';
import GenericLayout from '../shared_components/GenericLayout'
import {FormGroup, FormControl, Button} from 'react-bootstrap'
import AgentStore from '../stores/agentStore'
import Constants from '../helpers/Constants.helper'
import EventEmitter from '../helpers/EmitterHelper.helper'
import propTypes from 'prop-types'
import { observer } from 'mobx-react'

const Agent = observer(
  class Agent extends Component {
    constructor () {
      super()
      this.state = {
        name:'',
        phone:'',
        message:''
      }
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount () {
      AgentStore.fetchAllAgents()
      EventEmitter.emitter.addListener(Constants.EMITTERS.MerchantSignup, ()=>{
        this.setState({ 
          message:'Agent has been saved successfully!'
        })
      })
    }

    handleChange (e) {
      const temporaryState = {}
      temporaryState[e.target.id] = e.target.value
      this.setState(temporaryState)
    }

    handleSave (e) {
      e.preventDefault()
      AgentStore.agentSignUp(this.state)
    }

    _renderForm () {
      return <form>
              <FormGroup controlId="name">
                <FormControl type="text" placeholder="Full name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </FormGroup>

              <FormGroup controlId="phone">
                <FormControl type="text" placeholder="Phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </FormGroup>

              <Button bsStyle="primary"  type="submit"
                onClick={this.handleSave.bind(this)}>
                Submit
              </Button>

            </form>
    }

    _renderAgents () {
        return <div className='col-xs-12 col-md-6 center-div'>
            <h1>Agents</h1>
            {
              AgentStore.agents.map(a => (
                <div key={a._id} className='row row-div'>
                  <div className='col-md-6'>
                    {a.name}
                  </div>
                  <div className='col-md-6'>
                    {a.phone}
                  </div>
                </div>
              ))
            }
          </div>
    }

    render = () => (
      <GenericLayout>
        <div className='row'>
            <div className='col-xs-12 col-md-6 center-div'>
              <h2>Agent Registration</h2>
              
              <p>{this.state.message}</p>

              {
                AgentStore.isLoading ? <h1>Please wait ... </h1> : this._renderForm()
              }
            </div>
        </div>
        <div className='row'>
          {
            this._renderAgents()
          }
        </div>
      </GenericLayout>
    )
  }
)

Agent.contextTypes = {
  router: propTypes.object
}

export default Agent
