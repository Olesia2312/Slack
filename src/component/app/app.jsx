import React, { Component } from 'react';
import MetaPanel from '../metaPanel/metePanel';
import Messages from "../messages/messages";
import SidePanel from '../sidePanel/sidePanel';
import { Grid } from 'semantic-ui-react';
import ColorPanel from '../colorPanel/colorPanel';

class App extends Component {
  render() {
    return (
      <Grid columns='equal' className='app'>
        <ColorPanel/>
        <SidePanel/>
        <Grid.Column textAlign='center'>
          <Messages/>
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
