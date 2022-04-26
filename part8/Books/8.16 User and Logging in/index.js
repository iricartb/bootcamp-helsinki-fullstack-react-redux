const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET
              
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

   type User {
      username: String!
      favoriteGenre: String!
      id: ID!
   }
   
   type Token {
      value: String!
   }

   type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
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
      createUser(
         username: String!
         favoriteGenre: String!
      ): User
      login(
         username: String!
         password: String!
      ): Token
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
      },
      me: (root, args, context) => {
         return context.currentUser
      }
   },
   Mutation: {
      addBook: async (root, args, context) => {
         const currentUser = context.currentUser

         if (!currentUser) {
           throw new AuthenticationError("not authenticated")
         }

         let author = await Author.findOne({name: args.author});

         if (!author) {
            author = new Author({name: args.author})

            try {
               await author.save()
            } catch (error) {
               throw new UserInputError(error.message, { invalidArgs: args })
            }
         }

         const book = new Book({...args, author: author._id})
         
         try { 
            await book.save()
         } catch (error) {
            throw new UserInputError(error.message, { invalidArgs: args })
         }

         return book.populate('author')
      },
      editAuthor: async (root, args, context) => {
         const currentUser = context.currentUser

         if (!currentUser) {
           throw new AuthenticationError("not authenticated")
         }
         
         let findAuthor = await Author.findOne({name: args.name});
         
         if (findAuthor) {
            findAuthor.born = args.setBornTo
            
            try {
               await findAuthor.save()
            } catch (error) {
               throw new UserInputError(error.message, { invalidArgs: args })
            }
         }
         else findAuthor = null
         
         return findAuthor
      },
      createUser: async (root, args) => {
         const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
     
         return user.save()
            .catch(error => {
               throw new UserInputError(error.message, {
                  invalidArgs: args,
               })
            })
      },
      login: async (root, args) => {
         const user = await User.findOne({username: args.username})
     
         if (!user || args.password !== 'secret') {
            throw new UserInputError("wrong credentials")
         }

         const userForToken = {
            username: user.username,
            id: user._id,
         }
     
         return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
   }
}

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: async ({req}) => {
      const auth = req ? req.headers.authorization : null

      if (auth && auth.toLowerCase().startsWith('bearer ')) {
         const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

         const currentUser = await User.findById(decodedToken.id)
         return {currentUser}
      }
   }
})

server.listen().then(({ url }) => {
   console.log(`Server ready at ${url}`)
})