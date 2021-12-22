import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : 'http://localhost:3000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
})

export default api
