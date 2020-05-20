import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import cadeau from "../../img/cadeau.png"
import { number } from 'prop-types';
import fleur from "../../img/FondFleurs.png"
import fleurs from "../../img/Fleurs.png"
import { getCadeaux, getInvites, putCadeau } from "../Utils/fetching.js"
import { COLOR } from "../Utils/Color.js"
import { contributionCadeauValide, calculTotalRecolte } from '../Utils/functions.js'


class Cadeau extends Component {

/* Définitions des states */
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            infoCadeau: "Cliquer sur un cadeau pour obtenir plus d'informations",
            infoDescCadeau: "",
            montantRecolte: 0,
            invites: [],
            payementMariage : true,
            payementEnLigne : false,
            cadeauID: 0,
            cadeauNom: "",
            cadeauPrix: "",
            cadeauDesc: "",
            acheteurs: '',
            montantsRecoltes: '',
            totalRecolte:  Number(),
            resteContrib: Number(),
            prenomAcheteur: new String(),
            nomAcheteur: new String(),

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.conditionCheck = this.conditionCheck.bind(this);
    }




    /* Appele de notre api pour les tables cadeaux et invités */
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


    /* Affichage lors d'un clique sur un cadeau*/
    handleClick(cadeauNom, cadeauPrix, cadeauID, cadeauDesc, acheteurs ,montantsRecoltes) {
        this.setState(state => ({
          infoCadeau: cadeauNom + " prix estimé : " + cadeauPrix + " €",
          infoDescCadeau:  "Description : \n" + cadeauDesc
        }));

        document.getElementById('imgCadeau').style.display ="none";
        document.getElementById('formPayement').style.display ="block";

       document.getElementById('montantCadeau').value = 0;


       this.setState({
        cadeauID: cadeauID,
        cadeauPrix: cadeauPrix,
        cadeauNom: cadeauNom,
        cadeauDesc: cadeauDesc,
        acheteurs: acheteurs,
        montantsRecoltes: montantsRecoltes,
        montantRecolte: 0
       });

     var totalRecoltee =  calculTotalRecolte(montantsRecoltes);

        this.setState({
        totalRecolte: totalRecoltee,
        resteContrib: cadeauPrix - totalRecoltee
    })

    document.getElementById("montantRecolte").style.display = "block";

}



      /* Condition d'envoie Payement client cadeau*/
    handleSubmit(event) {

        //acheteurId = findAcheteurId(this.state.nom, this.state.prenom);

        var maxCadeau = document.getElementById('montantCadeau').max;
        var minCadeau = document.getElementById('montantCadeau').min;


        if(contributionCadeauValide(this.state.montantRecolte, maxCadeau, 1)) {
            alert('Entrer une valeur entre' + 1 + ' et' + maxCadeau +' €');
            this.setState(state => ({
                montantRecolte:  0
              }));
        }

    else {
        var nom= this.state.prenomAcheteur;


                    this.state.acheteurs.push(nom);
                    this.state.montantsRecoltes.push(this.state.montantRecolte);


          var body = JSON.stringify({
              "nom": this.state.cadeauNom,
              "prix": parseInt(this.state.cadeauPrix),
              "description": this.state.cadeauDesc,
              "acheteurs":  this.state.acheteurs ,
              "montantsRecoltes": this.state.montantsRecoltes ,
              "payement": "enattente"
            });
        putCadeau(this.state.cadeauID, body);




        }
          document.getElementById(this.state.cadeauID).click();
          getCadeaux().then(
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
  /* Définis le montant investi que le client encodre au sein du formulaire payement */
    handleInputChange(event) {


        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(state => ({
            [name]: value

          }));


    }

    /* Checked/unchecked nos options de payements et met a jour le state*/

    conditionCheck(event) {

       const target = event.target;
       const value = target.checked;
       const name = target.name;
        if ( name == 'payementMariage') {
            this.setState({
                payementEnLigne: false
              });
            }

            if ( name == 'payementEnLigne') {
                this.setState({
                    payementMariage: false
                  });
                }

       this.setState({
        [name]: value
       });

    }

/*Rendu de notre page cadeau */

  render() {
    const { error, isLoaded, items } = this.state;

        if (error) {
            return <div style={{backgroundColor:COLOR.argente, height:"100%"}}>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div style={{backgroundColor:COLOR.argente, height:"100%"}}><br></br><br></br><br></br>Chargement…</div>;
        } else {
            return (
              <div  style={{height:"100%", filter: "grayscale(50%)", backgroundColor:COLOR.gris}}>


                <div className=" description" style={{height:"35%",width:"100%",textAlign:"center",backgroundColor: COLOR.gris, fontFamily:"sans-serif"}} >


                    <span className="texteDescriptionVueCadeau" >Bienvenue ! <br></br>
                    Avant de pouvoir contribuer à un cadeau, il faut signaler votre présence au mariage. <br></br>
                    Si ce n'est pas déjà fais, <a href="/user/Formulaire">cliquer ici.</a></span>


                    </div>


                <div className="card-group"  style={{ height:"64%",marginTop:"0px", backgroundColor:COLOR.gris}} >




                <div className="listeCadeau" style={{maxHeight:"100%",backgroundColor: COLOR.argente, width:'49%'}}>
                <ul className="list-group table-wrapper-scroll-y" style={{maxHeight:"100%", overflowX:"hidden"}}>
                {items.map(item => (
                        <li id={item.id}   className=" list-group-item cadeauItem"
                        key={item.id}
                        onClick={this.handleClick.bind(this, item.nom, item.prix, item.id, item.description, item.acheteurs, item.montantsRecoltes)}
                        >
                          {item.nom}  {item.prix} €
                        </li>
        ))}
        </ul>
        </div>
        <div className="text-dark cadeauDiv" style={{textAlign:"center",backgroundColor: COLOR.argente, width:'49%'}} >
        <br></br>

        {this.state.infoCadeau}
        <br></br>
        <div style={{marginRight: 50, marginLeft: 50}}>
        {this.state.infoDescCadeau}
        </div>

       <div id="montantRecolte" style={{display:"none"}}><br></br> {this.state.totalRecolte} € déjà recolté !<br></br>
        Il reste {this.state.resteContrib} € à contribuer
       </div>

        <div className="form-group formPayement form-inline" id="formPayement" >
        <label> Veuillez choisir la façon dont vous contribuez !</label><br></br>

        <input type="text" placeholder="Nom" name="nomAcheteur" id="nomAcheteur" className="form-control" value={this.state.nomAcheteur}  onChange={this.handleInputChange} style={{marginRight:"2%"}}></input>

        <input type="text" placeholder="Prénom" name="prenomAcheteur" id="prenomAcheteur" className="form-control" value={this.state.prenomAcheteur} onChange={this.handleInputChange}></input>
        <br></br><br></br>
        <label style={{display:"inline-block"}}>Entrer un montant</label> &nbsp;
        <input type="number" min="0" max={this.state.resteContrib}  className="form-control" id="montantCadeau" name="montantRecolte" value={this.state.montantRecolte} onChange={this.handleInputChange} style={{width:"15%"}}></input> €<br></br>
        <br></br><input type="checkbox" name='payementMariage' checked={this.state.payementMariage} onChange={this.conditionCheck} ></input> <label style={{display:"inline-block"}}>Au mariage</label> &nbsp;
        <input type="checkbox" name='payementEnLigne' checked={this.state.payementEnLigne}    onChange={this.conditionCheck}></input> <label style={{display:"inline-block"}}>Maintenant (payement en ligne)</label><br></br>
        <br></br><input type="button" value="Valider" onClick={this.handleSubmit} className="submitButton" style={{paddingRight: '15%', paddingLeft:'15%'}}></input>
        </div>
        <input type="image" src={cadeau} id="imgCadeau" className="imgCadeau" ></input>


        </div>
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
