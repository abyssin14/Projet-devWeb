import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { number,Integer } from 'prop-types';
import  '../../css/app.css';


class Formulaire extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allergie: new String(),
      accompagnant: false,
      enfant: 0,
      presentCeremonie: false,
      presentVinDHonneur: false,
      presentRepas: false,
      presentSoiree: false,
      nom: new String(),
      prenom: new String()
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'presentCeremonie' || target.name === 'accompagnant' || target.name === 'presentVinDHonneur' || target.name === 'presentRepas' || target.name === 'presentSoiree' ? target.checked : target.value;
    const name = target.name; 
    
    this.setState({
      [name]: value
    });
 
    

  }
  

handleSubmit(event) {
  fetch('http://localhost:8000/api/invites', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "allergie": this.state.allergie,
    "accompagnant": this.state.accompagnant,
    "enfant": parseInt(this.state.enfant),
    "presentCeremonie": this.state.presentCeremonie,
    "presentVinDHonneur": this.state.presentVinDHonneur,
    "presentRepas": this.state.presentRepas,
    "presentSoiree": this.state.presentSoiree,
    "nom": this.state.nom,
    "prenom": this.state.prenom
  })
})
}

  render(){
    return(
  <div >
    <br></br><br></br>
  <form   onSubmit={this.handleSubmit}>
      <label>Formulaire de présence</label><br></br>
     <label>nom</label><br></br>
      <input type="text" name="nom" value={this.state.nom} onChange={this.handleInputChange}></input>
        <br></br>
     <label>prénom</label><br></br>
     <input type="text" name="prenom" value={this.state.prenom} onChange={this.handleInputChange}></input>
        <br></br>
      <label>Veuillez cocher les moments du mariage auxquels vous serez présents</label>
      <br></br>
      <div>
      <input type="checkbox" name="presentCeremonie" checked={this.state.presentCeremonie}  onChange={this.handleInputChange}></input>
      <label>Cérémonie</label>
      <input type="checkbox" name="presentRepas" checked={this.state.presentRepas} onChange={this.handleInputChange}></input>
      <label>Repas</label>
      <br></br>
      <input type="checkbox" name="presentVinDHonneur" checked={this.state.presentVinDHonneur} onChange={this.handleInputChange}></input>
      <label>Vin d'honneur</label>
      <input type="checkbox"  name="presentSoiree" checked={this.state.presentSoiree} onChange={this.handleInputChange}></input>
      <label>Soirée</label>
      </div>
      <br></br>
      <label>Allergie</label><br></br>
      <input type="text" name="allergie" value={this.state.allergie} onChange={this.handleInputChange}></input>
      <br></br><br></br>
      <input type="checkbox" name="accompagnant" checked={this.state.accompagnant} onChange={this.handleInputChange}></input>
      <label>Serez-vous accompagnez?</label><br></br>
      <label>Enfant</label><br></br>
      <input type="number"  min="0" name="enfant" value={this.state.enfant} onChange={this.handleInputChange}></input>
      <br></br>
      <input type="submit" className="bouton" value="Envoyer"></input>
  </form>

  </div>
    )
  }
}
export default Formulaire;
