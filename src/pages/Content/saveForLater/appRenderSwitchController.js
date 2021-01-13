chrome.runtime.onConnect.addListener((port) => {
  switch (port.name) {
    case 'renderController': {
      port.onMessage.addListener((msg) => {
        switch (msg.type) {
          case 'MOUNT': {
            console.log(msg.type);
            break;
          }
          case 'UNMOUNT_MOUNT': {
            console.log(msg.type);
            break;
          }
          case 'UNMOUNT': {
            console.log(msg.type);
            break;
          }
        }
      });
      break;
    }
  }
});
