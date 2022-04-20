import React from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {PersistGate} from "redux-persist/integration/react";

import App from "./App";
import { store, persistor } from "./store/store";

import PersistLoader from "./components/PersistLoader/PersistLoader";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate
              loading={<PersistLoader />}
              persistor={persistor}
          >
            <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>
);
