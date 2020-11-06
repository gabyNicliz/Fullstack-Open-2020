import React from 'react';
import { ContentProps } from '../types';

const Total: React.FC<ContentProps> = ({ courseParts }) => {
  const totalExercises: number = courseParts.reduce((sum, part) => 
    sum + part.exerciseCount
  , 0);

  return (
    <div>
      Number of exercises: <strong>{" " + totalExercises}</strong>
    </div>
  );
}

export default Total;