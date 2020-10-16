/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';
import { v1 as uuidv1 } from 'uuid';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (
    patient: NewPatient
  ): Patient => {

    const newPatient: Patient = {
      id: String(uuidv1()),
      ...patient,
    };

    patients.push(newPatient);
    return newPatient;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,  
  getPatientsWithoutSSN,
  addPatient,
};
