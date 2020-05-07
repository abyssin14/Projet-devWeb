import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import cadeau from "../../img/cadeau.png"
import { number } from 'prop-types';
import fleur from "../../img/FondFleurs.png"
import fleurs from "../../img/Fleurs.png"
import { getCadeaux, getInvites, putCadeau, deleteCadeau, postCadeau, deleteInvite } from "../Utils/fetching.js"
import ReactDOM from 'react-dom';


    

class Administration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //State load cadeau/invite
            error: null,
            isLoaded: false,
            items: [],
            invites: [],

            //State cadeau edit
            nomEdit: new String(),
            prixEdit: new String(),
            descEdit: new String(),
            recolteEdit: [],
            achteurEdit: [],
            idEdit: Number(),
            
            //State nouveau cadeau
            descriptionNouveauCadeau: new String(),
            prixNouveauCadeau: Number(),
            nomNouveauCadeau: new String(),   

            //State invite edit


        };

        this.editCadeau = this.editCadeau.bind(this);
        this.supprimerCadeau = this.supprimerCadeau.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.suppInvestisseur = this.suppInvestisseur.bind(this);
        this.updateCadeau = this.updateCadeau.bind(this);
        this.nouveauCadeau = this.nouveauCadeau.bind(this);
        this.envoieNouveauCadeau = this.envoieNouveauCadeau.bind(this)
        this.supprimerInvite = this.supprimerInvite.bind(this);
        this.editInvite = this.editInvite.bind(this);

    

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

        getInvites().then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    invites: result
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


    // state à jour au changement d'un input text
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'presentCeremonie' || target.name === 'presentVinDHonneur' || target.name === 'presentRepas' || target.name === 'presentSoiree' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });  
      }
      
      suppInvestisseur(indexAsupprimer) {
        var tableauAcheteur = this.state.achteurEdit;
        tableauAcheteur.splice(indexAsupprimer, 1);
        this.state.achteurEdit = tableauAcheteur;

        var tableauRecolte = this.state.recolteEdit;
        tableauRecolte.splice(indexAsupprimer,1);
        this.state.recolteEdit = tableauRecolte;

        document.getElementById(indexAsupprimer).style.display = "none";
         
              }



    // Vue nouveau cadeau
     nouveauCadeau() {
                document.getElementById("nouveauCadeau").style.display = "block";
                document.getElementById("gererCadeau").style.display = "none";
 }

    // Envoie nouveau cadeau

    envoieNouveauCadeau() {

        var body = JSON.stringify({
            "nom": this.state.nomNouveauCadeau,
            "prix": parseInt(this.state.prixNouveauCadeau),
            "description": this.state.descriptionNouveauCadeau,
            "acheteurs": [],
            "montantsRecoltes": [],
            "payement": ""
          })


        postCadeau(body)

        window.location.reload();

    }


    editContribution(cadeauNom, cadeauPrix, cadeauID, cadeauDesc, acheteurs,recoltes) {
        ReactDOM.unmountComponentAtNode(document.getElementById('investisseurs'));
        document.getElementById('editCadeau').style.display = "none";
        document.getElementById('gererCadeau').style.display = "none";
        document.getElementById('gererContribution').style.display = "block";

        this.setState({
            nomEdit: cadeauNom,
            prixEdit: cadeauPrix,
            descEdit: cadeauDesc
          });  

        this.state.idEdit = cadeauID;

        document.getElementById("nomCadeauContribution").innerHTML = "Contributions pour le cadeau :" + cadeauNom;
        this.state.recolteEdit = recoltes;
        this.state.achteurEdit = acheteurs;
        console.log(acheteurs,recoltes);
        document.getElementById("investisseurs").innerHTML = "";
        const listeInvestisseurs = [];
        for ( var i = 0; i < acheteurs.length; i++) {
          
        listeInvestisseurs.push( <tr id={i}>
           <td>  {acheteurs[i]}</td> 
            <td> {recoltes[i]} €</td>
           <td><button className="btn btn-danger" style={{display: "inline-block"}} onClick={this.suppInvestisseur.bind(this,i)}>Supprimer</button></td>
           </tr>
        )
            }
            ReactDOM.render(listeInvestisseurs, document.getElementById('investisseurs'));
    }

    // Vue edit cadeau
    editCadeau(cadeauNom, cadeauPrix, cadeauID, cadeauDesc, acheteurs,recoltes) {
        
        document.getElementById('editCadeau').style.display = "block";
        document.getElementById('gererCadeau').style.display = "none";
      
        this.setState({
            nomEdit: cadeauNom,
            prixEdit: cadeauPrix,
            descEdit: cadeauDesc
          });  

        this.state.idEdit = cadeauID;
        document.getElementById("cadeauToEdit").innerHTML = " Editer le cadeau " + cadeauNom;
       
        }

       supprimerCadeau(idCadeauToDelete) {

            deleteCadeau(idCadeauToDelete);

            window.location.reload();

        }

        editInvite(idInvite,nomInvite,prenomInvite,allergieInvite,presentCeremonieInvite,presentVinDHonneurInvite,presentRepasInvite,presentSoireeInvite) {
            document.getElementById("gestionInvite").style.display = "none";
            document.getElementById("editInvite").style.display = "block";

        }

        supprimerInvite(idInviteToDelete) {

            deleteInvite(idInviteToDelete);

            window.location.reload();
        }


        updateCadeau() {
            console.log(this.state.idEdit);

            var body = JSON.stringify({
                "nom": this.state.nomEdit,
                "prix": parseInt(this.state.prixEdit),
                "description": this.state.descEdit,
                "acheteurs":  this.state.achteurEdit ,
                "montantsRecoltes": this.state.recolteEdit ,
                "payement": "enattente"
              });
          putCadeau(this.state.idEdit, body);

          window.location.reload();
        }
       
        retourCadeau() {
            document.getElementById('editCadeau').style.display = "none";
            document.getElementById('nouveauCadeau').style.display = "none";
            document.getElementById('gererCadeau').style.display = "block";
            document.getElementById('gererContribution').style.display = "none";
        }

        retourInvite() {
            document.getElementById("gestionInvite").style.display = "block";
            document.getElementById("editInvite").style.display = "none";
        }

    render(){

        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div><br></br><br></br><br></br>Chargement…</div>;
        } else {

        return(
          <div className="w3-grayscale-min fondFormulaire" style={{width:"100%",height:"90%", backgroundColor:"rgb(255, 255, 204)", position:"absolute", top:"10%"}}>
      

      <div className="container mt-4" id="gererCadeau" style={{ position:"relative",height:"100%",width:"40%", float:"left"}}>
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
<a className="btn btn-secondary" style={{marginRight:"6px"}} onClick={this.editContribution.bind(this, item.nom, item.prix, item.id, item.description,item.acheteurs,item.montantsRecoltes)}>Voir les contributions</a>
    <a className="btn btn-secondary" style={{marginRight:"6px"}} onClick={this.editCadeau.bind(this, item.nom, item.prix, item.id, item.description,item.acheteurs,item.montantsRecoltes)}>Editer</a>
    <button className="btn btn-danger" style={{display: "inline-block"}} onClick={this.supprimerCadeau.bind(this, item.id)}>Supprimer</button>

</td> </tr>
        ))}
        </tbody>
    </table>
    <div className="text-right">
        <a className="btn btn-primary" onClick={this.nouveauCadeau.bind(this)}>Nouveau</a>
    </div>

