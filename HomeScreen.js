import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import RouteForm from '../components/RouteForm';
import RouteList from '../components/RouteList';
import { getRoutes } from '../services/routeService';

const HomeScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {
    setIsLoading(true);
    const response = await getRoutes();
    setIsLoading(false);

    if (response.success) {
      setRoutes(response.data);
    } else {
      console.log(response.error);
      // Handle error
    }
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {isFormVisible ? (
        <RouteForm toggleForm={toggleForm} loadRoutes={loadRoutes} />
      ) : (
        <>
          <Text style={styles.title}>Route List</Text>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <RouteList routes={routes} navigation={navigation} />
          )}
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isFormVisible ? 'Close' : 'Add Route'}
          onPress={toggleForm}
          buttonStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: 200,
  },
});

export default HomeScreen;
