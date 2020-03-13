// ./src/js/app.js
    
import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './Components/home';


class Index extends Component {


    render() {
    return (
      <main>
      <switch>
     
      

       <Route path="/user/home" exact >
         
      <div>
        <h1>Bienvenu admin</h1>
    </div>
    </Route>
    <Route path="/user/home/salut" component={home}>
      
    </Route>
    
      </switch>
      </main>
    )

  }
}
  
  export default Index;

    /* <main>
        <Switch>
      
      <div className="index">
        <Route path="/user/home" > 
      <div>Bienvenue sur la page admin</div> 
      </Route>
          
          <Route path="/home" component={home} />
      </div>
      </Switch>
      </main>
    );
    }*/