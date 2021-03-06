import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import cadeau from "../../img/cadeau.png"
import { number } from 'prop-types';
import fleur from "../../img/FondFleurs.png"
import fleurs from "../../img/Fleurs.png"
import { getCadeaux, getInvites, putCadeau,putInvite, deleteCadeau, postCadeau,postInvite, deleteInvite } from "../Utils/fetching.js"
import ReactDOM from 'react-dom';
import {COLOR} from "../Utils/Color.js"
import { withAlert } from 'react-alert'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";
import RingLoader from "react-spinners/RingLoader";





class Administration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //State load cadeau/invite
            error: null,
            isLoadingCadeaux: true,
            isLoadingInvites: true,
            opacityCadeaux: '100%',
            opacityInvites: '100%',

            items: [],
            invites: [],
            nbEnfants: Number(),


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

            //State nouvel invite
            nomNouvelInvite: new String(),
            prenomNouvelInvite: new String(),
            allergieNouvelInvite: new String(),
            accompagneNouvelInvite: false,
            presentVinDHonneurNouvelInvite: false,
            presentRepasNouvelInvite: false,
            presentSoireeNouvelInvite: false,
            presentCeremonieNouvelInvite: false,
            enfantsNouvelInvite: [],

            //State invite edit
            idInviteToEdit: Number(),
            nomInviteToEdit: new String(),
            prenomInviteToEdit: new String(),
            invitePresentCeremonieToEdit: false,
            invitePresentRepasToEdit: false,
            invitePresentSoireeToEdit: false,
            invitePresentVinDHonneurToEdit: false,
            inviteAccompagnantToEdit: false,
            allergieInviteToEdit: new String(),
            enfantsInviteToEdit: [],


            //State statistiques invités
            nombrePrésentCérémonie: Number(),
            nombrePrésentVD: Number(),
            nombrePrésentRepas: Number(),
            nombrePrésentSoirée: Number(),



        };

        this.editCadeau = this.editCadeau.bind(this);
        this.supprimerCadeau = this.supprimerCadeau.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeNouvelInvite = this.handleInputChangeNouvelInvite.bind(this);
        this.suppInvestisseur = this.suppInvestisseur.bind(this);
        this.updateCadeau = this.updateCadeau.bind(this);
        this.nouveauCadeau = this.nouveauCadeau.bind(this);
        this.envoieNouveauCadeau = this.envoieNouveauCadeau.bind(this);
        this.envoieNouvelInvite = this.envoieNouvelInvite.bind(this);
        this.supprimerInvite = this.supprimerInvite.bind(this);
        this.editInvite = this.editInvite.bind(this);
        this.updateInvite = this.updateInvite.bind(this);
        this.handleClickAddEnfant = this.handleClickAddEnfant.bind(this);
        this.handleClickDeleteEnfant = this.handleClickDeleteEnfant.bind(this);
        this.handleClickAddEnfantNouvelInvite = this.handleClickAddEnfantNouvelInvite.bind(this);
        this.handleClickDeleteEnfantNouvelInvite = this.handleClickDeleteEnfantNouvelInvite.bind(this);



    }

