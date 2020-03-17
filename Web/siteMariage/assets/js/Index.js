// ./src/js/app.js

import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import Cadeau from './Components/Cadeau';
import Navigation from './Components/Navigation';



class Index extends Component {
  componentDidMount() {

}

    render() {
    return (

      <switch>
       <Route path="/user" component={Navigation}>
      </Route>

    <Route path="/user/Acceuil">
    <div class="jumbotron text-center">
<h1>Mariage Stephanie et Nicolas</h1>
</div>
<div class="container">
<h4>Description</h4>
</div>
    </Route>
    <Route path="/user/Cadeaux" component={Cadeau}>

    </Route>

   </switch>



    )

  }



}

  export default Index;
