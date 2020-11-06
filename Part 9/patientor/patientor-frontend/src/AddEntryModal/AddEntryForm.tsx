/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Select } from "semantic-ui-react";

import { NewEntry } from '../types';
import EntryTypesForms from './EntryTypesForm';

export type EntryFormValues = NewEntry;

const isString = (str: any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect value: ${str}`);
  }
  return str;
};

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions = [
  {
    key: 'Health Check',
    text: 'Health Check',
    value: 'HealthCheck',
  },
  {
    key: 'Hospital',
    text: 'Hospital',
    value: 'Hospital',
  },
  {
    key: 'OccupationalHealthcare',
    text: 'OccupationalHealthcare',
    value: 'OccupationalHealthcare',
  }
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [entryType, setEntryType] = useState('HealthCheck');

  return (
    <div>
      <Select
        placeholder={'Select Entry Type'}
        options={entryTypeOptions}
        onChange={(e, { value }) => setEntryType(parseString(value))}
      />
      <div>
        <EntryTypesForms
          entryType={entryType}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default AddEntryForm;