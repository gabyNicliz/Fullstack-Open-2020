import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcare } from '../types';

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcare;
}

const OccupationalHealthcareDetails: React.FC<OccupationalHealthcareProps> = ({ entry }) => {

  return (
    <Segment>
      <div>
        <strong>{entry.date}</strong>
        <Icon name='stethoscope' size='large' />
      </div>
      <div>
        <p>{entry.description}</p>
      </div>
    </Segment>
  );
};

export default OccupationalHealthcareDetails;