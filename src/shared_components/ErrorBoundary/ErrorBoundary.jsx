import React,{Component} from 'react';
import './ErrorBoundary.css';
import {Switch} from 'react-router-dom'

class ErrorBoundary extends Component {

  constructor () {
    super()
    this.state = {
      hasError:false
    }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError:true })
  }

  render = () => {
    if(this.state.hasError){
      return <h1>An error occurred</h1>
    }
    return <Switch>
            {this.props.children}
           </Switch>
  }
}

export default ErrorBoundary
