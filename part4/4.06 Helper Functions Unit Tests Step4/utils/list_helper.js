/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
   const reducer = (sum, item) => {
      return sum + item.likes
   }

   return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
   const reducer = (item1, item2) => {
      return ((item1.likes > item2.likes) ? item1 : item2)
   }

   return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
   let selectedAuthor = { author: '', blogs: 0 }
   let results = {}

   blogs.forEach((item, index) => {
      if (results[item.author] !== undefined) {
         results[item.author].blogs++
      }
      else {
         results[item.author] = {
            author: item.author,
            blogs: 1
         }
      }
   })

   for(var index in results) {
      if (results[index].blogs > selectedAuthor.blogs) {
         selectedAuthor = results[index]
      }
   }

   return selectedAuthor
}

module.exports = {
   dummy,
   totalLikes,
   favoriteBlog,
   mostBlogs
}