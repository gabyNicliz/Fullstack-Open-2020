import React from 'react';
import { Entry } from '../types';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';

interface EntryProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<EntryProps> = ({ entry }) => {
  const entryDetails = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />;
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareDetails entry={entry} />;
      default:
        assertNever(entry);
    }
  };

  return <React.Fragment>{entryDetails()}</React.Fragment>;
};

export default EntryDetails;