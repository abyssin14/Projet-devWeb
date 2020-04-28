import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { number,Integer } from 'prop-types';
import  '../../../css/app.css';
import { postInvite } from "../../Utils/fetching.js"


class FormulaireSansRepas extends Component {

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
  if(this.state.nom == '' && this.state.prenom == ''){

}else{

     var body = JSON.stringify({
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
    postInvite(body)
}

}

  render(){
    return(
      <div className="w3-grayscale-min fondFormulaire" style={{width:"100%", height:"100%",backgroundColor:"#ffdddd"}}>
  <div className="container"  id="monform">
  <form  className="form-group"  style={{marginBottom:"1.5rem"}} onSubmit={this.handleSubmit}>
      <div className="form-group form-inline" >
     <label> </label>
      <input type="text" name="nom" placeholder="Nom" className="form-control w-25" value={this.state.nom} onChange={this.handleInputChange}></input>
      </div>
        <div className="form-group form-inline">
     <label> </label>
     <input type="text" name="prenom" placeholder="Prénom" className="form-control w-25" value={this.state.prenom} onChange={this.handleInputChange}></input>
     </div>
      <label>Veuillez cocher les moments du mariage auxquels vous serez présents</label>
      <br></br>

      <div className="form-check" style={{marginBottom:"10px"}}>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input className="form-check-input" type="checkbox" name="presentCeremonie" checked={this.state.presentCeremonie}  onChange={this.handleInputChange} ></input>Cérémonie
      </label>
      <label className="form-check-label"  style={{marginRight:"5%"}}>
      <input type="checkbox" name="presentVinDHonneur" className="form-check-input" checked={this.state.presentVinDHonneur} onChange={this.handleInputChange}></input>Vin d'honneur
      </label>
      </div>
      <div className="form-check">
      <label className="form-check-label">
      <input type="checkbox"  className="form-check-input" name="presentSoiree" checked={this.state.presentSoiree} onChange={this.handleInputChange}></input>Soirée
      </label>
      </div>


      <div className="form-group">
      <label></label><br></br>
      <input type="text" placeholder="Allergie(s) ?" name="allergie" className="form-control w-25" value={this.state.allergie} onChange={this.handleInputChange}></input>
      </div>
      <input type="checkbox" name="accompagnant" checked={this.state.accompagnant} onChange={this.handleInputChange}></input>
      <label>Serez-vous accompagnez?</label><br></br>
      <div className="form-group">
      <label>Si oui, combien d'enfants vous accompagnes ?</label><br></br>
      <input type="number" className="form-control w-25" min="0" name="enfant" value={this.state.enfant} onChange={this.handleInputChange}></input>
      <br></br><input type="submit" style={{backgroundColor: "#07132052",borderColor:"#a4caf3"}}className="form-control btn btn-primary w-25" value="Participer"></input>

      </div>

      </form>

  </div>
  </div>
    )
  }
}
export default FormulaireSansRepas;

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
