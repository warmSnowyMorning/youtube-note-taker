import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './app.scss';

render(<App />, window.document.querySelector('#app-container'));
