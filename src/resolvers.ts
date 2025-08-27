import { v4 as uuidv4 } from 'uuid';
import db from './_db.js';
import { Game, Author, Review, AddGameType, UpdateGameType } from './myTypes.js';

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
  Game: {
    reviews(parent: Game) {
      return db.reviews.filter(review => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent: Author) {
      return db.reviews.filter(review => review.author_id === parent.id);
    }
  },
  Review: {
    game(parent: Review) {
      return db.games.find(game => game.id === parent.game_id);
    },
    author(parent: Review) {
      return db.authors.find(author => author.id === parent.author_id);
    }
  },
  Mutation: {
    deleteGame(parent: any, args: { id: string; }) {
      db.games = db.games.filter(game => game.id !== args.id);
      return db.games;
    },
    addGame(parent: any, args: { game: AddGameType }) {
      const newGame = {
        ...args.game,
        id: uuidv4()
      };

      db.games.push(newGame);
      return newGame;
    },
    updateGame(parent: any, args: { id: string; gameUpdates: UpdateGameType; }) {
      db.games = db.games.map(game => {
        if (game.id === args.id) {
          const updatedGame = {
            ...game,
            ...args.gameUpdates
          }
          return updatedGame;
        }

        return game;
      })

      const game = db.games.find(game => game.id === args.id);
      return game;
    }
  }
};

export default resolvers;

// query NestedQueryExample($reviewId: ID!) {
//   review(id: $reviewId) {
//     id
//     rating
//     game {
//       id
//       title
//       reviews {
//         id
//         rating
//         author {
//           id
//           name
//         }
//       }
//     }
//   }
// }