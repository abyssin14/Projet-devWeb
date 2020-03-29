import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"


class Cadeau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            infoCadeau: "Cliquer sur un cadeau pour obtenir plus d'informations",
        };
        this.handleClick = this.handleClick.bind(this);
    
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/cadeaux?page=1")
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

    
    
    handleClick(a,b) {
        console.log(a);
        console.log(b);
        this.setState(state => ({
          infoCadeau: a + " Prix : " + b + "€"
        }));
      }

  render() {
    const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div><br></br><br></br><br></br>Chargement…</div>;
        } else {
            return (
              <div >
              
               
                <div className="card bg-light"  >Description à venir</div>
                <div className="card-group "  style={{ marginTop:"0px",  marginBottom:"0px"}} >
               
              
               

                <div className="card bg-light">
                <ul className="list-group">
                {items.map(item => (
                        <li id={item.id} className="list-group-item list-group-item-dark salut" 
                        key={item.id}
                        onClick={this.handleClick.bind(this, item.nom, item.prix)}
                        >
                          {item.nom} : {item.prix} €

                          
                        </li>
        ))}
        </ul>
        </div>
        <div   className="card bg-primary bg-light text-dark" style={{textAlign:"center"}}> {this.state.infoCadeau}</div>
        </div> 
        </div>


        );
        }
    }


}



export default Cadeau;

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