</div>

<div className="container mt-4" id="nouveauCadeau" style={{ position:"relative",height:"100%",width:"50%", float:"left", display:"none"}}>
<h1>Nouveau Cadeau</h1>
<a className="btn btn-primary" onClick={this.retourCadeau}>Retour à la liste des cadeaux</a>

<div className="form-group">
      <label></label><br></br>
      <input type="text" placeholder="Nom" name="nomNouveauCadeau" className="form-control w-25" value={this.state.nomNouveauCadeau} onChange={this.handleInputChange}></input>
      </div>
      <div className="form-group">
      <label></label><br></br>
      <input type="text" placeholder="Prix" name="prixNouveauCadeau" className="form-control w-25" value={this.state.prixNouveauCadeau} onChange={this.handleInputChange}></input>
      </div>
      <div className="form-group">
      <label></label><br></br>
      <input type="text" placeholder="Description" name="descriptionNouveauCadeau" className="form-control w-25" value={this.state.descriptionNouveauCadeau} onChange={this.handleInputChange}></input>
      </div>

      <input type="submit" style={{backgroundColor: "#07132052",borderColor:"#a4caf3"}} className="form-control btn btn-primary w-25" value="Valider" onClick={this.envoieNouveauCadeau.bind(this)}></input>

</div>

