//import '~antd/dist/antd.css';
import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';

import Home from './components/Home'
import Usuarios from './components/Usuarios'
import Ingreso from './components/Ingreso'
import fire from './config/fire'


class App extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      user:{}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener()
  {
    fire.auth().onAuthStateChanged((user)=>{
      //console.log(user);
      if(user){
        console.log(user);
        this.setState({user});
      }else{
        this.setState({user:null})
      }
    })
  }
  
  render() {
    return (
      <div className="App">
          {this.state.user ? (<Home/>): (<Ingreso/>)}
      </div>
    );
  }
}

export default App;
