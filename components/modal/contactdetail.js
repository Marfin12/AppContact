import React, {Component} from 'react';
import { StyleSheet, Button, TextInput, Image, View, SafeAreaView, Text,TouchableOpacity, TouchableHighlight} from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';


class ContactDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
         firstname: this.props.firstname,
         lastname: this.props.lastname,
         age: this.props.age,
         image: this.props.myImage,
         iconName: 'edit',
         edit: false,
         textinputDisable: true
      };
    }

    deleteContact() {
        this.setState({loading: true})
        this.asyncDeleteContact()
    }

    editContact() {
        this.setState({loading: true})
        this.asyncEditContact()
    }

    getContactById() {
        this.setState({loading: true})
        this.asyncGetContactById()
    }

    async asyncDeleteContact() {
        this.props.deleteContact(this.state.value)
        .then(() => {
          try {
            let status = this.props.items.data.status;
            let detail = this.props.items.data.detail;
            let response_time = this.props.items.data.response_time;
            if (this.props.items.status === 200) {
              //console.log(this.props.items.data["data"][0].firstName)
              let response = this.props.items.data;
              //console.log(props)
              this.setState({profile: response.data, loading: false});
            } else {
              this.setState({
                profile: [],
                loading: false
              });
            }
          } catch (error) {
            console.log(error)
          }
        });
    }

    async asyncEditContact() {
        this.props.editContact(this.state.value,this.state.firstname,this.state.lastname,this.state.age,this.state.image)
        .then(() => {
          try {
            let status = this.props.items.data.status;
            let detail = this.props.items.data.detail;
            let response_time = this.props.items.data.response_time;
            if (this.props.items.status === 200) {
              //console.log(this.props.items.data["data"][0].firstName)
              let response = this.props.items.data;
              this.setState({profile: response.data, loading: false});
            } else {
              this.setState({
                profile: [],
                loading: false
              });
            }
          } catch (error) {
            console.log(error)
          }
        });
    }

    async asyncGetContactById() {
        this.props.getContactById(this.state.value)
        .then(() => {
          try {
            let status = this.props.items.data.status;
            let detail = this.props.items.data.detail;
            let response_time = this.props.items.data.response_time;
            //console.log(this.props.items.data)
            if (this.props.items.status === 200) {
              //console.log(this.props.items.data["data"][0].firstName)
              let response = this.props.items.data;
              //console.log(response.data)
              this.setState({profile: response.data, loading: false});
            } else {
              this.setState({
                profile: [],
                loading: false
              });
            }
          } catch (error) {
            this.setState({
                profile: [],
                loading: false
              });
          }
        });
    }

    clickPencil() {
      !this.state.edit?
      this.setState({
        edit: true,
        iconName: 'save',
        textinputDisable: false
      }):
      this.editContact()
    }

    clickDelete() {
    Alert.alert(
      "Confirmation",
      "Are you sure want to delete",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteContact() }
      ],
      { cancelable: false }
    );
    }

    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text>{text}</Text>
          </View>
        </TouchableOpacity>
      );

render() {
    return (
  <SafeAreaView style={styles.container}>
      <Modal isVisible={this.props.isVisible}>
      <View style={styles.modalContent}>
      <TouchableHighlight
          style={[styles.profileImgContainer, { marginVertical: 70 }]}
        >
    <Image source={this.state.image} style={styles.profileImg} />
    </TouchableHighlight>
      <TouchableOpacity>
          <View style={styles.button}>
            <Text>First Name: </Text>
            <TextInput disabled={this.state.textinputDisable} value={this.state.firstname}></TextInput>
          </View>
          <View style={styles.button}>
            <Text>Last Name: </Text>
            <TextInput disabled={this.state.textinputDisable} value={this.state.lastname}></TextInput>
          </View>
          <View style={styles.button}>
            <Text>Age: </Text>
            <TextInput disabled={this.state.textinputDisable} value={this.state.age}></TextInput>
          </View>
        </TouchableOpacity>
        <Icon
          name={this.state.iconName}
          color='#00aced'
          size={30}
          onPress={this.clickPencil}
          style={styles.delete} 
        />
        <Icon
          name='delete'
          color='#00aced'
          size={30}
          onPress={this.clickDelete}
          style={styles.pencil} />
        </View>
        <TouchableOpacity style={styles.close} onPress={this.props.onClose}>
            <Text>X - CLOSE</Text>
        </TouchableOpacity>
        </Modal>
  </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    close: {
        marginTop: -15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    delete: {
        paddingRight: 10,
        marginLeft: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 30,
        flexDirection: 'row',
        marginHorizontal: 20
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 4,
        height: 200,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        flexDirection: 'row'
      },
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      profileImgContainer: {
        marginLeft: 8,
        height: 120,
        width: 120,
        marginVertical: -45,
        borderRadius: 40
      },
      profileImg: {
        height: 120,
        width: 120,
        marginVertical: -45,
        borderRadius: 40,
      },
});

function mapStateToProps(state) {
    return {
      items: state,
    };
  }

  export default connect(
    mapStateToProps,
    {postContact,getContact,getContactById,deleteContact,editContact},
  )(ContactDetail);