import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../firebase/config';

const RouteDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { routeId } = route.params;
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const getRouteData = async () => {
      const routeRef = firebase.firestore().collection('routes').doc(routeId);
      const doc = await routeRef.get();
      const routeData = doc.data();
      setRouteData(routeData);
    };

    getRouteData();
  }, []);

  const handlePressSendParcel = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      navigation.navigate('SendParcel', { routeId: routeId });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      {routeData ? (
        <View style={styles.routeContainer}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeTitle}>{routeData.title}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.routeDetails}>
            <Text style={styles.routeLabel}>From:</Text>
            <Text style={styles.routeValue}>{routeData.startLocation}</Text>
            <Text style={styles.routeLabel}>To:</Text>
            <Text style={styles.routeValue}>{routeData.endLocation}</Text>
            <Text style={styles.routeLabel}>Departure:</Text>
            <Text style={styles.routeValue}>{routeData.departureDate.toDate().toLocaleString()}</Text>
            <Text style={styles.routeLabel}>Price:</Text>
            <Text style={styles.routeValue}>${routeData.price}</Text>
            <Text style={styles.routeLabel}>Parcel size:</Text>
            <Text style={styles.routeValue}>{routeData.parcelSize}</Text>
          </View>
          <View style={styles.routeFooter}>
            <TouchableOpacity style={styles.sendParcelButton} onPress={handlePressSendParcel}>
              <Text style={styles.sendParcelText}>Send Parcel</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  routeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  routeDetails: {
    marginTop: 20,
    marginBottom: 10,
  },
  routeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
routeValue: {
    fontSize: 16,
    marginTop: 5,
  },
  routeFooter: {
    alignItems: 'center',
  },
  sendParcelButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  sendParcelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RouteDetailsScreen;
