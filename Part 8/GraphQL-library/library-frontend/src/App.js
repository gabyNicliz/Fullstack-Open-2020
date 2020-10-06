/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Recommended from './components/Recommended';
import { BOOK_ADDED, ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const tempToken = localStorage.getItem('graphql-library-user-token');
    if (tempToken) setToken(tempToken);
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      setMessage(`${addedBook.title} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      updateCacheWith(addedBook);
    },
  });

  const handleLogout = (event) => {
    event.preventDefault();
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notification message={message} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? (
            <>
              <button onClick={() => setPage('recommended')}>recommended</button>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={handleLogout}>logout</button>
            </>
          )
          : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors setMessage={setMessage} show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook
        setMessage={setMessage}
        show={page === 'add'}
        setPage={setPage}
        updateCacheWith={updateCacheWith}
      />
      <LoginForm setMessage={setMessage} setToken={setToken} show={page === 'login'} setPage={setPage} />
      <Recommended show={page === 'recommended'} />
    </div>
  );
};

export default App;
