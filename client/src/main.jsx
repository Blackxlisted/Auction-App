import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store.js';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


TimeAgo.addDefaultLocale(en)

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
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
