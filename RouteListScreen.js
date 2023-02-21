import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getRoutes } from '../api/routes';

const RouteListScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getRoutes().then(data => {
        setRoutes(data);
      });
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>From: {item.pickupPoint}</Text>
      <Text style={styles.title}>To: {item.destination}</Text>
      <Text style={styles.title}>Departure: {item.date}</Text>
      <Text style={styles.title}>Price: {item.price}</Text>
      <Text style={styles.title}>Parcel size: {item.parcelSize}</Text>
      <Text style={styles.title}>Contact person: {item.contactPerson}</Text>
      <Text style={styles.title}>Contact phone: {item.contactPhone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default RouteListScreen;
