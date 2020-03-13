// ./src/js/app.js
    
import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import home from './Components/home';
import Navigation from './Components/Navigation';



class Index extends Component {


    render() {
    return (
      
      <switch>
     
     

       <Route path="/" component={Navigation}>
         

   

      


       
      </Route>
    <Route path="/user/home/salut" component={home}></Route>
     
   </switch>
    
      
      
    )

  }

  

}

  export default Index;

   
   
