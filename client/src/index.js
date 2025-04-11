import React from 'react';
import ReactDOM from 'react-dom/client';
// Add this near the top of your file
import axios from 'axios';

// Set the base URL for all axios requests
// Make sure this points to your actual backend API URL
axios.defaults.baseURL = 'https://zero4unibetkart.onrender.com'; // or your production API URL
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './redux/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
