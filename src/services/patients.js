import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients'; // Update if backend is deployed

export const getPatients = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createPatient = async (patientData, token) => {
  try {
    const response = await axios.post(API_URL, patientData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
