/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Diagnosis,
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  SickLeave
} from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (str: any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isStringArray = (array: any[]): array is string[] => {
  return array.every((item) => isString(item));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseString = (str: any, type: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${type}: ${str}`);
  }
  return str;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
  }

  return healthCheckRating;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
    throw new Error(`Incorrect diagnosis codes: ${diagnosisCodes}`);
  }

  return diagnosisCodes;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) {
    throw new Error('Incorrect sick leave');
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) {
    throw new Error('Incorrect or missing discharge');
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria, 'criteria'),
  };
};

export const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseString(obj.name, 'name'),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn, 'ssn'),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation, 'occupation'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: obj.entries as Entry[],
  };
};

export const toNewEntry = (obj: any): NewEntry => {
  const newEntry = obj as NewEntry;

  const newBaseEntry: NewBaseEntry = {
    date: parseDate(newEntry.date),
    description: parseString(newEntry.description, 'description'),
    specialist: parseString(newEntry.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(newEntry.diagnosisCodes),
  };

  switch (newEntry.type) {
    case 'Hospital':
      return {
        ...newBaseEntry,
        type: newEntry.type,
        discharge: parseDischarge(obj.discharge),
      };
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: newEntry.type,
        healthCheckRating: parseHealthCheckRating(newEntry.healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        ...newBaseEntry,
        type: newEntry.type,
        employerName: parseString(newEntry.employerName, 'employer name'),
        sickLeave: parseSickLeave(newEntry.sickLeave)
      };
    default:
      return assertNever(newEntry);
  }
};