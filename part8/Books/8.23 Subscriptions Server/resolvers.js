const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const JWT_SECRET = process.env.SECRET

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

         pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

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
   },
   Subscription: {
      bookAdded: {
         subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      }
   }
}

module.exports = resolvers