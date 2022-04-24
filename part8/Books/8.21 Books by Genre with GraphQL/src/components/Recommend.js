import BooksList from './BooksList'

const Recommend = ({show, genre}) => {
   if (!show) {
      return null
   }

   return (
      <div>
         <h2>books</h2>

         <p>books in your favorite genre {genre}</p>

         <BooksList genre={genre} />
      </div>
   )
}

export default Recommend