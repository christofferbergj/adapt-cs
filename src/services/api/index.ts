import axios from 'axios'

export default axios.create({
  baseURL: process.env.API_BASE,
  headers: {
    'Content-type': 'application/json',
  },
})
