/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
   const response = await axios.get(baseUrl)
   
   return response.data
}

const createNew = async (content) => {
   const newObject = { content, votes: 0 }
   const response = await axios.post(baseUrl, newObject)
   
   return response.data
}

const incrementVotes = async (anecdote) => {
   const updateObject = { ...anecdote, votes: (anecdote.votes + 1) }
   const response = await axios.put(`${baseUrl}/${anecdote.id}`, updateObject)
   
   return response.data
}

export default { 
   getAll, 
   createNew,
   incrementVotes
}