// Chargement des cadeaux et des invités //
    componentDidMount() {

        getCadeaux().then(
            (result) => {

                this.setState({
                    isLoadingCadeaux: false,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoadingCadeaux: false,
                    error
                });
            }
        )

        getInvites().then(
            (result) => {
                this.setState({
                    isLoadingInvites: false,
                    invites: result
                });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
                this.setState({
                    isLoadingInvites: false,
                    error
                });
            }
        )
    }


    // state à jour au changement d'un input text/number //
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'invitePresentCeremonieToEdit' || target.name === 'inviteAccompagnantToEdit' ||
        target.name === 'invitePresentRepasToEdit' || target.name === 'invitePresentSoireeToEdit' || target.name === 'invitePresentVinDHonneurToEdit'
        || target.name === 'accompagneNouvelInvite' || target.name === 'presentCeremonieNouvelInvite' || target.name === 'presentRepasNouvelInvite'
        || target.name === 'presentSoireeNouvelInvite' || target.name === 'presentVinDHonneurNouvelInvite' ? target.checked : target.value;
        const name = target.name;

        if(!isNaN(parseInt(name))){
            this.state.enfantsInviteToEdit[name] = value;
          }else{
            this.setState({
              [name]: value
            });
          }

      }

      handleInputChangeNouvelInvite(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

            this.state.enfantsNouvelInvite[name] = value;
      }


    // Supprimer la contribution à un cadeau
      async suppInvestisseur(indexAsupprimer) {
        this.setState({
          isLoadingCadeaux: true,
          opacityCadeaux: '50%'
        })
        var tableauAcheteur = this.state.achteurEdit;
        tableauAcheteur.splice(indexAsupprimer, 1);
        this.state.achteurEdit = tableauAcheteur;

        var tableauRecolte = this.state.recolteEdit;
        tableauRecolte.splice(indexAsupprimer,1);
        this.state.recolteEdit = tableauRecolte;


        var body = JSON.stringify({
            "nom": this.state.nomEdit,
            "prix": parseInt(this.state.prixEdit),
            "description": this.state.descEdit,
            "acheteurs":  this.state.achteurEdit ,
            "montantsRecoltes": this.state.recolteEdit ,
            "payement": "enattente"
          });
           var request = await putCadeau(this.state.idEdit, body);
           if(request){
             this.setState({
               isLoadingCadeaux: false,
               opacityCadeaux: '100%'
             })
             this.props.alert.success('Contribution supprimée ! ')
             document.getElementById(indexAsupprimer).style.display = "none";
           }else{
             this.setState({
               isLoadingCadeaux: false,
               opacityCadeaux: '100%'
             })
             this.props.alert.error('Echec de suppression de la contribution ! ')
           }

        }


