import React,{Component} from 'react';
import './GenericLayout.css';

class GenericLayout extends Component {
  render = () => (
    <div className="App">
    
        <header className="App-header">
          <h1 className="App-title">OyaPay Test</h1>
        </header>

        {this.props.children}
    </div>
  )
}

export default GenericLayout