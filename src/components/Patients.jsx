import { useState, useEffect } from 'react';
import { getPatients, createPatient } from '../services/patients';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients(token);
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };
    fetchPatients();
  }, [token]);

  const handleCreatePatient = async (patientData) => {
    try {
      const newPatient = await createPatient(patientData, token);
      setPatients([...patients, newPatient]);
    } catch (error) {
      console.error('Failed to create patient:', error);
    }
  };

  return (
    <div>
      {/* Patient list and creation UI */}
    </div>
  );
};