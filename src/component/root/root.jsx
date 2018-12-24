import React, { Component } from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import App from '../app/app';
import Login from '../login/login';
import Registration from '../registration/registration';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { setUser, clearUser } from '../../redux/actions/setUserAction';
import Spiner from '../spiner/spiner';

class Root extends Component {

componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      this.props.setUser(user);
      this.props.history.push('/');
    } else {
      this.props.history.push('/login');
      this.props.clearUser();
    }
  })
}

  render() {
    return this.props.isLoading ? <Spiner/> : (
      <Switch>
          <Route exact path='/' component={App}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/registration' component={Registration}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () =>  dispatch(clearUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));