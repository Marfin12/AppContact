import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import Loader from '../modal/loader';
import { Appbar } from 'react-native-paper';

const App = (props) => {
    return (
  <View style={styles.container}>
      <TouchableHighlight
          style={styles.profileImgContainer}
        >
    <Image source={props.image} style={styles.profileImg} />
    </TouchableHighlight>
      <Text style={styles.item} onPress={props.onGetItem.bind(props,props.itemKey)} > {props.itemKey} </Text>
  </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginVertical: 16
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 50,
    width: 50,
    borderRadius: 40,
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 40,
    marginVertical: 10
  },
});

  export default App;
  /*<Button
  title="Press me"
  onPress={() => this.getContact()}
/>
 profile: {
            firstname: 'andy',
            lastname: 'wick',
            age: 10,
            photo: "N/A"
         }
*/