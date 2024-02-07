import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router} from 'react-router-dom'

import { MantineProvider } from '@mantine/core';

import ReactGA from "react-ga4";

ReactGA.initialize("G-LRETLXVKBX");

// Send pageview with a custom path
ReactGA.send({ hitType: "pageview", page: "/my-path", title: "Custom Title" });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <MantineProvider>
      <App />
    </MantineProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
