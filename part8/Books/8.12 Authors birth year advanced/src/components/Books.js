const Books = ({show, books}) => {
   if (!show) {
      return null
   }

   return (
      <div>
         <h2>books</h2>

         <table>
            <tbody>
               <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
               </tr>
               {books.map((b) => (
                  <tr key={b.title}>
                     <td>{b.title}</td>
                     <td>{b.author}</td>
                     <td>{b.published}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

export default Books