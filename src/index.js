import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Root from './component/root/root.jsx';
import 'semantic-ui-css/semantic.min.css';
import { Provider}  from 'react-redux'
import store from './redux/store.js';


ReactDOM.render(<Provider store={store}>
    <BrowserRouter><Root/></BrowserRouter>
</Provider>, document.getElementById('root'));