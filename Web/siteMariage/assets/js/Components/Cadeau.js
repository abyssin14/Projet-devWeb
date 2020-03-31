import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import cadeau from "../../img/cadeau.png"


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
            payementMariage : false,
            payementEnLigne : false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.conditionCheck = this.conditionCheck.bind(this);
    }


    /* Appele de notre api pour les tables cadeaux et invités */
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

            fetch("http://localhost:8000/api/invites")
            .then(res => res.json())
            .then(
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
    handleClick(a,b) {
        this.setState(state => ({
          infoCadeau: a + " avec un prix de: " + b + " € !"
        }));

        document.getElementById('imgCadeau').style.display ="none";
        document.getElementById('formPayement').style.display ="block";
       document.getElementById('montantCadeau').max = b;
       document.getElementById('montantCadeau').value = 0;
            }


      /* Condition d'envoie Payement client cadeau*/
    handleSubmit(event) {
        var maxCadeau = document.getElementById('montantCadeau').max;
        var minCadeau = document.getElementById('montantCadeau').min;


        if( parseInt(this.state.montantRecolte) > parseInt(maxCadeau) || parseInt(this.state.montantRecolte) <= parseInt(minCadeau) ) {
            alert('Entrer une valeur entre' + minCadeau + ' et' + maxCadeau +' €');
            this.setState(state => ({
                montantRecolte:  0
              }));
        }

        
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
              <div style={{height:"100%"}}>
              
               
                <div className="card bg-light" style={{height:"35%"}} >Description à venir</div>
                <div className="card-group "  style={{ height:"65%",marginTop:"0px",  marginBottom:"0px"}} >
               
              
               

                <div className="card bg-light" style={{maxHeight:"100%"}}>
                <ul className="list-group  table-wrapper-scroll-y" style={{maxHeight:"100%"}}>
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
        <div   className="card bg-primary bg-light text-dark" style={{textAlign:"center"}}> 
        <br></br><br></br><br></br>
        {this.state.infoCadeau}
        <br></br><br></br>
        <div className="formPayement" id="formPayement" >
        <label> Veuillez choisir la façon dont vous contribuez !</label><br></br>
        <label>Sélectionner votre nom et Prénom</label><br></br>
        <select >
        <option>Votre nom</option>
        {this.state.invites.map(invite => (
                        <option>
                          {invite.nom}
                        </option>
        ))}

        </select> &nbsp;
        <select>
     <option>votre Prenom</option>
     {this.state.invites.map(invite => (
                     <option>
                       {invite.prenom}
                     </option>
     ))}

     </select>

        <br></br><br></br>
        <label>Entrer un montant</label> &nbsp;
        <input type="number" min="0" max="10" id="montantCadeau" name="montantRecolte" value={this.state.montantRecolte} onChange={this.handleInputChange} ></input> €<br></br>
        <input type="checkbox" name='payementMariage' checked={this.state.payementMariage} onChange={this.conditionCheck} ></input> <label>Au mariage</label> &nbsp;
        <input type="checkbox" name='payementEnLigne' checked={this.state.payementEnLigne}    onChange={this.conditionCheck}></input> <label>Maintenant (payement en ligne)</label><br></br>
        <input type="button" value="Valider" onClick={this.handleSubmit}></input>
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

