import React from 'react';
import { NewEntry } from '../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

interface EntryTypeProps {
  entryType: string;
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const EntryTypesForms: React.FC<EntryTypeProps> = ({ entryType, onSubmit, onCancel }) => {
  switch (entryType) {
    case 'HealthCheck':
      return (
        <HealthCheckForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    case 'Hospital':
      return (
        <HospitalForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareForm
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      );
    default:
      return null;
  }
};

export default EntryTypesForms;