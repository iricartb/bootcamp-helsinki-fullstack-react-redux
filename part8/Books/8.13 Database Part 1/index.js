const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
                                                        
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('connected to MongoDB')
   })
   .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
   }
)

const typeDefs = gql`
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
      bookCount: Int!
   }

   type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
   }

   type Mutation {
      addBook(
         title: String!
         published: Int!
         author: String!
         genres: [String!]!
      ): Book
      editAuthor(
         name: String!
         setBornTo: Int!
      ): Author
   }
`

const resolvers = {
   Query: {
      bookCount: () => books.length,
      authorCount: () => authors.length,
      allBooks: (root, args) => {
         let filteredBooks = books

         if (args.author !== undefined) {
            filteredBooks = filteredBooks.filter((book) => args.author === book.author)
         }

         if (args.genre !== undefined) {
            filteredBooks = filteredBooks.filter((book) => book.genres.includes(args.genre))
         }

         return filteredBooks
      },
      allAuthors: () => 
         authors.map((author) => (
            { ...author, 'bookCount': books.filter((book) => (author.name === book.author)).length }
         )),
   },
   Mutation: {
      addBook: async (root, args) => {
         let author = await Author.findOne({name: args.author});

         if (!author) {
            author = new Author({name: args.author})

            await author.save()
         }

         const book = new Book({...args, author: author._id})
         
         return book.save()
      },
      editAuthor: (root, args) => {
         let findAuthor = authors.find((author) => author.name === args.name)

         if (findAuthor !== undefined) {
            findAuthor.born = args.setBornTo
         }
         else findAuthor = null
         
         return findAuthor
      }
   }
}

const server = new ApolloServer({
   typeDefs,
   resolvers,
})

server.listen().then(({ url }) => {
   console.log(`Server ready at ${url}`)
})