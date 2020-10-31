import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Timeline from './Timeline';

import data from './data/timelineItems';

ReactDOM.render(
  <React.StrictMode>
    <Timeline data={data} />
  </React.StrictMode>,
  document.getElementById('root')
);
