import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';

const TextInput = ({ label, placeholder, secureTextEntry, onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default TextInput;
