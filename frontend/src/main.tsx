import { attachAuthInterceptor } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client } from "@auth0/auth0-spa-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./api/auth/AuthProvider";
import App from "./App";
import "./index.css";
import { store } from "./store";

function InitApi() {
  const { getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    attachAuthInterceptor({
      getTokenSilently: getAccessTokenSilently,
    } as unknown as Auth0Client)
  }, [getAccessTokenSilently]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <InitApi />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
