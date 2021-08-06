import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
 
 import CssBaseline from '@material-ui/core/CssBaseline';

 import './Login.css'
 
 import Paper from '@material-ui/core/Paper';
 import Grid from '@material-ui/core/Grid';
 
 import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
 import Typography from '@material-ui/core/Typography';
 
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import {loginUser} from './../redux/action/user'



       

class Login extends Component {
    constructor(props){
      super(props)
      this.state = {
        data : {},
        isLoading : true,
        isError : '',
        email : '',
        password : '',
        token : ''
      }
    }
     
    async componentDidMount(){
        await localStorage.getItem('Authorization')
      }
    
      getLogin = async(account) => {
      //  const user = await axios.post('http://localhost:2000/user/login',(account))
      //  return user.data 
    await this.props.dispatch(loginUser(account))
      }

 getLogin = async(account) => {
  //  const user = await axios.post('http://localhost:2000/user/login',(account))
  //  return user.data 
  await this.props.dispatch(loginUser(account))
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const account = {
      email: this.state.email,
      password : this.state.password
    };
    console.log(account)
    this.props.dispatch(loginUser(account))
      .then(res => {
        console.log(res.action.payload.status)
        let status = res.action.payload.status;
        if(status === 200){
          localStorage.setItem('Authorization',res.token)
          alert('Succes to Login')
          this.props.history.push(`postjobs/crudjob`);
          window.location.reload()
        }else{
          alert('Email or Password is incorrect')
        }
      }).catch((err) => {
        alert('Email or Password is incorrect')
        console.log(err)
        return
      })
  }

  render() {
   
  return (
    <div >
    
    <Grid container component="main" className="root">
       <CssBaseline />
       <Grid item xs={false} sm={4} md={7} className="image"  />
       <Grid item xs={112} sm={6} md={4} component={Paper} elevation={6} square> 
         <div className="paper">
           <Avatar className="avatar">
             <LockOutlinedIcon />
           </Avatar>
           <Typography component="h1" variant="h5" className="space">
             Sign Up
           </Typography>
    <Form id="loginForm" method="post" onSubmit ={this.handleSubmit}>
      <FormGroup>
        
        <Input type="email" name="email" className="space" id="email" onChange={this.handleEmailChange} placeholder="Enter your Email" required/>
      </FormGroup>
      <FormGroup>
       
        <Input type="password" name="password" id="Password" className="space"  onChange={this.handlePasswordChange} placeholder="Enter your Password" required/>
      </FormGroup>
     
      <Button className='button_login bg-secondary' >SIGN IN</Button>
      <Label className="space" >Don't have an account?</Label><Link to='/signup' className="link" style={{color: "rgb(6, 235, 6)"}}> Register</Link>
    </Form>

    </div>
   </Grid>
</Grid>  
    </div>
  );
}
}
const mapStateProps = state => ({
  user : state.user
})

export default connect(mapStateProps)(Login);