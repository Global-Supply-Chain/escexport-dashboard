import '/node_modules/primeflex/primeflex.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import './assets/css/styles.css';
import './assets/css/flags.css';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'


import { routers } from './routers';
import { stores } from './stores';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={stores}>
  <RouterProvider router={routers} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
