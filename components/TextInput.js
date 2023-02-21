import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

const TextInput = ({ style, ...props }) => {
  return (
    <RNTextInput
      style={[styles.input, style]}
      placeholderTextColor="#8A8F9E"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    height: 50,
    paddingLeft: 20,
    marginBottom: 10,
    fontSize: 16,
    color: '#161F3D',
  },
});

export default TextInput;
