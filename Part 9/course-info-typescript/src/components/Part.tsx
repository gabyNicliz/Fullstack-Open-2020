import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ coursePart }) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercise Count: <strong>{coursePart.exerciseCount}</strong></p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Group Project Count: <strong>{coursePart.groupProjectCount}</strong></p>
          <p>Exercise Count: <strong>{coursePart.exerciseCount}</strong></p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Description: {coursePart.description}</p>
          <p>Exercise Count: <strong>{coursePart.exerciseCount}</strong></p>
          <a href={coursePart.exerciseSubmissionLink}>{coursePart.exerciseSubmissionLink}</a>
        </div>
      );
    case 'Extra part':
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Description: {coursePart.description}</p>
          <p>Exercise Count: <strong>{coursePart.exerciseCount}</strong></p>
          <p>{coursePart.info}</p>
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;