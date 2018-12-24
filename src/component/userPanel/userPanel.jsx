import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react';
import firebase from '../../firebase';
import { connect } from 'react-redux';

class UserPanel extends Component {

    state = {
        storageRef: firebase.storage().ref('usersAvatar'),
    }

    dropdownOptions =() => [
        {
            key: 'user',
            text: <span><Icon name='sign in'/>Signed in as <strong>{this.props.name}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span ><Icon name='picture'/>Change Avatar</span>
        },
        {
            key: 'out',
            text: <span onClick={this.signOut}><Icon name='sign out'/>Sign Out</span>
        }
    ];

    signOut = () => {
        firebase.auth().signOut()
        .then(() => {
            console.log('user sign out');
        });
    };

    updateAvtar = () => {
        let user = firebase.auth().currentUser;
        user.updateProfile({
            photoURL: `'http://gravatar.com/avatar/cxxcxc?d=identicon'`
        }).then(() => {
            this.state.storageRef();
            console.log('Update successful');
        }).catch(function(error) {
            console.log('An error happened: ' + error);
        });
    }

    addFile = (e) => {
        let file = e.target.files[0];
        console.dir(file);
    }

  render() {
    return (
      <Grid>
        <Grid.Column>
            <Grid.Row style={{margin: '1rem'}}>
                <Header inverted  as='h2'>
                    <Icon name='rocket' />
                    <Header.Content>Rocket</Header.Content>
                </Header>
            </Grid.Row>
            <Header style={{margin: '.4rem'}} as='h4' inverted>
                <Dropdown trigger={
                    <span>
                        <Image src={this.props.avatarUrl} spaced='left' avatar/>&#160;&nbsp;{this.props.name}
                    </span>} 
                options={this.dropdownOptions()}/>
            </Header>
        </Grid.Column>
      </Grid>
    )
  };
}

const mapStateToProps = state => ({
    name: state.user.currentUser.displayName,
    avatarUrl: state.user.currentUser.photoURL,
});

export default connect(mapStateToProps, null)(UserPanel);