import notRunWithinTheLastSecond from './notRunWithinTheLastSecond';

export default (hostContains, matchingAlgo) => {
  //either DESIRED_PAGE or !DESIRED_PAGE
  let last_location = null;

  chrome.webNavigation.onCompleted.addListener(
    (details) => {
      const renderController = chrome.tabs.connect(details.tabId, {
        name: 'renderController',
      });

      const matchObj = matchingAlgo(details.url);

      if (matchObj.youtubeMatched && matchObj.navigatedToVideoPage) {
        renderController.postMessage({
          type: 'INITIAL_MOUNT',
        });
        last_location = 'DESIRED_PAGE';
      } else if (matchObj.youtubeMatched) {
        //do nothing, wait for history nav
        // last_location = '!DESIRED_PAGE';
        console.log(last_location);
      }

      /*
      console.log(details, 'details');
      //details.tabId

      

      renderController.postMessage('oncompleted is complete, port posted msg');
      console.log('oncompleted firing');
      */
    },
    {
      url: [{ hostContains }],
    }
  );

  chrome.webNavigation.onHistoryStateUpdated.addListener(
    (details) => {
      if (
        (typeof chrome._LAST_RUN === 'undefined' ||
          notRunWithinTheLastSecond(details.timeStamp)) &&
        details.frameId === 0
      ) {
        chrome._LAST_RUN = details.timeStamp;

        const renderController = chrome.tabs.connect(details.tabId, {
          name: 'renderController',
        });

        const matchObj = matchingAlgo(details.url);

        if (matchObj.youtubeMatched && matchObj.navigatedToVideoPage) {
          if (last_location === 'DESIRED_PAGE') {
            renderController.postMessage({
              type: 'UNMOUNT_MOUNT',
            });
          } else if (last_location === '!DESIRED_PAGE') {
            renderController.postMessage({
              type: 'MOUNT',
            });
          } else if (last_location === null) {
            renderController.postMessage({
              type: 'INITIAL_MOUNT',
            });
          }
          last_location = 'DESIRED_PAGE';
        } else if (matchObj.youtubeMatched) {
          //do nothing, wait for history nav
          console.log(matchObj, details);
          if ((last_location = 'DESIRED_PAGE')) {
            renderController.postMessage({
              type: 'UNMOUNT',
            });
          }
          last_location = '!DESIRED_PAGE';
        }

        // const porterino = chrome.tabs.connect(details.tabId, {
        //   name: 'renderController',
        // });

        // porterino.postMessage(
        //   'onhistorystateupdated is complete, port posted msg'
        // );
      }
    },
    {
      url: [{ hostContains }],
    }
  );
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log(tab, 'tab info shit');
  }
});
