import React from 'react';
import './App.css';
import {Component} from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Container, Row, Col } from 'reactstrap';
import Footer from'./components/Footer'

import Login from './pages/Login'

import Signup from './pages/Signup'

import SignUpCompany from './pages/SignUpCompany'
 
import {Provider} from 'react-redux'
import store from './redux/store'

class App extends Component {

  componentWillMount(){

  }

  render(){
    return (
      <div>
        <BrowserRouter>
        <Provider store={store}>
        <Navbar/>
        
        <Switch>

       
       
        <Route path="/login" component={Login}  />
        <Route path="/signup" component={Signup} />
        <Route path="/signupcompany" component={SignUpCompany} />
       
        </Switch>
        <Footer/>
        </Provider>
        </BrowserRouter>
        

      </div>
    )
  }
} 

export default App;
