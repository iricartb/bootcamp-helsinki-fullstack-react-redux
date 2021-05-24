/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
   const response = await axios.get(baseUrl)
  
   return response.data
}

export default { getAll }