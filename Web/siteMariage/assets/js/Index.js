// ./src/js/app.js

import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import Cadeau from './Components/Cadeau';
import Formulaire from './Components/Formulaire';
import Navigation from './Components/Navigation';




class Index extends Component {
  componentDidMount() {

}

    render() {
    return (

      <switch>
       <Route path="/user" component={() => <Navigation privilege= {this.props.privilege} />}>
      </Route>

    <Route path="/user/Accueil">
   <body className="bodyAcceuil"> 


   </body>
    </Route>
    <Route path="/user/Cadeaux" component={Cadeau}></Route>
    <Route path="/user/Formulaire" component={Formulaire}></Route>
    <Route path="/logout" component={() => {
            window.location.reload();
                }}>
    </Route>
    <Route path="/admin/cadeau" component={() => {
            window.location.reload();
                }}>
    </Route>
                </switch>



    )

  }



}

  export default Index;