// AFFICHAGE DES DIFFERENTES VUES AU CLICK D UN BOUTON
    // Affichage vue nouveau Cadeau
     nouveauCadeau() {
                document.getElementById("nouveauCadeau").style.display = "block";
                document.getElementById("gererCadeau").style.display = "none";
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

        var enteteEditCadeau = [];
        enteteEditCadeau[0] = <span style={{float:"right", backgroundColor: COLOR.gris, borderColor: COLOR.gris, color:COLOR.blanc}} className="btn btn-warning" onClick={()=>this.retourCadeau(false)}>&#x21A9;</span>;
        enteteEditCadeau[1] = "Editer le cadeau " + cadeauNom;
        ReactDOM.render(enteteEditCadeau, document.getElementById("cadeauToEdit"));

        }

    // Vue edit Contribution d'un cadeau
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
        var enteteContribution = [];
        enteteContribution[0] = <span className="btn btn-warning" style={{float:"right", backgroundColor: COLOR.gris, borderColor: COLOR.gris, color:COLOR.blanc}} onClick={()=>this.retourCadeau(false)}> &#x21A9;</span>;
        enteteContribution[1] = "Contributions du cadeau : " + cadeauNom;
        ReactDOM.render(enteteContribution, document.getElementById("nomCadeauContribution"));
       // document.getElementById("nomCadeauContribution").innerHTML = "Contributions pour le cadeau :" + cadeauNom;
        this.state.recolteEdit = recoltes;
        this.state.achteurEdit = acheteurs;

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


    // Vue edit invite
    editInvite(idInvite,nomInvite,prenomInvite,allergieInvite,presentCeremonieInvite,presentVinDHonneurInvite,presentRepasInvite,presentSoireeInvite,accompagnantInvite,enfantsInvite) {
            document.getElementById("gestionInvite").style.display = "none";
            document.getElementById("editInvite").style.display = "block";


            this.setState({
                idInviteToEdit: idInvite,
                nomInviteToEdit: nomInvite,
                prenomInviteToEdit: prenomInvite,
                allergieInviteToEdit: allergieInvite,
                inviteAccompagnantToEdit: accompagnantInvite,
                invitePresentCeremonieToEdit: presentCeremonieInvite,
                invitePresentVinDHonneurToEdit: presentVinDHonneurInvite,
                invitePresentRepasToEdit: presentRepasInvite,
                invitePresentSoireeToEdit: presentSoireeInvite,
                enfantsInviteToEdit: enfantsInvite
              });

              var ententeEditInvite = [];
              ententeEditInvite[0] = <span className="btn btn-warning" style={{float:"right", backgroundColor: COLOR.gris, borderColor: COLOR.gris, color: COLOR.blanc}} onClick={() => this.retourInvite(false)}> &#x21A9;</span>;
              ententeEditInvite[1] = "Editer l'invité : " + nomInvite + " " + prenomInvite
              ReactDOM.render(ententeEditInvite,document.getElementById("nomInviteToModif"));

        }

    // Vue nouvel invite
    nouveauInvite() {
        document.getElementById("nouvelInvite").style.display = "block";
        document.getElementById("editInvite").style.display = "none";
        document.getElementById("gestionInvite").style.display = "none";

    }

    // Retourner vers la liste des cadeaux
    retourCadeau(isRequest) {
      if(isRequest){
        getCadeaux().then(
            (result) => {
              document.getElementById('editCadeau').style.display = "none";
              document.getElementById('nouveauCadeau').style.display = "none";
              document.getElementById('gererCadeau').style.display = "block";
              document.getElementById('gererContribution').style.display = "none";
                this.setState({
                    isLoadingCadeaux: false,
                    opacityCadeaux: '100%',
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoadingCadeaux: false,
                    opacityCadeaux: '100%',
                    error
                });
            }
        )
      }else{
          document.getElementById('editCadeau').style.display = "none";
          document.getElementById('nouveauCadeau').style.display = "none";
          document.getElementById('gererCadeau').style.display = "block";
          document.getElementById('gererContribution').style.display = "none";
      }

    }

    // Retourner vers la liste des invités
    retourInvite(isRequest) {

if(isRequest){
  getInvites().then(
      (result) => {
        document.getElementById("gestionInvite").style.display = "block";
        document.getElementById("editInvite").style.display = "none";
        document.getElementById("nouvelInvite").style.display = "none";
          this.setState({
              isLoadingInvites: false,
              opacityInvites: '100%',
              invites: result
          });
      },
      // Remarque : il est important de traiter les erreurs ici
      // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
      // des exceptions provenant de réels bugs du composant.
      (error) => {
          this.setState({
              isLoadingInvites: false,
              opacityInvites: '100%',
              error
          });
      }
  )
}else{
  document.getElementById("gestionInvite").style.display = "block";
  document.getElementById("editInvite").style.display = "none";
  document.getElementById("nouvelInvite").style.display = "none";
}

    }


    // FONCTION DE SUPPRESSION
    //Supprimer un cadeau
    async supprimerCadeau(idCadeauToDelete) {
        this.setState({
          isLoadingCadeaux: true,
          opacityCadeaux: '50%'
        })
        var request = await deleteCadeau(idCadeauToDelete);
        if(request){
          this.retourCadeau(true)
          this.props.alert.success('Cadeau supprimé ! ')

        }else{
          this.props.alert.error('Echec de la suppression du cadeau ! ')
          this.setState({
            isLoadingCadeaux: false,
            opacityCadeaux: '100%'
          })

        }

    }
    //Supprimer un invite
    async supprimerInvite(idInviteToDelete) {
      this.setState({
        isLoadingInvites: true,
        opacityInvites: '50%'
      })
        var request = await deleteInvite(idInviteToDelete);
        if(request){
          this.retourInvite(true)
          this.props.alert.success('Invité supprimé ! ')

        }else{
          this.props.alert.error('Echec de la suppression de l\'invité ! ')
          this.setState({
            isLoadingInvites: false,
            opacityInvites: '100%'
          })

        }


    }

    // FONCTION UPDATE
    // Modifier un cadeau
    async updateCadeau() {
      this.setState({
        isLoadingCadeaux: true,
        opacityCadeaux: '50%'
      })
        var body = JSON.stringify({
            "nom": this.state.nomEdit,
            "prix": parseInt(this.state.prixEdit),
            "description": this.state.descEdit,
            "acheteurs":  this.state.achteurEdit ,
            "montantsRecoltes": this.state.recolteEdit ,
            "payement": "enattente"
          });
       var request = await putCadeau(this.state.idEdit, body);
       if(request){
         this.retourCadeau(true)
         this.props.alert.success('Cadeau Modifié ! ')

       }else{
         this.props.alert.error('Echec de la modification du cadeau ! ')
         this.setState({
           isLoadingCadeaux: false,
           opacityCadeaux: '100%'
         })
       }
    }
   //Modifier un invité
  async updateInvite() {
    this.setState({
      isLoadingInvites: true,
      opacityInvites: '50%'
    })
        var body = JSON.stringify({
            "allergie": this.state.allergieInviteToEdit,
            "accompagnant": this.state.inviteAccompagnantToEdit,
            "presentCeremonie": this.state.invitePresentCeremonieToEdit,
            "presentVinDHonneur": this.state.invitePresentVinDHonneurToEdit,
            "presentRepas": this.state.invitePresentRepasToEdit,
            "presentSoiree": this.state.invitePresentSoireeToEdit,
            "nom": this.state.nomInviteToEdit,
            "prenom": this.state.prenomInviteToEdit,
            "enfants": this.state.enfantsInviteToEdit

          });

          var request = await putInvite(this.state.idInviteToEdit, body);
          if(request){
            this.retourInvite(true)
            this.props.alert.success('Invité Modifié ! ')
          }else{
            this.props.alert.error('Echec de la modification de l\'invité ! ')
            this.setState({
              isLoadingInvites: false,
              opacityInvites: '100%'
            })
          }



    }

    //GESTION DES ENFANTS  D'UN INVITE EXISTANT
    //Ajoute un enfant
    handleClickAddEnfant(){
        var enfantToEditUpdate = this.state.enfantsInviteToEdit.concat(0);
        this.setState({enfantsInviteToEdit: enfantToEditUpdate})
       this.renderInputEnfant();
       console.log(this.state.enfantsInviteToEdit);
      }
    //Supprime un enfant
      handleClickDeleteEnfant(){
          var arrayUpdate = this.state.enfantsInviteToEdit;
          var indexAsupprimer = this.state.enfantsInviteToEdit.length - 1;
         arrayUpdate.splice(indexAsupprimer,1);
         this.setState({enfantsInviteToEdit: arrayUpdate})


       this.renderInputEnfant();
      }
    //Affiche le nombre d'enfants sous form d'input number
      renderInputEnfant(){
        var enfantsToRender = new Array();
        for ( var i = 0; i < this.state.enfantsInviteToEdit.length; i++){
            var nom = "enfantsInviteToEdit["+i+"]";
            enfantsToRender[i]  = <input style={{marginRight:"1%"}} type="number" placeholder={this.state.enfantsInviteToEdit[i]} className="form-control w-10" min="0" max="18" name={i} onChange={this.handleInputChange}></input>;
         }
        return enfantsToRender;
      }

    //GESTION DES ENFANTS D'UN NOUVEL INVITE
    //Ajoute un enfant
    handleClickAddEnfantNouvelInvite(){
        var enfantToEditUpdate = this.state.enfantsNouvelInvite.concat(0);
        this.setState({enfantsNouvelInvite: enfantToEditUpdate})
        this.renderInputEnfantNouvelInvite();
       console.log(this.state.enfantsNouvelInvite);
      }
    //Supprime un enfant
      handleClickDeleteEnfantNouvelInvite(){
          var arrayUpdate = this.state.enfantsNouvelInvite;
          var indexAsupprimer = this.state.enfantsNouvelInvite.length - 1;
         arrayUpdate.splice(indexAsupprimer,1);
         this.setState({enfantsNouvelInvite: arrayUpdate})


       this.renderInputEnfantNouvelInvite();
      }
    //Affiche le nombre d'enfants sous form d'input number
      renderInputEnfantNouvelInvite(){
        var enfantsToRender = new Array();
        for ( var i = 0; i < this.state.enfantsNouvelInvite.length; i++){
            enfantsToRender[i]  = <input style={{marginRight:"1%"}} type="number" placeholder={this.state.enfantsNouvelInvite[i]} className="form-control w-10" min="0" max="18" name={i} onChange={this.handleInputChangeNouvelInvite}></input>;
         }
        return enfantsToRender;
      }


    // FONCTION D'AJOUT
    // Création d'un nouveau cadeau
   async envoieNouveauCadeau() {
     if(parseInt(this.state.prixNouveauCadeau) == 0 || this.state.nomNouveauCadeau == ''){
       this.props.alert.error('Veuillez indiquer le prix et le nom du cadeau ! ')
     }else{
       this.setState({
         isLoadingCadeaux: true,
         opacityCadeaux: '50%'
       })
       var body = JSON.stringify({
           "nom": this.state.nomNouveauCadeau,
           "prix": parseInt(this.state.prixNouveauCadeau),
           "description": this.state.descriptionNouveauCadeau,
           "acheteurs": [],
           "montantsRecoltes": [],
           "payement": ""
         })

      var request = await postCadeau(body)
      if(request){
        this.retourCadeau(true)
        this.props.alert.success('Cadeau ajouté ! ')
      }else{
        this.setState({
          isLoadingCadeaux: false,
          opacityCadeaux: '100%'
        })
        this.props.alert.error('Echec de l\'ajout du cadeau ! ')

      }
     }
    }
    //Création d'un nouvel invite
    async envoieNouvelInvite() {
      if(parseInt(this.state.prenomNouvelInvite) == '' || this.state.nomNouvelInvite == ''){
        this.props.alert.error('Veuillez indiquer le nom et le prénom de l\'invité ! ')
      }else{
        this.setState({
          isLoadingInvites: true,
          opacityInvites: '50%'
        })
        var body = JSON.stringify({
            "allergie": this.state.allergieNouvelInvite,
            "accompagnant": this.state.accompagneNouvelInvite,
            "enfants": this.state.enfantsNouvelInvite,
            "presentCeremonie": this.state.presentCeremonieNouvelInvite,
            "presentVinDHonneur": this.state.presentVinDHonneurNouvelInvite,
            "presentRepas": this.state.presentRepasNouvelInvite,
            "presentSoiree": this.state.presentSoireeNouvelInvite,
            "nom": this.state.nomNouvelInvite,
            "prenom": this.state.prenomNouvelInvite
          })
        var request = await postInvite(body)
        if(request){
          this.retourInvite(true)
          this.props.alert.success('Invité ajouté ! ')
        }else{
          this.props.alert.error('Echec de l\'ajout de l\'invité ! ')
          this.setState({
            isLoadingInvites: false,
            opacityInvites: '100%'
          })
        }

      }
    }

    renderLoaderCadeaux(){
      if (this.state.isLoadingCadeaux) {
         return <div className="sweet-loading" style={{position:'absolute', top:'36%', left:'45%'}}>
     <HashLoader
       css={ css`
         display: block;
         margin: 0 auto;
         border-color: #040e60;
       `}
       size={50}
       color={COLOR.bleu}
     />
   </div>
    }
  }
  renderLoaderInvites(){
    if (this.state.isLoadingInvites) {
       return <div className="sweet-loading" style={{position:'absolute', top:'36%', right:'45%'}}>
   <HashLoader
     css={ css`
       display: block;
       margin: 0 auto;
       border-color: #040e60;
     `}
     size={50}
     color={COLOR.bleu}
   />
 </div>
  }
}







    render(){

        const { error, isLoadingCadeaux, items } = this.state;

        if (error) {
            return <div style={{backgroundColor:COLOR.argente, height:'100%'}}>Erreur : {error.message}</div>;
        }else {

        return(
<div className="w3-grayscale-min fondFormulaire" style={{width:"100%",height:"90%", backgroundColor:COLOR.bleu, position:"absolute", top:"10%"}}>



{/* DIV/VUE DE LA LISTE DES CADEAUX, DE LA GESTION DES CADEAUX  */}
 <div className="container table-wrapper-scroll-y my-custom-scrollbar" id="gererCadeau" style={{ position:"relative",marginTop:"0px",height:"100%",width:"40%", float:"left", maxHeight:"100%"}}>

 <div style={{ opacity:this.state.opacityCadeaux}}>
 {this.renderLoaderCadeaux()}


    <h1>Gérer les cadeaux
    <span className="btn btn-primary" style={{float:"right", backgroundColor: COLOR.gris, borderColor: COLOR.gris, color:COLOR.blanc}} onClick={this.nouveauCadeau.bind(this)}>&#x1F381; Nouveau</span>
    </h1>



    <table className="table" style={{padding:"0px"}}>
        <thead>
            <th style={{borderBottom: "0px"}}>Noms</th>

        </thead>
        <tbody>



        {items.map(item => (<tr>
                        <td id={item.id} style={{color:"black"}}
                        key={item.id}
                        //onClick={this.handleClick.bind(this, item.nom, item.prix, item.id, item.description, item.acheteurs, item.montantsRecoltes)}
                        >
                          {item.nom}  {item.prix} €
                        </td>


<td> </td>
<td style={{padding:"0px"}}>
<span className="boutonDelete" style={{display: "inline-block",fontSize:"23px", fontFamily: "auto", marginRight:"6px"}} onClick={this.editContribution.bind(this, item.nom, item.prix, item.id, item.description,item.acheteurs,item.montantsRecoltes)}>&#x1F5F3; </span>
    <span className="boutonDelete" style={{marginRight:"6px"}} onClick={this.editCadeau.bind(this, item.nom, item.prix, item.id, item.description,item.acheteurs,item.montantsRecoltes)}>&#x270D;</span>
    <span className="boutonDelete" style={{display: "inline-block"}} onClick={this.supprimerCadeau.bind(this, item.id)}>&#x274C;</span>

</td> </tr>
        ))}
        </tbody>
    </table>
    </div>
</div>



{/* DIV/VUE POUR CREER UN NOUVEAU CADEAU */}
<div className="container" id="nouveauCadeau" style={{ position:"relative",marginTop:"none",height:"100%",width:"40%", float:"left", display:"none", fontFamily:"monospace"}}>
<div style={{ opacity:this.state.opacityCadeaux}}>
{this.renderLoaderCadeaux()}
<h1>Nouveau Cadeau
<span className="btn btn-warning"  style={{float:"right",backgroundColor: COLOR.gris, borderColor: COLOR.gris, color:COLOR.blanc}} onClick={()=>this.retourCadeau(false)}> &#x21A9;</span>
</h1>

<div className="form-group">
<br></br><label></label>
 <input type="text" placeholder="Nom du cadeau" name="nomNouveauCadeau" className="form-control w-50" value={this.state.nomNouveauCadeau} onChange={this.handleInputChange}></input>
      </div>
      <div className="form-group">
      <br></br>
      <label>Prix : </label>
      <input type="text" style={{display:"inline-block", marginLeft: '1%', width: '12%'}} placeholder="Prix" name="prixNouveauCadeau" className="form-control" value={this.state.prixNouveauCadeau} onChange={this.handleInputChange}></input> €
      </div>
      <div className="form-group h-25">
      <label></label><br></br>
      <input type="text" placeholder="Description" name="descriptionNouveauCadeau" className="form-control w-100 h-75" value={this.state.descriptionNouveauCadeau} onChange={this.handleInputChange}></input>
      </div>

      <span className="btn btn-success w-25"  style={{float:"left", backgroundColor: COLOR.bleu, borderColor: COLOR.bleu, color:COLOR.blanc, marginTop: '2%'}} onClick={this.envoieNouveauCadeau.bind(this)}>Ajouter </span>
 </div>
</div>



{/* DIV/VUE POUR EDITER UN CADEAU */}
<div className="container" id="editCadeau" style={{ position:"relative",marginTop:"none",height:"100%",width:"40%", float:"left", display:"none",fontFamily:"monospace"}}>
<div style={{ opacity:this.state.opacityCadeaux}}>
{this.renderLoaderCadeaux()}


<h1 id="cadeauToEdit">
</h1>
<label></label><br></br>

      Nom : <br></br><input type="text" placeholder="Nom" name="nomEdit" style={{display:"inline-block"}} className="form-control w-25" value={this.state.nomEdit} onChange={this.handleInputChange}></input><br></br><br></br>
      Prix : <br></br><input type="text" style={{display:"inline-block", width:'12%'}} placeholder="Prix" name="prixEdit" className="form-control" value={this.state.prixEdit} onChange={this.handleInputChange}></input> €<br></br><br></br>
      Description : <br></br><input type="text" style={{display:"inline-block"}} placeholder="Description" name="descEdit" className="form-control w-50" value={this.state.descEdit} onChange={this.handleInputChange}></input><br></br>


        <span className="btn btn-success w-25" style={{float:"left", backgroundColor: COLOR.bleu, borderColor: COLOR.bleu, color:COLOR.blanc, marginTop: '2%'}} onClick={this.updateCadeau.bind(this)}>Modifier </span>


 </div>
</div>



{/* DIV/VUE POUR GESTION DES CONTRIBUTIONS D'UN CADEAU */}

<div  className="container table-wrapper-scroll-y my-custom-scrollbar" id="gererContribution"  style={{ position:"relative",marginTop:"none",height:"100%",width:"40%", float:"left", display:"none",fontFamily:"monospace",maxHeight:"100%"}}>
<div style={{ opacity:this.state.opacityCadeaux}}>
{this.renderLoaderCadeaux()}
<h1 id="nomCadeauContribution" style={{padding:20}}>
</h1>
      <table className="table table-striped" id="investisseurs">

      </table>
      </div>
</div>



{/* DIV/VUE POUR L'AFFICHAGE ET LA GESTION DES INVITES */}
<div className="container table-wrapper-scroll-y my-custom-scrollbar" id="gestionInvite" style={{ position:"relative",marginTop:"none",height:"100%",width:"60%", float:"right", maxHeight:"100%"}}>
<div style={{ opacity:this.state.opacityInvites}}>
{this.renderLoaderInvites()}
<h1>Gérer les invités
<span className="btn btn-primary" style={{float:"right", backgroundColor: COLOR.gris, borderColor: COLOR.gris, color:COLOR.blanc}} onClick={this.nouveauInvite.bind(this)}>&#x1F64B; Nouveau</span>
</h1>

<table className="table" id="mesInvites">
  <thead>
    <th>Nom</th>
    <th>Prénom</th>
    <th>Accompagné</th>
    <th>Cérémonie</th>
    <th>Vin d'honneur</th>
    <th>Repas</th>
    <th>Soirée</th>
    <th>Enfants</th>
    <th>Allergie(s)</th>
  </thead>
  <tbody>



{this.state.invites.map(invite => (

<tr>

{(() =>{
  if ( invite.nom.length > 10 ) { return <td> {invite.nom.substr(0,10)}...</td>}
  else { return <td> {invite.nom}</td>}
})()}

{(() =>{
  if ( invite.prenom.length > 10 ) { return <td> {invite.prenom.substr(0,10)}...</td>}
  else { return <td> {invite.prenom}</td>}
})()}



                    <td>{invite.accompagnant ? "Oui" : "Non"} </td>

                     <td>{invite.presentCeremonie ? "Oui" : "Non"} </td>
                     <td>{invite.presentVinDHonneur ? "Oui" : "Non"} </td>
                     <td>{invite.presentRepas ? "Oui" : "Non"} </td>
                     <td>{invite.presentSoiree ? "Oui" : "Non"} </td>
                     <td>{invite.enfants.length}</td>
                     {(() =>{
  if ( invite.allergie.length > 10 ) { return <td> {invite.allergie.substr(0,10)}...</td>}
  else { return <td> {invite.allergie}</td>}
})()}
                     <td style={{display:"flex"}}>
                     <span className="boutonDelete" style={{display: "inline-block"}} onClick={this.editInvite.bind(this,invite.id,invite.nom,invite.prenom,invite.allergie,invite.presentCeremonie,invite.presentVinDHonneur,invite.presentRepas,invite.presentSoiree,invite.accompagnant,invite.enfants)}>&#x270D;</span>
                         <span className="boutonDelete" style={{display: "inline-block"}} onClick={this.supprimerInvite.bind(this,invite.id)}>&#x274C;</span>
                    </td>

                       </tr>
     ))}
     </tbody>
</table>
</div>
</div>



{/* DIV/VUE POUR MODIFIER UN INVITE */}
<div className="container" id="editInvite" style={{ position:"relative",marginTop:"none",height:"100%",width:"60%", float:"right", display:"none"}}>
<div style={{ opacity:this.state.opacityInvites}}>
{this.renderLoaderInvites()}
<h1 id="nomInviteToModif"></h1>
    Nom : <input type="text" placeholder="Nom" name="nomInviteToEdit" style={{marginBottom:'2%'}} className="form-control w-25" value={this.state.nomInviteToEdit} onChange={this.handleInputChange}></input>
      Prenom : <input type="text" placeholder="Prénom" name="prenomInviteToEdit" style={{marginBottom:'2%'}} className="form-control w-25" value={this.state.prenomInviteToEdit} onChange={this.handleInputChange}></input>
      Allergie(s) : <input type="text" placeholder="Allergies" name="allergieInviteToEdit" style={{marginBottom:'2%'}} className="form-control w-25" value={this.state.allergieInviteToEdit} onChange={this.handleInputChange}></input>
      <br></br>
      <div className="form-check">
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input className="form-check-input" type="checkbox" name="invitePresentCeremonieToEdit" checked={this.state.invitePresentCeremonieToEdit}  onChange={this.handleInputChange} ></input>Cérémonie
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox" name="invitePresentRepasToEdit" className="form-check-input" checked={this.state.invitePresentRepasToEdit} onChange={this.handleInputChange}></input>Repas
      </label>

      <label className="form-check-label"  style={{marginRight:"5%"}}>
      <input type="checkbox" name="invitePresentVinDHonneurToEdit" className="form-check-input" checked={this.state.invitePresentVinDHonneurToEdit} onChange={this.handleInputChange}></input>Vin d'honneur
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox"  className="form-check-input" name="invitePresentSoireeToEdit" checked={this.state.invitePresentSoireeToEdit} onChange={this.handleInputChange}></input>Soirée
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox"  className="form-check-input" name="inviteAccompagnantToEdit" checked={this.state.inviteAccompagnantToEdit} onChange={this.handleInputChange}></input>Accompagnant
      </label>
</div>
<br></br>
<div className="form-inline">
    Enfants :
        {this.renderInputEnfant()}
        <input type="button" className="bouton-add" value="+" onClick={this.handleClickAddEnfant.bind()}/>
        <input type="button" className="bouton-add" value="-" onClick={this.handleClickDeleteEnfant.bind()}/>
      </div>



  <br></br>
<span className="btn btn-success w-25" style={{float:"left", backgroundColor: COLOR.bleu, borderColor: COLOR.bleu, color:COLOR.blanc, marginTop: '2%'}} onClick={this.updateInvite}>Modifier</span>
 </div>
</div>



{/* DIV/VUE POUR CREER UN INVITE */}
<div className="container" id="nouvelInvite" style={{ position:"relative",marginTop:"none",height:"100%",width:"60%", float:"right", display:"none"}}>
<div style={{ opacity:this.state.opacityInvites}}>
{this.renderLoaderInvites()}
<h1>Nouvel Invité
<span style={{float:"right", backgroundColor: COLOR.gris, borderColor: COLOR.gris, color:COLOR.blanc}} className="btn btn-warning" onClick={() => this.retourInvite(false)}>&#x21A9;</span>
</h1>


<div className="form-group">
      <label></label><br></br>
      <input type="text" placeholder="Nom" name="nomNouvelInvite" className="form-control w-25" value={this.state.nomNouvelInvite} onChange={this.handleInputChange}></input>
      </div>
      <div className="form-group">
      <label></label>
      <input type="text" placeholder="Prenom" name="prenomNouvelInvite" className="form-control w-25" value={this.state.prenomNouvelInvite} onChange={this.handleInputChange}></input>
      </div>
      <div className="form-group">
      <label></label>
      <input type="text" placeholder="Allergie(s)" name="allergieNouvelInvite" className="form-control w-25" value={this.state.allergieNouvelInvite} onChange={this.handleInputChange}></input>
      </div>

      <div className="form-check">
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input className="form-check-input" type="checkbox" name="presentCeremonieNouvelInvite" checked={this.state.presentCeremonieNouvelInvite}  onChange={this.handleInputChange} ></input>Cérémonie
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox" name="presentRepasNouvelInvite" className="form-check-input" checked={this.state.presentRepasNouvelInvite} onChange={this.handleInputChange}></input>Repas
      </label>


      <label className="form-check-label"  style={{marginRight:"5%"}}>
      <input type="checkbox" name="presentVinDHonneurNouvelInvite" className="form-check-input" checked={this.state.presentVinDHonneurNouvelInvite} onChange={this.handleInputChange}></input>Vin d'honneur
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox"  className="form-check-input" name="presentSoireeNouvelInvite" checked={this.state.presentSoireeNouvelInvite} onChange={this.handleInputChange}></input>Soirée
      </label>
      <label className="form-check-label" style={{marginRight:"5%"}}>
      <input type="checkbox"  className="form-check-input" name="accompagneNouvelInvite" checked={this.state.accompagneNouvelInvite} onChange={this.handleInputChange}></input>Accompagnant
      </label>
</div>

<div className="form-inline">
    Enfants :
        {this.renderInputEnfantNouvelInvite()}
        <input type="button" className="bouton-add" value="+" onClick={this.handleClickAddEnfantNouvelInvite.bind()}/>
        <input type="button" className="bouton-add" value="-" onClick={this.handleClickDeleteEnfantNouvelInvite.bind()}/>
      </div>
    <br></br>
      <span className="btn btn-success w-25" style={{float:"left", backgroundColor: COLOR.bleu, borderColor: COLOR.bleu, color:COLOR.blanc, marginTop: '2%'}} onClick={this.envoieNouvelInvite.bind(this)}>Ajouter</span>

 </div>
</div>



      </div>
        )
        }
      }
    }

export default withAlert()(Administration);

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
