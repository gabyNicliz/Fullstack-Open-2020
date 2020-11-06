import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HealthCheckEntry, HealthCheckRating } from '../types';

interface HealthCheckProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails: React.FC<HealthCheckProps> = ({ entry }) => {
  const getHealthRatingIcon = (healthCheckRating: HealthCheckRating) => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <Icon name='heart' color='green' />;
      case HealthCheckRating.LowRisk:
        return <Icon name='heart' color='yellow' />;
      case HealthCheckRating.HighRisk:
        return <Icon name='heart' color='orange' />;
      case HealthCheckRating.CriticalRisk:
        return <Icon name='heart' color='red' />;
    }
  };

  return (
    <Segment>
      <div>
        <strong>{entry.date}</strong>
        <Icon name='user md' size='large' />
      </div>
      <div>
        <p>{entry.description}</p>
      </div>
      <div>
        {getHealthRatingIcon(entry.healthCheckRating)}
      </div>
    </Segment>
  );
};

export default HealthCheckEntryDetails;