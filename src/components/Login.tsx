import { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState<string>('')

  return (
    <div>
      <input placeholder="email" />
    </div>
  )
}
