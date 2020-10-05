/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useField } from '../hooks/index';
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from '../queries';

const NewBook = ({ show, setMessage, setPage }) => {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetPublished, ...published } = useField('text');
  const { reset: resetGenre, ...genre } = useField('text');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message);
    },
  });

  if (!show) return null;

  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: +published.value,
        genres,
      },
    });
    resetTitle();
    resetAuthor();
    resetPublished();
    setGenres([]);
    setPage('authors');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    resetGenre();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres:
          {' '}
          {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
