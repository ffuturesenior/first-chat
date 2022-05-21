import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
export const AdminContext=createContext(false)

root.render(
    <Provider store={store}>
         <App />
    </Provider>
);

