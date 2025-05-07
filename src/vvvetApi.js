// vvvetApi.js
import axios from 'axios';

export const submitVvvetForm = async (formData) => {
  try {
    const response = await axios.post('http://localhost:5002/api/vvet/add', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};
