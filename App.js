import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './Navigation';
import { AuthContext } from './context/authContext';
import { getToken, storeToken, removeToken } from './utils/tokenStorage';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: async (token) => {
      setToken(token);
      await storeToken(token);
    },
    signOut: async () => {
      setToken(null);
      await removeToken();
    },
  }), []);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await getToken();

      if (userToken) {
        setToken(userToken);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {token ? (
            <Stack.Screen name="App" component={Navigation} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
