import React, {Component} from 'react';
import { StyleSheet, Button, TextInput, Image, View, SafeAreaView, Text,TouchableOpacity, TouchableHighlight} from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import { Appbar } from 'react-native-paper';
import myImage from '../images/imageanalysis.png';
import uploadimage from '../images/uploadsample.png';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';


class UploadUrl extends Component {
    constructor(props) {
      super(props);
      this.state = {
         imageUrl: ''
      };
    }

render() {
    return (
  <SafeAreaView style={styles.container}>
      <Modal isVisible={this.props.isVisible}>
      <TouchableOpacity>
          <View style={styles.button}>
            <Text>Upload Url: </Text>
            <TextInput></TextInput>
          </View>
        </TouchableOpacity>
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
  )(UploadUrl);