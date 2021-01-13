import React, { useState, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import getClient from '../../shared/utils/getClient'
import { createUser } from '../../shared/gql_operations/mutations'

export default (props) => {
  const [email, set_email] = useState('')
  const [name, set_name] = useState('')
  const [password, set_password] = useState('')
  const [repeat_password, set_repeat_password] = useState('')
  const [unmatched_passwords, set_unmatched_passwords] = useState(false)
  const [userExistsError, set_userExistsError] = useState(false)

  const [authStage, set_authStage] = useContext(AuthContext)

  const handleSignupSubmit = async (e) => {
    e.preventDefault()

    const client = getClient()
    if (password === repeat_password) {
      const variables = {
        data: {
          name,
          email,
          password
        }
      }
      try {
        const { data } = await client.mutate({ mutation: createUser, variables })
        set_authStage('login')
        //data.createUser.token

      } catch (error) {
        set_unmatched_passwords(false)
        set_userExistsError(true)
        console.log(error)
      }

    } else {
      set_userExistsError(false)
      set_unmatched_passwords(true)
    }
  }

  //login, validated, signUp
  return (
    <div className="__SignUp">
      <form action="" onSubmit={handleSignupSubmit}>
        <div>
          <label htmlFor="__name" autoComplete="off">Name: </label>
          <input type="text" value={name} onChange={(e) => set_name(e.target.value)} id='__name' />
        </div>
        <div>
          <label htmlFor="__email" autoComplete="off">Email: </label>
          <input type="text" value={email} onChange={(e) => set_email(e.target.value)} id='__email' />
        </div>
        <div>
          <label htmlFor="__password">Password: </label>
          <input type="password" value={password} onChange={(e) => set_password(e.target.value)} id='__password' placeholder='must be at least 8 characters in length' />
        </div>
        <div>
          <label htmlFor="__repeat_password">Repeat Password: </label>
          <input type="password" value={repeat_password} onChange={(e) => set_repeat_password(e.target.value)} id='__repeat_password' placeholder='must be at least 8 characters in length' />
        </div>
        {unmatched_passwords && <h3>Passwords do not match!</h3>}
        {userExistsError && <h3>User already exists!</h3>}

        <input type="submit" value='Attempt signup' />
      </form>
    </div>
  )
}