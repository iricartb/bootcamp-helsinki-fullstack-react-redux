/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = async () => {
   const response = await axios.get(baseUrl)
  
   return response.data
}

const create = async newObject => {
   const config = { 
      headers: { Authorization: token }
   }

   const response = await axios.post(baseUrl, newObject, config)

   return response.data
}

const updateById = async (id, newObject) => {
   const config = { 
      headers: { Authorization: token }
   }

   const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
   
   return response.data
}

const deleteById = async (id) => {
   const config = { 
      headers: { Authorization: token }
   }

   const response = await axios.delete(`${baseUrl}/${id}`, config)
   
   return response.data
}

export default { getAll, create, updateById, deleteById, setToken }