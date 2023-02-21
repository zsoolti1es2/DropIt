import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { firebase } from '../firebase/config';

const PaymentScreen = ({ navigation }) => {
  const route = useRoute();
  const { routeId } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePressConfirmPayment = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    const user = firebase.auth().currentUser;
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    try {
      const paymentRef = firebase.firestore().collection('payments').doc();
      await paymentRef.set({
        routeId: routeId,
        userId: user.uid,
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        date: firebase.firestore.Timestamp.now(),
      });

      setIsLoading(false);

      Alert.alert('Success', 'Payment confirmed.');
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'There was an error processing your payment.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter payment details</Text>
      <TextInput
        style={styles.input}
        placeholder="Card number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
        maxLength={16}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiry date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        keyboardType="number-pad"
        maxLength={5}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        keyboardType="number-pad"
        maxLength={3}
      />
      <TouchableOpacity style={styles.button} onPress={handlePressConfirmPayment}>
        {isLoading ? <Text style={styles.buttonText}>Loading...</Text> : <Text style={styles.buttonText}>Confirm Payment</Text>}
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
