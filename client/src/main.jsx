import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store.js';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const VITE_AUTH0_DOMAIN='dev-jco6fy6pebxlsglc.us.auth0.com'
const VITE_AUTH0_CLIENT_ID='NZPW2hRgEVUlIVJ2IC0iXo2AZhPeyaeE'
console.log(
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN
);
createRoot(document.getElementById('root')).render(
  <>
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </>
)
