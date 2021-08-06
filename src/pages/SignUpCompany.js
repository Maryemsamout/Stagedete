import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
 import CssBaseline from '@material-ui/core/CssBaseline';
 import './Login.css'
 import Paper from '@material-ui/core/Paper';
 import Grid from '@material-ui/core/Grid';
 import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
 import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {},
      username : '',
      email : '',
      password : ''
    }
  }
 
  addRegister = async(account) => {
    const user = await axios.post('http://localhost:2000/user/signup',(account))
    return user.data 
   }
 
   handleUsernameChange = event => {
    this.setState({ username: event.target.value });
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
       username : this.state.username,
       email: this.state.email,
       password : this.state.password
     };
 
     this.addRegister(account)
       .then(res => {
         console.log(res.status);
         console.log(res.data)
         if(res.status === 200){
            this.props.history.push('/login');
         }else if(res.status === 404){
          alert('Email Already Exist,Try Another Email')  
         }
       }).catch((err) => {
         alert('Email Already Exist,Try Another Email')
         console.log(err)
         return
       })
   } 


  render(){
  return (
    <div>
    <Grid container component="main" className="root1">
       <CssBaseline />
       <Grid item xs={false} sm={4} md={7} className="image"  />
       <Grid item xs={112} sm={6} md={4} component={Paper} elevation={6} square> 
         <div className="paper">
           <Avatar className="avatar">
             <LockOutlinedIcon />
           </Avatar>
           <Typography component="h1" variant="h5" className="space">
           REGISTER COMPANY
           </Typography>  
    
    
    <Form id="register" method="post" onSubmit ={this.handleSubmit}>
    <FormGroup>
        
        <Input type="text" className="space" name="username" id="username" onChange={this.handleUsernameChange} placeholder="Enter your Username" required/>
      </FormGroup>
      <FormGroup>
    
        <Input type="email" className="space" name="email" id="email" onChange={this.handleEmailChange} placeholder="Enter your Email" required/>
      </FormGroup>
      <FormGroup>
       
        <Input type="password" className="space" name="password" id="Password" onChange={this.handlePasswordChange} placeholder="Enter your Password" required/>
      </FormGroup>
      
      <Button className='button_login bg-secondary'>SIGN UP</Button>
      <Label className="space">Already has an account?</Label><Link to='/login' style={{color: "rgb(6, 235, 6)"}}> Sign in</Link>
    </Form>
    </div>
   </Grid>
</Grid> 
    </div>
  );
}
}