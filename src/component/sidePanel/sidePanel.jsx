import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from '../userPanel/userPanel';
import Channels from '../channels/channels'

export default class SidePanel extends Component {
  render() {
    return (
      <Menu side='large' inverted fixed='left' vertical style={{background:'#3a6073', fontSize: '1.2rem'}}>
        <UserPanel/>
        <Channels/>
      </Menu>
    )
  }
}
