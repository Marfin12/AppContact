import React, {Component} from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text,TextInput, TouchableHighlight, Image} from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import { Appbar } from 'react-native-paper';
import myImage from '../images/imageanalysis.png';
import uploadimage from '../images/uploadsample.png';
import { Icon } from 'react-native-elements';


class SaveContact extends Component {
    constructor() {
      super();
      this.state = {
         value: '',
         loading: false,
         profile: []
      };
    }

    postContact() {
        this.setState({loading: true})
        this.asyncPostContact()
    }

      async asyncPostContact() {
        let {firstname, lastname, age, photo} = this.state.profile
        this.props.postContact(firstname,lastname,age,photo)
        .then(() => {
          try {
            let status = this.props.items.data.status;
            let detail = this.props.items.data.detail;
            let response_time = this.props.items.data.response_time;
            //console.log(this.props)
            if (this.props.items.status === 200) {
              //console.log(this.props.items.data["data"][0].firstName)
              let response = this.props.items.data;
              this.setState({profile: response.data, loading: false});
              alert("Contact has been saved!")
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

render() {
    return (
  <SafeAreaView style={styles.container}>
      <Appbar style={styles.topbar}>
      </Appbar>
      <Appbar style={styles.downbar}>
      <Text style={styles.contact}>{'<'}</Text>
      <View style={styles.savecontact}>
      <TouchableOpacity onPress={this.postContact}>
        <Text>Save</Text>
      </TouchableOpacity>
      </View>
      </Appbar>
      <View style={styles.formMenu}>
      <TouchableHighlight
          style={[styles.profileImgContainer, { marginVertical: 70 }]}
        >
    <Image source={myImage} style={styles.profileImg} />
    </TouchableHighlight>
    <TouchableHighlight
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
      value={this.state.value}
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
      value={this.state.value}
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
      value={this.state.value}
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