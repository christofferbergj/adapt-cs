import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: {
    'Content-type': 'application/json',
  },
})

export default api
