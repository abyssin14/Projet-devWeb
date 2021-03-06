import React, {Component} from 'react';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import cadeau from "../../img/cadeau.png"
import { getCadeaux, getInvites, putCadeau } from "../Utils/fetching.js"
import { COLOR } from "../Utils/Color.js"
import { contributionCadeauValide, calculTotalRecolte } from '../Utils/functions.js'
import { withAlert } from 'react-alert'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import Modal from 'react-modal';

class Cadeau extends Component {

/* Définitions des states */
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            isLoadingSubmit: false,
            opacity:'100%',
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
            showModal: false,
            showModal2: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.conditionCheck = this.conditionCheck.bind(this);
        this.retourVueParticiper = this.retourVueParticiper.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.postContribution = this.postContribution.bind(this);
        this.handleOpenModal2 = this.handleOpenModal2.bind(this);
        this.handleCloseModal2 = this.handleCloseModal2.bind(this);
    }




    /* Appele de notre api pour les tables cadeaux et invités */
    componentDidMount() {
            getCadeaux().then(
                (result) => {

                    this.setState({
                        items: result,
                        isLoading: false


                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }
    handleOpenModal2 () {
        this.handleCloseModal();
        this.setState({ showModal2: true });
    }

    handleCloseModal2 () {
        this.setState({ showModal2: false });
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
  async  handleSubmit(event) {
    if(this.state.nomAcheteur == '' || this.state.prenomAcheteur == ''){
      this.props.alert.error('Veuillez introduire votre nom et votre prénom !')
    }else{
          var maxCadeau = document.getElementById('montantCadeau').max;
          var minCadeau = document.getElementById('montantCadeau').min;
          if(!contributionCadeauValide(this.state.montantRecolte, maxCadeau, 1)) {
            this.props.alert.error('Entrer une valeur entre ' + 1 + ' et ' + maxCadeau +' €');
              this.setState(state => ({
                  montantRecolte:  0
                }));
          }
      else {
          this.handleOpenModal();
      }
    }
  }
    async postContribution(isVirement){
        this.setState({
            isLoadingSubmit: true,
            opacity: '50%'
        });
        if(isVirement){
            var nom= this.state.prenomAcheteur + ' ' + this.state.nomAcheteur + ' (Virement)';
        }else{
            var nom= this.state.prenomAcheteur + ' ' + this.state.nomAcheteur + ' (Au mariage)';
        }
        this.state.acheteurs.push(nom);
        var tabAcheteursUpdate = this.state.acheteurs;
        this.state.montantsRecoltes.push(this.state.montantRecolte);
        var tabMontantsRecoltes = this.state.montantRecolte;
        var payement = 'auMariage';

        var body = JSON.stringify({
            "nom": this.state.cadeauNom,
            "prix": parseInt(this.state.cadeauPrix),
            "description": this.state.cadeauDesc,
            "acheteurs":  this.state.acheteurs ,
            "montantsRecoltes": this.state.montantsRecoltes ,
        });
        console.log(body)
        var  request = await  putCadeau(this.state.cadeauID, body);
        if(request){
            this.props.alert.success('Merci pour votre contribution !')
            this.setState({
                isLoadingSubmit: false,
                opacity: '100%',
                montantRecolte:  0,
                acheteurs: tabAcheteursUpdate,
                montantsRecoltes: tabMontantsRecoltes,
            })
        }else{
            this.props.alert.error('Echec de la contribution !')
            this.setState({
                isLoadingSubmit: false,
                opacity: '100%',
                montantRecolte:  0
            })
        }
        document.getElementById(this.state.cadeauID).click();
        getCadeaux().then(
            (result) => {
                this.setState({
                    isLoading: false,
                    items: result,
                });
                document.getElementById(this.state.cadeauID).click();
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
                this.setState({
                    isLoading: false,
                    error
                });
            }
        )
        this.handleCloseModal();
        this.handleCloseModal2()

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

    renderLoader(){
      if (this.state.isLoading) {
         return <div className="sweet-loading" style={{marginTop:'20%'}}>
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

  renderSubmitLoader(){
    if (this.state.isLoadingSubmit) {
       return <div className="sweet-loading" style={{marginTop:'10%', position:'absolute', right:'24%', zIndex : 5}}>
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

retourVueParticiper(){
  document.getElementById("retourVueFormulaire").click();
}

/*Rendu de notre page cadeau */

  render() {
      const customStyles = {
          content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
          }
      };
      Modal.setAppElement('#root')

      const alert = this.props.alert;
    const { error, isLoading, items } = this.state;

        if (error) {
            return <div style={{backgroundColor:COLOR.argente, height:"100%"}}>Erreur : {error.message}</div>;

        } else {
            return (

              <div style={{height:"100%", filter: "grayscale(50%)", backgroundColor:COLOR.gris}}>

                  <Modal
                      isOpen={this.state.showModal}
                      style={customStyles}
                  >
                      <span className="boutonDelete" style={{position: 'absolute', top:'10px', right: '10px'}} onClick={this.handleCloseModal}>❌</span>
                      <h4>Indiquez votre moyen de payement</h4>
                      <br></br><input type="button" className=" w-100 submitButton" value="Je fais le virement maintenant" onClick={this.handleOpenModal2} style={{marginBottom: '10px'}}></input>
                      <br></br><input type="button" className=" w-100 submitButton" value="Je mettrai l'argent dans l'urne lors du mariage" onClick={this.postContribution.bind(this,false)}></input>

                  </Modal>
                  <Modal
                      isOpen={this.state.showModal2}
                      style={customStyles}
                  >
                      <span className="boutonDelete" style={{position: 'absolute', top:'10px', right: '10px'}} onClick={this.handleCloseModal2}>❌</span>
                      <h4>Voici mon numéro de compte : </h4>
                      <p style={{fontFamily: 'arial'}}>BE63 3101 7811 3308</p>
                      <br></br><input type="button" className=" w-100 submitButton" value="J'ai fait le virement" onClick={this.postContribution.bind(this,true)}></input>
                  </Modal>

                <div className=" description" style={{height:"35%",width:"100%",textAlign:"center",backgroundColor: COLOR.gris, fontFamily:"sans-serif", paddingLeft:'15%', paddingRight:'15%'}} >


                    <span className="texteDescriptionVueCadeau" >Bienvenue ! <br></br>
                    Sur cette page figure la liste des cadeaux que nous aimerions acheter avec l'argent récolté lors de notre mariage.<br></br>
                    Si vous souhaitez contribuer à l'achat d'un des cadeaux de la liste, merci de remplir le formulaire de contribution. Une urne sera disponible le jour-J pour récolter vos dons.
                    N'oubliez pas de confirmer votre présence au mariage. Si ce n'est pas déjà fait, <a onClick={this.retourVueParticiper} style={{color:COLOR.bleu, fontWeight:'bold',cursor:"pointer"}}>cliquez ici.</a></span>


                    </div>


                <div className="card-group"  style={{ height:"64%",marginTop:"0px", backgroundColor:COLOR.gris}} >



                <div className="listeCadeau" style={{maxHeight:"100%",backgroundColor: COLOR.argente, width:'49%'}}>
                {this.renderLoader()}

                <ul className="list-group table-wrapper-scroll-y" style={{maxHeight:"100%", overflowX:"hidden"}}>
                {items.map(item => {
                  var totalRecolte = calculTotalRecolte(item.montantsRecoltes)
                  var resteContrib = item.prix - totalRecolte
                  if(resteContrib > 0){
                    return (
                      <li id={item.id}   className=" list-group-item cadeauItem"
                      key={item.id}
                      onClick={this.handleClick.bind(this, item.nom, item.prix, item.id, item.description, item.acheteurs, item.montantsRecoltes)}
                      >
                        {item.nom}  {item.prix} €
                      </li>
                    )
                  }else{
                    return (
                      <li id={item.id}   className=" list-group-item cadeauItem"
                      key={item.id}
                      onClick={this.handleClick.bind(this, item.nom, item.prix, item.id, item.description, item.acheteurs, item.montantsRecoltes)}

                      style={{backgroundColor: 'green', opacity:'20%'}}
                      >
                        {item.nom}  {item.prix} €
                      </li>
                    )
                  }
                }
              )
            }
        </ul>
        </div>
        <div className="text-dark cadeauDiv" style={{textAlign:"center",backgroundColor: COLOR.argente, width:'49%'}} >
        {this.renderSubmitLoader()}
        <div style={{ opacity: this.state.opacity}}>
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
        <br></br><input type="button" value="Valider" onClick={this.handleSubmit} className="submitButton" style={{paddingRight: '15%', paddingLeft:'15%'}}></input>
        </div>
        <input type="image" src={cadeau} id="imgCadeau" className="imgCadeau" ></input>
        </div>

        <Link to="/user/Formulaire" className="btn btn-primary" id="retourVueFormulaire" style={{display:"none"}}></Link>

        </div>
        </div>
        </div>


        );
        }
    }


}



export default withAlert()(Cadeau);

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
