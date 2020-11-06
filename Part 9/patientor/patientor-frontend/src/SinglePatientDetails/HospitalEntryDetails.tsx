import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

interface HospitalEntryProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails: React.FC<HospitalEntryProps> = ({ entry }) => {
  return (
    <Segment>
      <div>
        <strong>{entry.date}</strong>
        <Icon name='hospital' size='large' />
      </div>
      <div>
        <p>{entry.description}</p>
      </div>
    </Segment>
  );
};

export default HospitalEntryDetails;