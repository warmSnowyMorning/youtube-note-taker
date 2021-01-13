import { gql } from 'apollo-boost'
import getClient from '../shared/utils/getClient'
import { me } from '../shared/gql_operations/queries'
import async_setContentJSauth from '../Popup/utils/async_setContentJSauth'

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2RsY3RuZ3UwMDFvMDc5MXh5eGFzemU5IiwiaWF0IjoxNjAwMDg0Njk3LCJleHAiOjE2MDA2ODk0OTd9.5LAG4YTpRiCurJuFQjwjhsFrpR2hU-mNAn6vAT6GZqc',
    options: {
      stay_signed_in: true,
    }
  })
});




chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  switch (req.type) {

  }
})

chrome.storage.local.get(null, (data) => console.log('background.js getting all storage', data))
chrome.tabs.query({}, (tabs) => console.log('bg.js getting all tabs', tabs))

chrome.runtime.onConnect.addListener((port) => {
  console.log('logging port from bg.js', port)

  switch (port.name) {
    case 'popup': {
      port.onDisconnect.addListener((port2) => {
        console.log('popup disconnected', port2)

        chrome.storage.local.get(null, (items) => {
          if (items.token && items.options.stay_signed_in) {
            const client = getClient(items.token)

            client.query({ query: me }).catch(() => {
              async_setContentJSauth('login')
              chrome.storage.local.clear()
            })
          } else if (items.token) {
            chrome.storage.local.clear()
            async_setContentJSauth('login')
          }
        })
      })
      break
    }
    default: return
  }
})


chrome.commands.onCommand.addListener((shortcut) => {
  console.log(shortcut);
  if (shortcut.includes("alt+s")) {
    chrome.runtime.reload();
  }
})