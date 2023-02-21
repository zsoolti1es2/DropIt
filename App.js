import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from './firebase/config';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });

    return authSubscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) {
    return null; // or a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="App"
            component={AppStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
