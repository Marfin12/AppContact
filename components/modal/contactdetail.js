import React, {Component} from 'react';
import { StyleSheet, Button, Alert, TextInput, Image, View, SafeAreaView, Text,TouchableOpacity, TouchableHighlight} from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Loading from '../modal/loader';

class ContactDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
         iconName: 'edit',
         editing: false,
         profile: [],
         textinputDisable: false,
         key: '',
         once: true,
         loading: false,
         errorPhoto: false
      };
    }

    componentDidUpdate() {
      if (this.props.isVisible && this.state.once) 
      this.setState({
        profile: this.props.profile,
        key: this.props.itemKey,
        once: false
      })
      if (!this.props.isVisible && !this.state.once) 
      this.setState({
        once: true
      })
    }

    isValidName(name) {
      return name !== undefined && name !== '' && /([A-Z]+)/g.test(name)
   }

   isValidAge(age) {
     return !isNaN(age) && parseInt(age) < 90;
   }

    deleteContact() {
        this.setState({loading: true})
        this.asyncDeleteContact()
    }

    editContact() {
      if (!this.isValidName(this.state.profile.firstName)) Alert.alert('please input your firstname')
        else if (!this.isValidName(this.state.profile.lastName)) Alert.alert('please input your lastname')
        else if (!this.isValidAge(this.state.profile.age)) Alert.alert('please input your age correctly and no more than or equal 90')
        else {
          this.setState({loading: true})
          this.asyncEditContact()
        }
    }

    async asyncDeleteContact() {
        this.props.deleteContact(this.state.profile.key)
        .then(() => {
          try {
            if (this.props.items.status === 200 || this.props.items.status === 201) {
              let response = this.props.items.data;
              this.setState({profile: response.data, loading: false});
              this.closingModal()
            } else {
              let response = this.props.items.data;
              Alert.alert('oops... ' + response.message)
              this.setState({
                loading: false
              });
            }
          } catch (error) {
            console.log(error)
          }
        });
    }

    async asyncEditContact() {
        this.props.editContact(this.props.profile.key,this.state.profile.firstName,this.state.profile.lastName,this.state.profile.age,this.state.profile.photo)
        .then(() => {
          try {
            if (this.props.items.status === 200 || this.props.items.status === 201) {
              //let response = this.props.items.data;
              this.setState({loading: false});
              Alert.alert('Contact Updated!')
              this.setState({
                editing: false,
                iconName: 'edit',
                textinputDisable: false
              })
            } else {
              let response = this.props.items.data;
              this.setState({
                loading: false
              });
              Alert.alert('oops... ' + response.message)
            }
          } catch (error) {
            console.log(error)
          }
        });
    }

    startEdit() {
      this.editContact()
    }

    clickPencil() {
      this.state.editing?
      this.startEdit():
      this.setState({
        editing: true,
        iconName: 'save',
        textinputDisable: true
      })
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
          { text: "Yes", onPress: () => this.deleteContact() }
        ],
        { cancelable: false }
      );
      }

    closingModal = () => {
      this.setState({
        editing: false,
        iconName: 'edit',
        textinputDisable: false
      })
      this.props.onClose()
    };

    handleErrorPhoto = () => {
      this.setState({
        errorPhoto: true
      })
    }

render() {
    return (
  <View  style={this.props.isVisible?styles.container:styles.nocontainer}>
      <Modal isVisible={this.props.isVisible}>
      <Loading isVisible={this.state.loading}/>
        <View  style={styles.actions}>
        <TouchableOpacity onPress={() => this.clickPencil()}>
      <Icon
          name={this.state.iconName}
          color='#00aced'
          size={30}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.clickDelete()}>
        <Icon
          name='delete'
          color='#00aced'
          size={30}
          />
          </TouchableOpacity>
          </View>
      <View style={styles.modalContent}>
      <TouchableHighlight
          style={[styles.profileImgContainer, { marginVertical: 70 }]}
        >
     <View>
    <Image onError={() => this.handleErrorPhoto()} source={!this.state.errorPhoto?{uri: this.state.profile.photo}:{uri: this.state.profile.errorPhoto}} style={styles.profileImg} />
    <Text style={this.state.textinputDisable? {
              marginTop: 45,
              opacity:1
            }:{opacity:0}} >Enter url: </Text>
    <TextInput style={this.state.textinputDisable? {
              borderBottomColor:'#000',
              borderBottomWidth: 2,
              color: '#000'
            }:{opacity:0}}  editable={this.state.textinputDisable} onChangeText={text => this.setState({profile: {
              ...this.state.profile,
              photo: text
            }})} value={this.state.profile.photo}></TextInput>
    </View>
    </TouchableHighlight>
      <TouchableOpacity>
          <View style={styles.button}>
            <Text>First Name: </Text>
            <TextInput style={this.state.textinputDisable && {
              borderBottomColor:'#000',
              borderBottomWidth: 2,
              color: '#4d4f4e' 
            }}  editable={this.state.textinputDisable} onChangeText={text => this.setState({profile: {
              ...this.state.profile,
              firstName: text
            }})} value={this.state.profile.firstName}></TextInput>
          </View>

          <View style={styles.button}>
            <Text>Last Name: </Text>
            <TextInput style={this.state.textinputDisable && {
              borderBottomColor:'#000',
              borderBottomWidth: 2,
              color: '#4d4f4e'
            }} editable={this.state.textinputDisable} onChangeText={text => this.setState({profile: {
              ...this.state.profile,
              lastName: text,
            }})} value={this.state.profile.lastName}></TextInput>
          </View>

          <View style={styles.button}>
            <Text>Age: </Text>
            <TextInput style={this.state.textinputDisable && {
              borderBottomColor:'#000',
              borderBottomWidth: 2,
              color: '#4d4f4e'
            }} editable={this.state.textinputDisable} onChangeText={text => this.setState({profile: {
              ...this.state.profile,
              age: text
            }})} value={this.state.profile.age && this.state.profile.age.toString()}></TextInput>
          </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.close} onPress={() => this.closingModal()}>
            <Text>X - CLOSE</Text>
        </TouchableOpacity>
        </Modal>
  </View>
    )
}
}

const styles = StyleSheet.create({
    close: {
        marginTop: -15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    actions: {
        flexDirection: 'row',
        marginVertical: -30,
        alignItems: "flex-end",
        justifyContent: 'flex-end',
        zIndex: 100
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    nocontainer: {
      flex: 0
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