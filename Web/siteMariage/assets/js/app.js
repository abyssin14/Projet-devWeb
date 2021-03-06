import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Index from './Index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactOnRails from 'react-on-rails';
import Navigation from './Components/Navigation.js'
import { Provider as AlertProvider } from 'react-alert'
import Alert from './Utils/Alert.js'
var rootElement = document.getElementById('root');

// optional cofiguration
const options = {
  position: 'bottom center',
  timeout: 3000,
  offset: '30px',
  transition: 'scale'
}


ReactDOM.render(
<BrowserRouter>
<AlertProvider template={Alert} {...options}>
<Index privilege={rootElement.getAttribute('privilege')} />
</AlertProvider>
</BrowserRouter>
    , rootElement

  );

ReactOnRails.register({ Index });

/*ReactDOM.render(
  <Navigation privilege={rootElement.getAttribute('data-rest-url')}></Navigation>,
  rootElement
);
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
