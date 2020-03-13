// ./src/js/app.js
    
import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import home from './Components/home';


class Index extends Component {


    render() {
    return (
      
      <switch>
     
      

       <Route path="/user/home" exact>
         

      <nav>
<ol>
  
  <li>     <Link to="/user/home/cadeaux">salut </Link>     </li>
  <li>                  futur lien                                    </li>
  </ol>


      </nav>

 


       
  

    
    
    
    </Route>
    <Route path="/user/home/cadeaux" component={home}></Route>
     
   </switch>
    
      
      
    )

  }

  

}

  export default Index;

   
   
