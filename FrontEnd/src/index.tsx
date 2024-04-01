import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import "./assets/css/Index.css"
import "./assets/css/BackGroundColors.css"
import "./assets/css/Borders.css"
import "./assets/css/Fs.css"
import "./assets/css/Header.css"
import "./assets/css/Navbar.css"
import { Provider } from 'react-redux';
import { store } from './storage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
