import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/screens/HomeScreen';
import {DetailScreen} from './src/screens/DetailScreen';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

let ScreenStack = createNativeStackNavigator();
const Stack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ScreenStack.Navigator>
          <ScreenStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Doggy McDogface',
              headerStyle: {
                backgroundColor: '#5c6bc0',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <ScreenStack.Screen
            name="Details"
            component={DetailScreen}
            options={({route}) => {
              let {name} = route.params;
              let {subBreed} = route.params;
              return {
                title: subBreed
                  ? subBreed.charAt(0).toUpperCase() + subBreed.slice(1)
                  : name.charAt(0).toUpperCase() + name.slice(1),
                headerStyle: {
                  backgroundColor: '#5c6bc0',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              };
            }}
          />
        </ScreenStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const App = () => {
  return <Stack />;
};

export default App;
