import React from 'react';
import { hydrate } from 'react-dom';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/reset.css';
import '../src/assets/css/style.css';
import '../src/assets/css/responsive.css';

import reportWebVitals from './reportWebVitals';
import { loadableReady } from '@loadable/component';

// loadableReady(() => {
// 	const root = document.getElementById('root')
// 	hydrate(  
// 			<App />
// 		, root)
// });


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
