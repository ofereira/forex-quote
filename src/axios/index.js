import axios from 'axios'

export const HTTP = axios.create({
  baseURL: process.env.API_LOCATION,
  params: {
    api_key: process.env.API_KEY
  }
})
