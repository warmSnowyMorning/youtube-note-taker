import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import getClient from '../../shared/utils/getClient'
import { login } from '../../shared/gql_operations/mutations'
import async_setContentJSauth from '../utils/async_setContentJSauth'


export default (props) => {
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')
  const [authStage, set_authStage] = useContext(AuthContext)
  const [stay_signed_in, set_stay_signed_in] = useState(false)
  const [loginAttemptError, set_loginAttemptError] = useState(false)

  useEffect(() => {
    chrome.storage.local.get(null, (items) => {
      console.log(items.options.stay_signed_in)
      set_stay_signed_in(items.options.stay_signed_in)
    })
  }, [])


  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const client = getClient()

    try {
      const variables = {
        data: {
          email,
          password
        }
      }
      const { data } = await client.mutate({ mutation: login, variables })
      console.log(data)

      chrome.storage.local.set({
        token: data.login.token,
        ...(stay_signed_in && {
          options: {
            stay_signed_in: true
          }
        })
      }, () => {
        set_authStage('validated')

        async_setContentJSauth('validated', data.login.token)
      })
    } catch (error) {
      set_loginAttemptError(true)
      console.log(error)
    }
  }
  const handle_stay_signed_in_desire = (e) => {
    chrome.storage.local.set({
      options: {
        stay_signed_in: !stay_signed_in
      }
    }, () => {
      set_stay_signed_in(!stay_signed_in)
    })
  }

  //login, validated, signUp
  return (
    <div className="__Login">
      <form action="" onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="__email">Email: </label>
          <input type="text" value={email} onChange={(e) => set_email(e.target.value)} id='__email' />
        </div>
        <div>
          <label htmlFor="__password">Password: </label>
          <input type="password" value={password} onChange={(e) => set_password(e.target.value)} id='__password' />
        </div>
        <input type="submit" value='Login' />
      </form>
      <label htmlFor="__stay_signed_in">Stay signed in </label>
      <input type="checkbox" id="__stay_signed_in" onChange={handle_stay_signed_in_desire} checked={stay_signed_in} />

      <button onClick={() => { set_authStage('signUp') }}>Sign up!</button>

      {loginAttemptError && <h3>Unable to login!</h3>}

    </div>
  )
}