<div className="container mt-4" id="editCadeau" style={{ position:"relative",height:"100%",width:"40%", float:"left", display:"none"}}>
<h1 id="cadeauToEdit"></h1>
<label></label><br></br>
      <input type="text" placeholder="Nom" name="nomEdit" className="form-control w-25" value={this.state.nomEdit} onChange={this.handleInputChange}></input>
      <input type="text" placeholder="Prix" name="prixEdit" className="form-control w-25" value={this.state.prixEdit} onChange={this.handleInputChange}></input>
      <input type="text" placeholder="Description" name="descEdit" className="form-control w-25" value={this.state.descEdit} onChange={this.handleInputChange}></input>
      
      <div className="text-right">
      <a className="btn btn-primary" onClick={this.retourCadeau}>Retour à la liste des cadeaux</a>
        <a className="btn btn-primary" onClick={this.updateCadeau.bind(this)}>Confirmer</a>
    </div>
   
</div>

<div  className="container mt-4" id="gererContribution"  style={{ position:"relative",height:"100%",width:"40%", float:"left", display:"none"}}>
<h1 id="nomCadeauContribution"></h1>
      <table className="table table-striped" id="investisseurs"> 
      </table>
      <div className="text-right">
      <a className="btn btn-primary" onClick={this.retourCadeau}>Retour à la liste des cadeaux</a>
      <a className="btn btn-primary" onClick={this.updateCadeau.bind(this)}>Confirmer</a>
      </div>
</div>

<div className="container mt-4" id="gestionInvite" style={{ position:"relative",height:"100%",width:"60%", float:"right"}}>
<h1>Gérer les invités</h1>
<table className="table table-striped" id="mesInvites">
    <th>Nom</th>
    <th>Prénom</th>
    <th>Cérémonie</th>
    <th>Vin d'honneur</th>
    <th>Repas</th>
    <th>Soirée</th>
    <th>Enfants</th>
    <th>Allergie(s)</th>
{this.state.invites.map(invite => (

<tr>
                     <td> {invite.nom}</td>
                     <td>{invite.prenom}</td>
                     <td>{invite.presentCeremonie ? "Oui" : "Non"} </td>
                     <td>{invite.presentVinDHonneur ? "Oui" : "Non"} </td>
                     <td>{invite.presentRepas ? "Oui" : "Non"} </td>
                     <td>{invite.presentSoiree ? "Oui" : "Non"} </td>
                     <td>{invite.enfants.length}</td>
                     <td>{invite.allergie}</td>
                     <td>
                     <span className="boutonDelete" style={{display: "inline-block"}} onClick={this.editInvite.bind(this,invite.id,invite.nom,invite.prenom,invite.allergie,invite.presentCeremonie,invite.presentVinDHonneur,invite.presentRepas,invite.presentSoiree)}>&#x270D;</span>
                         <span className="boutonDelete" style={{display: "inline-block"}} onClick={this.supprimerInvite.bind(this,invite.id)}>&#x274C;</span>
                    </td>
                       
                       </tr>
     ))}
</table>
</div>
<div className="container mt-4" id="editInvite" style={{ position:"relative",height:"100%",width:"60%", float:"right", display:"none"}}>
<h1 className="nomInviteToModif"></h1>
      <input type="text" placeholder="Nom" name="nomInviteToEdit" className="form-control w-25" value={this.state.nomInviteToEdit} onChange={this.handleInputChange}></input>
      <input type="text" placeholder="Prénom" name="prenomInviteToEdit" className="form-control w-25" value={this.state.prenomInviteToEdit} onChange={this.handleInputChange}></input>
      <input type="text" placeholder="Allergies" name="allergieInviteToEdit" className="form-control w-25" value={this.state.allergieInviteToEdit} onChange={this.handleInputChange}></input>
      <div className="form-check">
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input className="form-check-input" type="checkbox" name="invitePresentCeremonieToEdit" checked={this.state.invitePresentCeremonieToEdit}  onChange={this.handleInputChange} ></input>Cérémonie
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox" name="invitePresentRepasToEdit" className="form-check-input" checked={this.state.invitePresentRepasToEdit} onChange={this.handleInputChange}></input>Repas
      </label>

      
      <label className="form-check-label"  style={{marginRight:"5%"}}>
      <input type="checkbox" name="invitePresentVinDHonneurToEdit" className="form-check-input" checked={this.state.presentVinDHonneur} onChange={this.handleInputChange}></input>Vin d'honneur
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox"  className="form-check-input" name="invitePresentSoireeToEdit" checked={this.state.invitePresentSoireeToEdit} onChange={this.handleInputChange}></input>Soirée
      </label>
      
</div>
<div className="text-right">
<a className="btn btn-primary" onClick={this.retourInvite}>Retour à la liste des invités</a>
</div>
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
