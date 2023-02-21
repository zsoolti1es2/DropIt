import { API_URL } from "../utils/constants";
import { postRequest } from "../utils/apiUtils";

export const createPaymentIntent = async (amount, currency, description) => {
  try {
    const response = await postRequest(`${API_URL}/payments/create-payment-intent`, {
      amount,
      currency,
      description,
    });
    return response;
  } catch (error) {
    console.error("Error creating payment intent", error);
    throw error;
  }
};

export const confirmPayment = async (paymentIntentId, paymentMethodId) => {
  try {
    const response = await postRequest(`${API_URL}/payments/confirm-payment`, {
      paymentIntentId,
      paymentMethodId,
    });
    return response;
  } catch (error) {
    console.error("Error confirming payment", error);
    throw error;
  }
};
