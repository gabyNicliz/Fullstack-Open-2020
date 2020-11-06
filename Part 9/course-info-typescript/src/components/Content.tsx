import React from 'react';
import { ContentProps } from '../types';
import Part from './Part';

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part) => {
        return (
          <Part key={part.name} coursePart={part} />
        )
      })}
    </>
  )
}

export default Content;