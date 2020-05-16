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
      enfants: [0],
      presentCeremonie: false,
      presentVinDHonneur: false,
      presentRepas: false,
      presentSoiree: false,
      nom: new String(),
      prenom: new String(),
      nbInput: 1,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickAddEnfant = this.handleClickAddEnfant.bind(this);
    this.handleClickDeleteEnfant = this.handleClickDeleteEnfant.bind(this);


  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'presentCeremonie' || target.name === 'accompagnant' || target.name === 'presentVinDHonneur' || target.name === 'presentRepas' || target.name === 'presentSoiree' ? target.checked : target.value;
    const name = target.name;

    if(!isNaN(parseInt(name))){
      this.state.enfants[name] = value;
    }else{
      this.setState({
        [name]: value
      });
    }

    console.log(this.state.enfants)
  }


handleSubmit(event) {
  if(this.state.nom == '' && this.state.prenom == ''){

  }else{
    //suppression des champs enfants vide
    for(var i = 0; i < this.state.enfants.length; i++){
      if(this.state.enfants[i] == 0){
        var arrayUpdate = this.state.enfants
        arrayUpdate.splice(i,1)
        this.setState({enfants: arrayUpdate})
      }
    }
     var body = JSON.stringify({
      "allergie": this.state.allergie,
      "accompagnant": this.state.accompagnant,
      "enfants": this.state.enfants,
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

handleClickAddEnfant(){
  var tabEnfantsAdd = this.state.enfants.concat(0);
  this.setState({enfants: tabEnfantsAdd})
  this.renderInputEnfant();
}
handleClickDeleteEnfant(){
    var arrayUpdate = this.state.enfants;
    var indexAsupprimer = this.state.enfants.length - 1;
   arrayUpdate.splice(indexAsupprimer,1);
   this.setState({enfants: arrayUpdate})


 this.renderInputEnfant();
}

renderInputEnfant(){
  var nextInputs = new Array();
  nextInputs[0] = <input style={{marginRight:"1%"}} type="number" className="form-control w-10" min="0" max="18" name="0" onChange={this.handleInputChange}></input>;
  for(let i = 1; i < this.state.enfants.length; i++){
     nextInputs[i] = React.cloneElement(nextInputs[0],{name:i},null);
  }

  return nextInputs;
}

  render(){
    return(
      <div className="w3-grayscale-min fondFormulaire" style={{width:"100%", height:"100%",backgroundColor:"#ffdddd"}}>
  <div className="container"  id="monform">
  <h1>Formulaire de participation au mariage</h1>
  <form  className="form-group"  style={{marginBottom:"0rem"}} onSubmit={this.handleSubmit}>
      <div className="form-group form-inline"  style={{marginBottom:"0.5rem"}}>
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


      <div className="form-group"  style={{marginBottom:"0rem"}}>
      <label></label><br></br>
      <input type="text" placeholder="Allergie(s) ?" name="allergie" className="form-control w-25" value={this.state.allergie} onChange={this.handleInputChange}></input>
      </div>
      <input type="checkbox" name="accompagnant" checked={this.state.accompagnant} onChange={this.handleInputChange}></input>
      <label>Serez-vous accompagné?</label><br></br>
      <div className="form-group">
      <label>Serez-vous accompagné d'enfant(s) ?<br></br> Si oui, indiquez ci-dessous son/leur âge.</label><br></br>
      <div className="form-inline">
        {this.renderInputEnfant()}
        {this.state.enfants.length > 1 &&(
          <input type="button" className="bouton-add" value="-" onClick={this.handleClickDeleteEnfant.bind()}/>
        )}
        <input type="button" className="bouton-add" value="+" onClick={this.handleClickAddEnfant.bind()}/>


      </div>

      <br></br><input type="submit" style={{backgroundColor: "#07132052",borderColor:"#a4caf3"}}className="form-control btn btn-primary w-25" value="Valider"></input>

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
