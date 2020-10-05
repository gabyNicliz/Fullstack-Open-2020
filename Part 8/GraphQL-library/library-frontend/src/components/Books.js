/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const { data, loading } = useQuery(ALL_BOOKS);

  if (!show) return null;

  if (loading) return <div>loading...</div>;

  const books = [...data.allBooks];

  let genres = [];
  genres = genres.concat(...books.map((book) => book.genres));
  genres = [...new Set(genres)];

  const filteredBooks = books.filter((book) => (genre ? book.genres.includes(genre) : book));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button onClick={() => setGenre(null)}>all books</button>
    </div>
  );
};

export default Books;
