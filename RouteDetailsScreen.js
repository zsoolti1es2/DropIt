import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import routeService from '../services/routeService';

const RouteDetailsScreen = () => {
  const route = useRoute();
  const [routeDetails, setRouteDetails] = useState(null);

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await routeService.getRoute(route.params.id);
        if (response.success) {
          setRouteDetails(response.data);
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRouteDetails();
  }, [route.params.id]);

  const handleDelete = async () => {
    try {
      const response = await routeService.deleteRoute(route.params.id);
      if (response.success) {
        // Navigate back to the RouteListScreen after deleting the route
        navigation.goBack();
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {routeDetails ? (
        <View>
          <Text style={styles.title}>{routeDetails.title}</Text>
          <Text style={styles.description}>{routeDetails.description}</Text>
          <Button title="Delete" onPress={handleDelete} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RouteDetailsScreen;
