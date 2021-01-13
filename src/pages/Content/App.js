import React, { useState, useEffect } from 'react';
import Login from './layouts/Login'
import YT_VNC from './layouts/YT_VNC'
import getClient from '../shared/utils/getClient'
import { me } from '../shared/gql_operations/queries'
import AuthContext from '../context/AuthContext'
import Loading from '../shared/components/Loading'
import TokenContext from '../context/TokenContext';



export default () => {
  const [authStage, set_authStage] = useState('login')
  const [loading, set_loading] = useState(true)
  const [token, set_token] = useState('')

  const authChanger = (port) => {
    console.log('port name', port)
    switch (port.name) {
      case 'auth': {
        console.log('auth port');
        port.onMessage.addListener((msg) => {
          console.log(msg)
          switch (msg.type) {
            case 'validated': {
              console.log('auth validate case');
              set_authStage('validated')
              set_token(msg.token)
              break
            }
            case 'login': {
              console.log('auth login case');

              set_authStage('login')
              break
            }
          }
        })
        break
      }
    }
  }

  useEffect(() => {
    // handle conditional loading of app token exists.  if it exists, attempt to verify it's integrity.
    set_loading(true)
    chrome.storage.local.get(null, (data) => {
      const client = getClient(data.token)

      if (data.token) {
        if (data.options.stay_signed_in) {
          client.query({ query: me }).then((response) => {
            set_authStage('validated')
            set_token(data.token)
            set_loading(false)

            console.log('token exists and onConnect set')
            chrome.runtime.onConnect.addListener(authChanger)
          }, (err) => {
            console.log('token invalid and onConnect set')
            set_authStage('login')
            set_loading(false)

            chrome.runtime.onConnect.addListener(authChanger)
          })

        } else {
          set_authStage('login')
          set_loading(false)
        }
      } else {
        console.log('no token in local storage, onConnect set')
        set_loading(false)

        chrome.runtime.onConnect.addListener(authChanger)
      }
    })


    return () => {
      chrome.runtime.onConnect.removeListener(authChanger)
    }
  }, [])

  return (
    <div className="app-container">
      <AuthContext.Provider value={[authStage, set_authStage]}>
        <TokenContext.Provider value={[token, set_token]}>
          {loading ? <Loading /> : (
            (() => {
              switch (authStage) {
                case 'validated': return <YT_VNC />
                case 'login': return <Login />
              }
            })()
          )}
        </TokenContext.Provider>
      </AuthContext.Provider>
    </div>
  )
}