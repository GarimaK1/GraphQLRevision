import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import db from './_db.js';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => db.books,
    book: (parent: any, args: { title: string; }) => db.books.find(book => book.title === args.title),
    games() {
      return db.games
    },
    game(parent: any, args: { id: string; }) {
      return db.games.find((game) => game.id === args.id);
    },
    authors: () => db.authors,
    author(parent: any, args: { id: string; }) {
      return db.authors.find(author => author.id === args.id);
    },
    reviews() {
      return db.reviews
    },
    review(parent: any, args: { id: string; }) {
      return db.reviews.find(review => review.id === args.id);
    }
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});

console.log(`🚀  Server ready at: ${url}`);