import React, {Component} from 'react';
import { StyleSheet, RefreshControl, View, SafeAreaView, Text,FlatList, TouchableOpacity} from 'react-native';
import {getContact,getContactById,deleteContact,editContact} from '../redux/action';
import {connect} from 'react-redux';
import ContactDetail from '../modal/contactdetail';
import ContactList from '../pages/contactlist';
import Loading from '../modal/loader';

class Contact extends Component {
    constructor() {
      super();
      this.state = {
         value: '',
         loading: false,
         refreshing: false,
         profile: [],
         openModal: false,
         errorPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
         curProfile: []
      };
    }

    componentWillMount() {
      console.log("test")
    }

    componentDidMount() {
      this.getContact()
    }

    wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }

    async onRefresh() {
      this.setState({refreshing: true})
      .then(() => {this.asyncGetContact()})
    }

    getContact() {
      console.log("check")
        this.setState({loading: true})
        this.asyncGetContact()
    }

    async asyncGetContact() {
          this.props.getContact()
          .then(() => {
            try {
              if (this.props.items.status === 200) {
                let response = this.props.items.data;
                this.setState({profile: response.data, loading: false, refreshing: false});
              } else {
                alert('oopss... something went wrong!')
                this.setState({
                  profile: [],
                  loading: false,
                  refreshing: false
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
        console.log(item)
        this.setState({
            openModal: true,
            curProfile: {
              firstName: item.firstName,
              lastName: item.lastName,
              age: item.age,
              photo: item.photo,
              key: item.id,
              errorPhoto: this.state.errorPhoto
            }
        })
      }

      closeModal() {
        this.setState({openModal: false})
        this.getContact()
      }

render() {
    return (
  <View style={styles.container}>
    <Loading isVisible={this.state.loading}/>
        <FlatList
          data={ this.state.profile }
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => <ContactList itemKey={item.id} 
            firstname={item.firstName} 
            lastname={item.lastName} 
            age={item.age} 
            image={item.photo}
            errorPhoto= {this.state.errorPhoto} 
            onGetItem={this.GetItem.bind(this, item)} />}
         />
    <ContactDetail 
      isVisible={this.state.openModal} 
      onClose={() => this.closeModal()} 
      profile={this.state.curProfile} 
    />
        <TouchableOpacity
       style={styles.floatbutton} onPress={() => this.props.navigation.replace('Save Contact', {
        onGoBack: () => this.getContact,
      })}
    >
     <Text>+</Text>
  </TouchableOpacity>
  </View>
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
    },
  container: {
    flex: 1
  },
  title: {
    textAlign: 'center',
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
    {getContact,getContactById,deleteContact,editContact},
  )(Contact);