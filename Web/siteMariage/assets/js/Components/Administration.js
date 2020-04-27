import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import cadeau from "../../img/cadeau.png"
import { number } from 'prop-types';
import fleur from "../../img/FondFleurs.png"
import fleurs from "../../img/Fleurs.png"
import { getCadeaux, getInvites, putCadeau } from "../Utils/fetching.js"

class Administration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            nomEdit: new String(),
            prixEdit: new String(),
            descEdit: new String(),
            
        };

        this.editCadeau = this.editCadeau.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }


    componentDidMount() {

        getCadeaux().then(
            (result) => {

                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }


    // state à jour au changement d'un input text
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    
    
    
      }

    // Vue edit cadeau
    editCadeau(cadeauNom, cadeauPrix, cadeauID, cadeauDesc) {
   
        
        document.getElementById("cadeauToEdit").innerHTML = " Editer le cadeau " + cadeauNom;
        
    }


    render(){

        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div><br></br><br></br><br></br>Chargement…</div>;
        } else {

        return(
          <div className="w3-grayscale-min fondFormulaire" style={{width:"100%", height:"100%",backgroundColor:"rgb(255, 255, 204)"}}>
      

      <div className="container mt-4" id="EditCadeau">
    <h1>Gérer les cadeaux</h1>
    <table className="table table-striped">
        <thead><tr>
            <th style={{borderBottom: "0px"}}>Noms</th>
            <th style={{borderBottom: "0px"}}>Actions</th>
        </tr></thead>
        <tbody>
       
        

        {items.map(item => (<tr  style={{backgroundColor: "rgb(255, 255, 204)"}}>
                        <td id={item.id} style={{backgroundColor:"rgba(136, 172, 210, 0.27)"}}  className="list-group-item list-group-item text-dark salut"
                        key={item.id}
                        //onClick={this.handleClick.bind(this, item.nom, item.prix, item.id, item.description, item.acheteurs, item.montantsRecoltes)}
                        >
                          {item.nom}  {item.prix} €
                        </td>


<td> </td>
<td>
    <a className="btn btn-secondary" style={{marginRight:"6px"}} onClick={this.editCadeau.bind(this, item.nom, item.prix, item.id, item.description)}>Editer</a>
    <button className="btn btn-danger" style={{display: "inline-block"}}>Supprimer</button>
        

       
   
</td> </tr>
        ))}
          
       
        
        </tbody>
    </table>
    <div className="text-right">
        <a className="btn btn-primary">Nouveau</a>

    </div>

</div>



<div className="container mt-4">
<h1 id="cadeauToEdit"></h1>
<label></label><br></br>
      <input type="text" placeholder="Nom" name="nomEdit" className="form-control w-25" value={this.state.nomEdit} onChange={this.handleInputChange}></input>
      <input type="text" placeholder="Prix" name="prixEdit" className="form-control w-25" value={this.state.prixEdit} onChange={this.handleInputChange}></input>
      <input type="text" placeholder="Description" name="descEdit" className="form-control w-25" value={this.state.descEdit} onChange={this.handleInputChange}></input>
</div>



      </div>
        )
        }
      }
    }

export default Administration;

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
