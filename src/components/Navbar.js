import React, { Component } from 'react'
import axios from 'axios'
import {Link, withRouter } from 'react-router-dom'
import wasta from './../images/wastalogo.png'



class Navbar extends  React.Component  {
    constructor(props){
      super(props)
      this.state = {
        data: {},
        token : '',
        isLogin : false
      }
    }
    getData = async(page)=>{
        const job = await axios.get(page !== undefined ? page:'http://localhost:8080/user')
        return job.data  
      }
      async componentDidMount(){
        this.getData().then(async res => {
          const token = await localStorage.getItem('Authorization')
          this.setState({
            isLogin: true,
            data : res.data,
            token,
          })
          console.log(res.data)
          if(token !== null){
            this.setState({isLogin: true});
          }else{
            this.setState({isLogin: false});
          }
        })
      }
    
      removeToken = () => {
        localStorage.removeItem('Authorization')
        this.setState({isLogin:false})
        this.props.history.push('/login')
        // window.location.reload()
      }


      render(){
        return (
    <nav className="navbar header-nav navbar-expand-lg background-navbar">
    
    <div className="container">

    <Link to='/'>
  <img src={wasta} className="navbar-brand font-navbar"
  style={{width:'170px'}}

/>
</Link>
  
    <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    <span></span>
    <span></span>
    <span></span>
    </button>
    {!this.state.isLogin&&(
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
       
          <div className="my-2 my-lg-0">
          <Link to='/login'><button className="btn btn-outline-success btn-sm font-login" type="button" value="Login">Login</button></Link>
          <Link to='/signup'><input className="btn btn-secondary btn-sm font-login" type="button" value="Sign Up"></input></Link>
          <Link to='/signupcompany'><input className="btn btn-outline-success btn-sm" type="button" value="For Company"></input></Link> 
         </div> 
           
        </div>
      )}
     
    </div>
    </nav>
    
        );
    }
    
    }
    
    export default withRouter(Navbar); 