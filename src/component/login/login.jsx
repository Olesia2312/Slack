import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Header, Icon, Form, Message, Button, Segment } from 'semantic-ui-react';
import firebase from '../../firebase.js';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    userRef: firebase.database().ref('users'),
  }

  handleChange =({target}) => {
    this.setState ({
      [target.name]: target.value,
    })
  };

  isFormEmpty = ({email, password}) => !(email && password);

  isFormValid = () => {
    let errors = [];
    let error;
    if(this.isFormEmpty(this.state)) {
      error = { message: 'Please fill all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      this.setState({ errors: [] });
      return true;
    }
  };

  handleInput = (errors, inputName) => {
    return errors.some(x => x.message.toLowerCase().includes(inputName)) ? 'error' : ''
  };

  handleSubmit =(e) => {
    e.preventDefault();
    let {email, password} = this.state;
    if(!this.isFormValid()) return;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(signedUser => {
      console.log(signedUser);
    })
    .catch(err => {
      console.error(err);
      this.setState({errors: this.state.errors.concat(err)})
    })
  };

  render() {
    let { email, password, errors } = this.state;
    return (
      <Grid textAlign='center'  verticalAlign='middle' className='app'>
        <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' icon coor='teal' textAlign='center' ><Icon name='comment alternate' style={{color:'#3a6073'}}/>Login</Header>
                <Segment>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input className={this.handleInput(errors, 'email')} fluid name='email' icon='mail' iconPosition='left' placeholder='Email' type='mail' value={email} onChange={this.handleChange}/>
                        <Form.Input className={this.handleInput(errors, 'password')} fluid name='password' icon='lock' iconPosition='left' placeholder='Password' type='password' value={password} onChange={this.handleChange}/>
                        <Button style={{backgroundColor:'#3a6073',color: 'white'}} fluid size='large'>Submit</Button>
                    </Form>
                </Segment>
                {errors.length > 0 && <Message error><h3>Error</h3>{errors.map(x => <p key={x.message}>{x.message}</p>)}</Message>}
            <Message><NavLink to='/registration'>Registration</NavLink></Message>
        </Grid.Column>
      </Grid>
    )
  }
}