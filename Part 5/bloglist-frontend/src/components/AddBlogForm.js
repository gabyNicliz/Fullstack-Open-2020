import React from 'react';

const AddBlogForm = ({ handleSubmitNewBlog, newTitle, newAuthor, newURL, setNewTitle, setNewAuthor, setNewURL }) => {
  return (
    <div>
      <h2>create new</h2>
      <br></br>
      <form onSubmit={handleSubmitNewBlog}>
        <div>
          title:
          <input 
            type='text'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  );
}

export default AddBlogForm;