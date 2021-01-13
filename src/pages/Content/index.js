import { printLine } from './modules/print';
import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import App from './App';

import yt_url_matcher from './utils/yt_url_matcher';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

/*
either getting INITIAL_MOUNT from landing on DESIRED_PATH, or landing on !DESIRED_PATH but navigating to DESIRED_PATH
MOUNT if last page wasn't desired thus unmounted, but current page is a match
UNMOUNT_MOUNT if mounted, and last_page and current page are all matches
UNMOUNT if current page is not a match and last_page was and update to !DESIRED_PAGE
no need to unmount if last page was not desired, and current page is also not desired, since it would have never lead to a mount anyway.
*/
// if you track where you are, and THEN where you just are; you can defeat PWAs; maybe
window.addEventListener('load', (e) => {
  let last_location = null;
  //e.target.baseURI
  const pathMatch = yt_url_matcher(e.target.baseURI);

  const anchor = document.createElement('div');
  anchor.id = '_app_anchor';
  document.querySelector('body').prepend(anchor);

  if (pathMatch.navigatedToVideoPage && pathMatch.youtubeMatched) {
    console.log('INITIAL_MOUNT');
    ReactDOM.render(<App />, anchor);

    last_location = 'DESIRED_PAGE';
  } else if (pathMatch.youtubeMatched) {
    console.log('initial load, but not on DESIRED_PATH. will leave at null');
  }

  window.addEventListener('yt-navigate-finish', (e) => {
    const pathMatch = yt_url_matcher(e.target.baseURI);
    console.log('YOUTUBE NAVIGATION FINISH')
    if (pathMatch.youtubeMatched && pathMatch.navigatedToVideoPage) {
      if (last_location === 'DESIRED_PAGE') {
        ReactDOM.unmountComponentAtNode(anchor);
        ReactDOM.render(<App />, anchor);

        console.log('UNMOUNT_MOUNT')

      } else if (last_location === '!DESIRED_PAGE') {
        console.log('MOUNT');

        ReactDOM.render(<App />, anchor);

      } else if (last_location === null) {
        console.log('INITIAL_MOUNT');

        ReactDOM.render(<App />, anchor);

      }
      last_location = 'DESIRED_PAGE';
    } else if (pathMatch.youtubeMatched) {
      //do nothing, wait for history nav
      if ((last_location = 'DESIRED_PAGE')) {
        ReactDOM.unmountComponentAtNode(anchor);
        console.log('UNMOUNT');

      }
      last_location = '!DESIRED_PAGE';

    }
  });
});

