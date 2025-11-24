import { GoogleOAuthProvider } from '@react-oauth/google';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoaderProvider } from '@components/LoaderProvider';
import Layout from '@components/shared/Layout';
import { fetchUser } from '@store/userSlice';
import { useAppDispatch } from '@store/hooks';

const queryClient = new QueryClient();

function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return null;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LoaderProvider>
            <Layout>
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <AppInitializer />
                <App />
              </GoogleOAuthProvider>
            </Layout>
          </LoaderProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
