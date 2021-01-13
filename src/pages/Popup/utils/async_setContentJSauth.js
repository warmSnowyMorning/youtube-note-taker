export default (authState, token) => {
  chrome.tabs.query({ url: '*://*.youtube.com/watch*' }, (tabs) => {
    //tab.id
    console.log(tabs);
    tabs.forEach((tab) => {
      const port = chrome.tabs.connect(tab.id, {
        name: 'auth'
      })

      port.postMessage({
        type: authState,
        token
      })
    })
  })
}


