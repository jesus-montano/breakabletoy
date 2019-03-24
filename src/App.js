import React, { Component } from 'react';

import './App.css';
import Contact from './components/Contact';
import Contactform from './components/Contactform'

class App extends Component {
constructor(props){
  super(props)
  this.state={
    show:false

  }
}

  render() {
    console.log(this.state.show)
    return (
      <div className="App">
       
        <Contact />
      </div>
    );
  }
}

export default App;
