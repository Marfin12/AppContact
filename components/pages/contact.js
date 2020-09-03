import React, {Component} from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text,FlatList, Alert, TouchableOpacity} from 'react-native';
import {postContact,getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import { Appbar } from 'react-native-paper';
import ContactDetail from '../modal/contactdetail';
import ContactList from '../pages/contactlist';
import myImage from '../images/imageanalysis.png';

class Contact extends Component {
    constructor() {
      super();
      this.state = {
         value: '',
         loading: false,
         profile: [],
         openModal: false
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

    getContact() {
        this.setState({loading: true})
        this.asyncGetContact()
    }

    async asyncDeleteContact() {
        this.props.deleteContact(this.state.value)
        .then(() => {
          try {
            let status = this.props.items.data.status;
            let detail = this.props.items.data.detail;
            let response_time = this.props.items.data.response_time;
            if (this.props.items.status === 200) {
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

    async asyncEditContact() {
        let {firstname, lastname, age, photo} = this.state.profile
        this.props.editContact(this.state.value,firstname,lastname,age,photo)
        .then(() => {
          try {
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

    async asyncGetContact() {
          this.props.getContact()
          .then(() => {
            try {
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

    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
      }

      GetItem (item) {
        this.setState({
            openModal: true
        })
        }

render() {
    return (
  <SafeAreaView style={styles.container}>
      <Appbar style={styles.topbar}>
      </Appbar>
      <Appbar style={styles.downbar}>
        <Text style={styles.contact}>Contact</Text>
      </Appbar>
      <ContactDetail isVisible={this.state.openModal} onClose={() => this.setState({openModal: false})}/>
        <FlatList
          data={ this.state.profile }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          style={styles.contactlist}
          renderItem={({item}) => <ContactList itemKey={item.key} firstname={item.firstname} lastname={item.lastname} age={item.age} image={myImage} onGetItem={this.GetItem.bind(this, item.key)} />}
         />
        <TouchableOpacity
       style={styles.floatbutton}
    >
     <Text>+</Text>
  </TouchableOpacity>
  </SafeAreaView>
    )
}
}

const styles = StyleSheet.create({
   topbar: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    contact: {

    },
    contactlist: {
        marginTop: 56
    },
    floatbutton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 25,                                                    
        right: 10,
        height:70,
        backgroundColor:'#fff',
        borderRadius:100,
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  )(Contact);
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