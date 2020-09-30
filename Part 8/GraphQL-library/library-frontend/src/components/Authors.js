/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useField } from '../hooks/index';

const Authors = ({ show }) => {
  const { data, loading } = useQuery(ALL_AUTHORS);
  const [editAuthor, result] = useMutation(EDIT_AUTHOR,
    { refetchQueries: [{ query: ALL_AUTHORS }] });
  const { reset: resetBirthdate, ...birthdate } = useField('text');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found');
    }
  }, [result.data]);

  if (!show) return null;

  if (loading) return <div>loading...</div>;

  const authors = [...data.allAuthors];

  const editBirthdate = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name: selectedAuthor, born: +birthdate.value } });
    resetBirthdate();
  };

  const authorsNames = authors.map((a) => ({ value: a.name, label: a.name }));
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h3>set birthdate</h3>
      <form onSubmit={editBirthdate}>
        <div>
          <Select
            placeholder="author"
            onChange={({ label }) => setSelectedAuthor(label)}
            options={authorsNames}
          />
        </div>
        <div>
          born
          <input {...birthdate} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
