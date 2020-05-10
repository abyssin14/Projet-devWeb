import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import cadeau from "../../img/cadeau.png"
import { number } from 'prop-types';
import fleur from "../../img/FondFleurs.png"
import fleurs from "../../img/Fleurs.png"
import { getCadeaux, getInvites, putCadeau } from "../Utils/fetching.js"


class Cadeau extends Component {

/* Définitions des states */
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            infoCadeau: "Cliquer sur un cadeau pour obtenir plus d'informations",
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
            resteContrib: Number()

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



console.log(this.state.invites)

    }


    /* Affichage lors d'un clique sur un cadeau*/
    handleClick(cadeauNom, cadeauPrix, cadeauID, cadeauDesc, acheteurs ,montantsRecoltes) {
        this.setState(state => ({
          infoCadeau: cadeauNom + " avec un prix de: " + cadeauPrix + " € !"
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

     var totalRecoltee = 0;
for ( var i = 0; i < montantsRecoltes.length; i++) {
        totalRecoltee += parseInt(montantsRecoltes[i]);
}


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


        if( parseInt(this.state.montantRecolte) > parseInt(maxCadeau) || parseInt(this.state.montantRecolte) < 1 ) {
            alert('Entrer une valeur entre' + 1 + ' et' + maxCadeau +' €');
            this.setState(state => ({
                montantRecolte:  0
              }));
        }

    else {
        var nom= document.getElementById("nom").value;


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
            montantRecolte:  value
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
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div><br></br><br></br><br></br>Chargement…</div>;
        } else {
            return (
              <div  style={{height:"100%", filter: "grayscale(50%)"}}>


                <div className="card description" style={{height:"35%",width:"100%",textAlign:"center",backgroundColor: "rgba(255, 255, 204, 0.62)", fontFamily:"sans-serif"}} >


                    <span className="texteDescriptionVueCadeau" >Bienvenue ! <br></br>
                    Avant de pouvoir contribuer à un cadeau, il faut signaler votre présence au mariage. <br></br>
                    Si ce n'est pas déjà fais, <a href="/user/Formulaire">cliquer ici.</a></span>


                    </div>


                <div className="card-group "  style={{ height:"65%",marginTop:"0px",  marginBottom:"0px"}} >




                <div className="card text-dark listeCadeau" style={{maxHeight:"100%",backgroundColor: "#ffdddd"}}>
                <ul className="list-group  table-wrapper-scroll-y text-dark" style={{maxHeight:"100%"}}>
                {items.map(item => (
                        <li id={item.id} style={{backgroundColor:"#f1dfc4"}}  className="list-group-item list-group-item text-dark salut"
                        key={item.id}
                        onClick={this.handleClick.bind(this, item.nom, item.prix, item.id, item.description, item.acheteurs, item.montantsRecoltes)}
                        >
                          {item.nom}  {item.prix} €
                        </li>
        ))}
        </ul>
        </div>
        <div className="card  text-dark cadeauDiv" style={{textAlign:"center",backgroundColor: "rgba(255, 204, 204, 0.8)"}} >
        <br></br>

        {this.state.infoCadeau}
       <div id="montantRecolte" style={{display:"none"}}><br></br> {this.state.totalRecolte} € déjà recolté !<br></br>
        Il reste {this.state.resteContrib} € à contribuer
       </div>

        <div className="form-group formPayement form-inline" id="formPayement" >
        <label> Veuillez choisir la façon dont vous contribuez !</label><br></br>

        <select id="nom" className="custom-select">
        <option disabled selected>Votre nom</option>
        {
          this.state.invites.map(invite => (
                        <option>
                          {invite.nom}
                        </option>
        ))}

        </select> &nbsp;
        <select className="custom-select">
     <option disabled selected>votre Prenom</option>
     {this.state.invites.map(invite => (
                     <option>
                       {invite.prenom}
                     </option>
     ))}

     </select>

        <br></br><br></br>
        <label style={{display:"inline-block"}}>Entrer un montant</label> &nbsp;
        <input type="number" min="0" max={this.state.resteContrib}  className="form-control" id="montantCadeau" name="montantRecolte" value={this.state.montantRecolte} onChange={this.handleInputChange} style={{width:"15%"}}></input> €<br></br>
        <br></br><input type="checkbox" name='payementMariage' checked={this.state.payementMariage} onChange={this.conditionCheck} ></input> <label style={{display:"inline-block"}}>Au mariage</label> &nbsp;
        <input type="checkbox" name='payementEnLigne' checked={this.state.payementEnLigne}    onChange={this.conditionCheck}></input> <label style={{display:"inline-block"}}>Maintenant (payement en ligne)</label><br></br>
        <br></br><input type="button" value="Valider" onClick={this.handleSubmit} className="btn btn-primary mb-2"></input>
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
