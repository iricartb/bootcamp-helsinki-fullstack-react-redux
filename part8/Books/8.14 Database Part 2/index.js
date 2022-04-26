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
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
         let filteredBooks = await Book.find({}).populate('author')

         if (args.author !== undefined) {
            let author = await Author.findOne({name: args.author})

            if (author) {
               filteredBooks = await Book.find({author: author._id}).populate('author')
            }
            else filteredBooks = []
         }

         if (args.genre !== undefined) {
            filteredBooks = await Book.find({genres: { $in: [ args.genre ] } }).populate('author')
         }

         return filteredBooks
      },
      allAuthors: async () => { 
         let authors = await Author.find({})
         let books = await Book.find({})

         return authors.map((author) => (
            { ...author._doc, 'bookCount': books.filter((book) => (author._doc._id.toString() === book.author.toString())).length }
         ))
      }
   },
   Mutation: {
      addBook: async (root, args) => {
         let author = await Author.findOne({name: args.author});

         if (!author) {
            author = new Author({name: args.author})

            await author.save()
         }

         const book = new Book({...args, author: author._id})
         
         await book.save()

         return book.populate('author')
      },
      editAuthor: async (root, args) => {
         let findAuthor = await Author.findOne({name: args.name});
         
         if (findAuthor) {
            findAuthor.born = args.setBornTo
            
            await findAuthor.save()
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