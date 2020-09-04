import React, {Component} from 'react';
import { StyleSheet, Button, View, SafeAreaView,Alert, Text,TextInput, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import uploadimage from '../images/uploadsample.png';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Loading from '../modal/loader';

class SaveContact extends Component {
    constructor(props) {
      super(props);
      this.state = {
         value: '',
         loading: false,
         profile: [],
         count: 0,
         visibleModal: false
      };
    }

    goback() {
      this.props.navigation.replace('Contact')
    }

    componentDidMount() {
      this.setState({
        profile: {
          firstname: '',
          lastname: '',
          age: '',
          photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
        }
      })
      this.props.navigation.setOptions({
        headerRight: () => (
          <Button onPress={() => this.postContact()} title="Save" />
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => this.goback()}>
          <Icon
            name='arrow-back'
            color='#00aced'/>
          </TouchableOpacity>
        ),
      });
    }

    isValidName(name) {
       return name !== undefined && name !== '' && /([A-Z]+)/g.test(name)
    }

    isValidAge(age) {
      return !isNaN(age) && parseInt(age) < 90;
    }

    postContact() {
        if (!this.isValidName(this.state.profile.firstname)) Alert.alert('please input your firstname')
        else if (!this.isValidName(this.state.profile.lastname)) Alert.alert('please input your lastname')
        else if (!this.isValidAge(this.state.profile.age)) Alert.alert('please input your age correctly and no more than or equal 90')
        else {
          this.setState({loading: true})
          this.asyncPostContact()
        }
    }

      async asyncPostContact() {
        let {firstname, lastname, age, photo} = this.state.profile
        this.props.postContact(firstname,lastname,age,photo)
        .then(() => {
          try {
            if (this.props.items.status === 200 || this.props.items.status === 201) {
              this.setState({loading: false});
              this.props.navigation.replace('Contact')
            } else {
              this.setState({
                loading: false
              });
            }
          } catch (error) {
            console.log(error)
          }
        });
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
    <Loading isVisible={this.state.loading}/>
    <Modal isVisible={this.state.visibleModal}>
          <View style={styles.modalContent}>
      <Text>Enter url: </Text>
      <TextInput
      style={styles.fieldInput}
      value={this.state.profile.photo}
      onChangeText={text => this.setState({
        profile: {
          ...this.state.profile,
          photo: text
        }
      })}
      placeholder='https://image.shutterstock.com/image-vector/example-stamp-vector-template-illustration-260nw-1362869099.jpg'
    />
      {this._renderButton('Close', () => this.setState({ visibleModal: false }))}
    </View>
        </Modal>
      <View style={styles.formMenu}>
      <TouchableHighlight
          style={[styles.profileImgContainer, { marginVertical: 70 }]}
        >
    <Image source={{uri: this.state.profile.photo}} style={styles.profileImg} />
    </TouchableHighlight>
    <TouchableHighlight onPress={() => this.setState({visibleModal: true})}
          style={styles.uploadImg}
        >
    <Image source={uploadimage} style={styles.profileUpload} />
    </TouchableHighlight>
    <View style={styles.form} >
    <Icon
  name='person'
  color='#00aced'
  style={styles.icon} />
      <TextInput
      style={styles.fieldInput}
      value={this.state.profile.firstname}
      onChangeText={text => this.setState({
        profile: {
          ...this.state.profile,
          firstname: text
        }
      })}
      placeholder=' First Name'
    />
    </View>
    <View style={styles.form} >
    <Icon
  name='g-translate'
  color='#00aced'
  style={styles.icon} />
    <TextInput
      style={styles.fieldInput}
      value={this.state.profile.lastname}
      onChangeText={text => this.setState({
        profile: {
          ...this.state.profile,
          lastname: text
        }
      })}
      placeholder=' Last Name'
    />
    </View>
    <View style={styles.form}>
    <Icon
  name='face'
  color='#00aced' 
  style={styles.icon}/>
    <TextInput
      style={styles.fieldInput}
      value={this.state.profile.age}
      onChangeText={text => this.setState({
        profile: {
          ...this.state.profile,
          age: text
        }
      })}
      placeholder=' Age'
    />
    </View>
      </View>
  </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
    icon: {
        marginVertical: 15,
        marginLeft: 5
    },
    form: {
        flexDirection: "row"
    },
    formMenu: {
        alignItems: "center"
    },
    fieldInput: {
        height: 40,
        width: 320,
        marginVertical: 12,
        marginLeft: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contact: {
        
    },
    savecontact: {
        flex: 1,
        alignItems: 'flex-end'
    },
   topbar: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    downbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginVertical: 36
    },
  container: {
    flex: 1
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBox: {

width:300,

backgroundColor:'rgba(255, 255,255,0.2)',

borderRadius: 25,

paddingHorizontal:16,

fontSize:16,

color:'#ffffff',

marginVertical: 10

},
profileImgContainer: {
    marginLeft: 8,
    height: 200,
    width: 200,
    borderRadius: 40
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 40,
  },
  uploadImg: {
      position: "absolute",
      height: 100,
      width: 100,
  },
  profileUpload: {
    height: 100,
    width: 100,
    marginLeft: 70,
    opacity: 0.5,
    position: "absolute",
    marginVertical: 190
  }
});

function mapStateToProps(state) {
    return {
      items: state,
    };
  }

  export default connect(
    mapStateToProps,
    {postContact,getContact,getContactById,deleteContact,editContact},
  )(SaveContact);