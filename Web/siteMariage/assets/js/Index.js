// ./src/js/app.js
    
import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/cadeaux")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <ul>
                {items.map(item => (
                        <li key={item.id}>
                    {item.nom} {item.prix}
        </li>
        ))}
        </ul>
        );
        }
    }
}
  
  export default Index;

    /* <main>
        <Switch>
      
      <div className="index">
        <Route path="/" exact> 
      <AddCompo addCompo={this.handleAddCompo.bind(this)}/>
      </Route>
          
          <Route path="/home" component={home} />
      </div>
      </Switch>
      </main>
    );
    }*/