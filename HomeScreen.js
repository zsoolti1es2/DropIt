import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getRoutes } from '../api/routes';

export default function HomeScreen({ navigation }) {
  const [routes, setRoutes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getRoutes().then((data) => {
        setRoutes(data);
      });
    }
  }, [isFocused]);

  const handleRoutePress = (route) => {
    navigation.navigate('RouteDetails', { route });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.routeContainer} onPress={() => handleRoutePress(item)}>
      <View style={styles.route}>
        <View style={styles.routeHeader}>
          <Text style={styles.routeTitle}>{item.title}</Text>
          <Text style={styles.routeDate}>{new Date(item.date).toLocaleString()}</Text>
        </View>
        <Text style={styles.routeDescription}>{item.description}</Text>
        <View style={styles.routeFooter}>
          <View style={styles.routePrice}>
            <Ionicons name="md-cash" size={16} color="#4CAF50" />
            <Text style={styles.routePriceText}>${item.price}</Text>
          </View>
          <View style={styles.routeSeats}>
            <Ionicons name="md-cart" size={16} color="#4CAF50" />
            <Text style={styles.routeSeatsText}>{item.size}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  routeContainer: {
    marginBottom: 16,
  },
  route: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 16,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  routeDate: {
    color: '#999',
    fontSize: 14,
  },
  routeDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  routeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routePrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routePriceText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4CAF50',
  },
  routeSeats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeSeatsText: {
    marginLeft: 4,
    fontSize: 14,
  },
};
