import React, { useState, useEffect } from 'react';
import Login from './layouts/Login'
import YT_VNC from './layouts/YT_VNC'
import SignUp from './layouts/SignUp'
import AuthContext from './../context/AuthContext'

import getClient from '../shared/utils/getClient'
import { me } from '../shared/gql_operations/queries'
import async_setContentJSauth from './utils/async_setContentJSauth.js'
import TokenContext from '../context/TokenContext';



const App = () => {


  //login, validated, signUp
  const [authStage, set_authStage] = useState('login')
  const [token, set_token] = useState('')

  useEffect(() => {
    console.log('MOUNTING POPUP')
    //items.options.stay_signed_in
    chrome.storage.local.get(null, async (items) => {
      const { token } = items
      const client = getClient(token || '')
      try {
        if (items.options.stay_signed_in && token) {
          const data = await client.query({ query: me })
          set_token(token)

          set_authStage('validated')
          console.log('token from App.jsx popup', token)
        } else {
          set_authStage('login')
        }

      } catch (error) {
        // console.log('App catch error', error)
        chrome.storage.local.set({
          options: {
            stay_signed_in: false
          }
        }, () => set_authStage('login'))

      }

      chrome.runtime.connect(chrome.runtime.id, {
        name: 'popup'
      })
    })

    //popup.js unmounting is broken
    return () => {
      console.log('UNMOUNTING POPUP')

    }
  }, [])

  return (
    <div className="__app-container">
      <AuthContext.Provider value={[authStage, set_authStage]}>
        <TokenContext.Provider value={[token, set_token]}>
          {(() => {
            switch (authStage) {
              case 'login': return <Login />
              case 'validated': return <YT_VNC />
              case 'signUp': return <SignUp />
            }
          })()}
        </TokenContext.Provider>
      </AuthContext.Provider>

      <div className="__round-container">
        <div className="__left-half">
          <button>a</button><button>b</button>
        </div>
        <div className="__add-note">bot</div>
      </div>
    </div>
  );
};

export default App;
