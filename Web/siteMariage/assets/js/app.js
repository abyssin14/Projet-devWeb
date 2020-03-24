import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Index from './Index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactOnRails from 'react-on-rails';


ReactDOM.render(
<BrowserRouter>
<Index/>
</BrowserRouter>
    , document.getElementById('root'));

ReactOnRails.register({ Index });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
