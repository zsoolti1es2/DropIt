import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, signOut } = useContext(AuthContext);

  const onSignOut = () => {
    // Reset the user state
    setUser(null);

    // Call the signOut function from the context
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user?.email}!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RouteList')}>
        <Text style={styles.buttonText}>View Routes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default HomeScreen;
