import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, TouchableOpacity } from 'react-native';

const App = (props) => {
    const [error, setError] = useState(false)
    const handleErrorPhoto = () => {
      setError(true)
    }
    return (
  <TouchableOpacity style={styles.container} onPress={props.onGetItem.bind(props,props.itemKey)}>
      <TouchableHighlight
          style={styles.profileImgContainer}
        >
    <Image 
    onError={() => handleErrorPhoto()} 
    source={!error?{uri: props.image}:{uri: props.errorPhoto}}
    style={styles.profileImg} 
    />
    </TouchableHighlight>
    <View>
      <Text style={styles.firstname}  > {props.firstname} </Text>
      <Text style={styles.lastname} > {props.lastname} </Text>
      </View>
  </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  firstname: {
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 18,
    height: 44,
  },
  lastname: {
    paddingLeft: 10,
    paddingBottom: 15,
    fontSize: 14,
    color: 'gray'
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