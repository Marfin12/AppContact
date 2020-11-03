import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './components/redux/reducer';
import Contact from './components/pages/contact';
import SaveContact from './components/pages/savecontact';
import myImage from './components/images/uploadsample.png'

let middleware = applyMiddleware(thunk);

const store = createStore(reducers, compose(middleware));

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />

      <Button
        color="red"
        title="Go to Profile"
        onPress={() => navigation.navigate('Profiles')}
      />
    </View>
  );
}

// Screen Detail
function DetailsScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />

      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

// Screen Profile
function ProfilesScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        color="black"
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        color="green"
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
function LogoTitle() {
  return (
    <Text>Save Contact</Text>
  );
}
// Stack berguna untuk routing aplikasi
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Contact">
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Save Contact" component={SaveContact}  options={
          ({ navigation, route }) => ({
            headerTitle: props => <LogoTitle {...props} />,
          })} />
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

/*<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Details" component={DetailsScreen} />
  <Stack.Screen name="Profiles" component={ProfilesScreen} />
</Stack.Navigator>
</NavigationContainer>*/