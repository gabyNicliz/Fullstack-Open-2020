/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';
import { v1 as uuidv1 } from 'uuid';
import { Patient, PatientWithoutSSN, NewPatient, Entry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
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

const addEntry = (entry: Entry, patientId: string): Patient | undefined => {
  const id = uuidv1();
  const patient = findPatientById(patientId);
  const newEntry = {
    ...entry,
    id
  };

  patient?.entries.push(newEntry);

  return patient;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

export default {
  getPatients,
  findPatientById,
  getPatientsWithoutSSN,
  addPatient,
  addEntry,
};
