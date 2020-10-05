/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_BOOKS, ME } from '../queries';

const Recommended = ({ show }) => {
  const { data: meQueryData, loading: meQueryLoading } = useQuery(ME);

  const favoriteGenre = meQueryData?.me?.favoriteGenre;

  const { data: allBooksQueryData, loading: allBooksQueryLoading } = useQuery(ALL_BOOKS,
    { variables: { genre: favoriteGenre } });

  if (!show) return null;

  if (meQueryLoading) return <div>current user loading...</div>;

  if (allBooksQueryLoading) return <div>books loading...</div>;

  const books = [...allBooksQueryData.allBooks];
  return (
    <div>
      <h2>recommendations</h2>
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
