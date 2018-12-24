import React, { Component } from 'react'
import { Menu, Icon, Modal, Header, Button, Form, Message } from 'semantic-ui-react';

export default class Channels extends Component {

    state = {
        channels: [],
        modalState: false,
        modalInputName: '',
        modalInputDescription: '',
        modalErrorVisible: false,
    }

    handleChange =({target}) => {
        this.setState({
            [target.name] : target.value,
        });
    };

    toggleModal = () => {
        this.setState(prev => ({
            modalState: !prev.modalState,
            modalErrorVisible: false,
        }));
    };
    
    addChannel = () => {
        if(this.isFormFilled(this.state)){
            this.setState(prev => ({
                channels: [...prev.channels, {name: this.state.modalInputName, description: this.state.modalInputDescription }],
                modalInputName: '',
                modalInputDescription: '',
                modalErrorVisible: false,
            }));
            this.toggleModal();
        } else {
            this.setState({
                modalErrorVisible: true
            });
        };
    };

    isFormFilled = ({modalInputName, modalInputDescription}) => modalInputName && modalInputDescription;

  render() {
      const { channels, modalInputDescription, modalInputName, modalState, modalErrorVisible } = this.state
    return (
        <React.Fragment>
            <Menu.Menu style={{paddingBottom: '2rem'}}>
                <Menu.Item>
                    <span>
                        <Icon name='exchange'/>CHANNELS
                    </span>
                        ({channels.length})
                        <Icon name='add'onClick={this.toggleModal}/>
                </Menu.Item>
            </Menu.Menu>
            <Modal  open={modalState} onClose={this.toggleModal} style={{width: '30%'}}>
                <Header style={{background:'#3a6073',color: 'white'}} icon='add' content='Add new channel'/>
                <Modal.Content>
                    <Form>
                        <Form.Field> 
                            <label>Name</label>
                            <input placeholder='Enter a channel name' name='modalInputName' value={modalInputName} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <input placeholder='Enter a channel description' name='modalInputDescription' value={modalInputDescription} onChange={this.handleChange}/>
                        </Form.Field>
                    </Form>
                    {modalErrorVisible && <Message error header='Erorr' content='Fill in all form fields.'/>}
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button onClick={this.toggleModal}>Cancel</Button>
                        <Button.Or />
                        <Button primary onClick={this.addChannel}>Save</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    )
  }
}
