import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../screens';
import { Text } from 'react-native';
import authService from '../services/authService';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [error, setError] = React.useState(null);

  const handleLogin = async (email, password) => {
    try {
      const user = await authService.login(email, password);
      console.log('Logged in successfully:', user);
    } catch (error) {
      console.log('Error logging in:', error);
      setError(error.message);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const user = await authService.register(email, password);
      console.log('Registered successfully:', user);
    } catch (error) {
      console.log('Error registering:', error);
      setError(error.message);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLogin={handleLogin} error={error} />}
      </Stack.Screen>
      <Stack.Screen name="Register">
        {props => <RegisterScreen {...props} onRegister={handleRegister} error={error} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
