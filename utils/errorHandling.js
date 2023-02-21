import { Alert } from 'react-native';

/**
 * Handles errors by showing an alert with the error message.
 * @param {Error} error The error to be handled.
 * @param {string} customErrorMessage A custom error message to be shown instead of the error's message.
 */
export function handleApiError(error, customErrorMessage) {
  let errorMessage = customErrorMessage || error.message || 'An unknown error occurred.';

  Alert.alert('Error', errorMessage);
}
