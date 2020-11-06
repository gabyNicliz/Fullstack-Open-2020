/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSSN());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  try {
    res.send(patient);
  } catch (error) {
    res.status(400).send('patient not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const patientId: string = req.params.id;

  const entry = req.body;

  try {
    const updatedPatient = patientService.addEntry(entry, patientId);
    res.send(updatedPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
