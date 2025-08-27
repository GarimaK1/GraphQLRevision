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

export default resolvers;