/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub,
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const pubsub = new PubSub();

const MONGODB_URI = 'mongodb+srv://graphQlUser:SecretPass123@cluster0.dhmkg.mongodb.net/graphql-library?retryWrites=true&w=majority';
const JWT_SECRET = 'secrethehe';

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  }).catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!,
      born: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author');
      } if (args.author && !args.genre) {
        return Book.findOne({ author: args.author });
      } if (!args.author && args.genre) {
        return Book.find({ genres: args.genre }).populate('author');
      }
      return Book.find({ genres: args.genre, author: args.author }).populate('author');
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      console.log(context.currentUser);
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id });
      return books.length;
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);

      if (!author) return null;

      return {
        name: author.name,
        born: author.born,
        bookCount: author.bookCount,
      };
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context;
      let book;
      if (!currentUser) {
        throw new AuthenticationError('not logged in');
      }

      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
          });

          author = await author.save();
        }

        book = new Book({
          ...args,
          author: author._id,
        });

        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError('not logged in');
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.born;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
