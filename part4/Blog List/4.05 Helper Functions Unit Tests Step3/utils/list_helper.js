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

module.exports = {
   dummy,
   totalLikes,
   favoriteBlog
}