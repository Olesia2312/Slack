import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Icon, Form, Message, Button, Segment } from 'semantic-ui-react';
import firebase from '../../firebase.js';
import md5 from 'md5';

export default class Registration extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: [],
    userRef: firebase.database().ref('users'),
  }

  handleChange =({target}) => {
    this.setState ({
      [target.name]: target.value,
    })
  };

  handleSubmit =(e) => {
    if(!this.isFormValid()) return;
    e.preventDefault();
    let {email, password, username} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(createdUser => {
      console.log(createdUser);
      createdUser.user.updateProfile({
        displayName: username,
        email: email,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
      })
      .then(() => {
        this.saveUser(createdUser).then(() => console.log('user saved'))
        window.location = '/login';
      })
      .catch(err => {
        console.error(err);
        this.setState({errors: this.state.errors.concat(err)})
      })
    })
    .catch(err => {
      console.error(err);
      this.setState({errors: this.state.errors.concat(err)})
    })
  };

  saveUser = (createdUser) => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      email: createdUser.user.email,
      avatar: createdUser.user.photoURL,
      id:createdUser.user.uid
    });
  };

  isFormEmpty = ({username, email, password, passwordConfirm}) => !(username && email && password && passwordConfirm);
  
  isPasswordValid = ({password, passwordConfirm}) => !(password === passwordConfirm);

  isFormValid = () => {
    let errors = [];
    let error;
    if(this.isFormEmpty(this.state)) {
      error = { message: 'Please fill all fields' };
      this.setState({ errors: errors.concat(error)});
        return false;
    } else if(this.isPasswordValid(this.state)) {
      error = { message: 'Password is invalid'};
      this.setState({errors: errors.concat(error)});
        return false;
    } else {
      this.setState({errors: []});
        return true;
    }
  };

  handleInput = (errors, inputName) => {
    return errors.some(x => x.message.toLowerCase().includes(inputName)) ? 'error' : '';
  };

  render() {
    let { username, email, password, passwordConfirm, errors} = this.state;
    return (
      <Grid textAlign='center' verticalAlign='middle' className='app'>
        <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' icon textAlign='center' ><Icon name='comment alternate' style={{color:'#3a6073'}}/>Registration</Header>
                <Segment>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input className={this.handleInput(errors, 'user')} fluid name='username' icon='user' iconPosition='left' placeholder='Username' type='mail' value={username} onChange={this.handleChange}/>
                        <Form.Input className={this.handleInput(errors, 'email')} fluid name='email' icon='mail' iconPosition='left' placeholder='Email' type='mail' value={email} onChange={this.handleChange}/>
                        <Form.Input className={this.handleInput(errors, 'password')} fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' value={password} onChange={this.handleChange}/>
                        <Form.Input className={this.handleInput(errors, 'password')} fluid name='passwordConfirm' icon='repeat'iconPosition='left' placeholder='Password Confirm' type='password' value={passwordConfirm} onChange={this.handleChange}/>
                        <Button style={{background:'#3a6073',color: 'white'}} fluid size='large'>Submit</Button>
                    </Form>
                </Segment>
                {errors.length > 0 && <Message error><h3>Error</h3>{errors.map(x => <p key={x.message}>{x.message}</p>)}</Message>}
            <Message><NavLink to='/login'>Login</NavLink></Message>
        </Grid.Column>
      </Grid>
    )
  }
}