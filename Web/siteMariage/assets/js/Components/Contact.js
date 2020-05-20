import emailjs from 'emailjs-com';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"
import {COLOR} from "../Utils/Color.js"






    class Contact extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                userReceiver: "extraaaludo@gmail.com",
                userSender: new String(),
                emailTitle: "Mariage",
                emailDetails: new String()
            }
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
        }

        handleFormSubmit() {
          var val = confirm("Etes-vous sûr de vouloir envoyer ce message ?");
        if( val == true ) {

          var service_id = "default_service";
          var template_id = "sitemariage";
          var user_id = 'user_I5n4Z5pi99TRQVlxXwhck';
          emailjs.send(service_id, template_id, this.state,user_id);

          this.setState({
            userSender: "",
            emailDetails: ""
          });

          alert('Message envoyé ! ')

        } else {

        }

        }

        handleInputChange(event) {


            const target = event.target;
            const value = target.value;
            const name = target.name;

            this.setState(state => ({
                [name]:  value
              }));


        }

        render() {
            return(

<div className="w3-grayscale-min fondFormulaire" style={{width:"100%",height:"90%", position:"absolute", top:"10%"}}>
<div className="container" id="formContact" style={{margin:"0 auto", fontFamily:"serif"}}>
  <h2 style={{textAlign:"center",fontSize:"26px"}}>Une question ? Envoyez nous votre message !</h2>
  <form style={{height:"80%"}}>
    <div className="form-group">
      <label for="email">Votre mail </label>
      <input type="email" className="form-control w-25" value={this.state.userSender} onChange={this.handleInputChange} placeholder="Entrer votre adresse mail" name="userSender"></input>
    </div>
    <div className="form-group h-50">
      <label for="pwd">Votre message (Maximum 400 caractères)</label>
      <textarea maxlength="400" className="form-control rounded-15"  value={this.state.emailDetails} onChange={this.handleInputChange} placeholder="Entrer votre message" name="emailDetails" placeholder="Entrer votre message"  rows="3" style={{height: "90%", marginBottom:"1.5rem", resize:"none"}}></textarea>
    </div>
    <div className="form-group">
    <span  className="btn btn-warning submitButton" style={{backgroundColor: COLOR.bleu, borderColor: COLOR.bleu, color: COLOR.blanc}} onClick={this.handleFormSubmit}>Envoyer &#x1F48C;</span>
    <span  style={{float:"right"}}>&#x1F470; &#x1F935; Nous vous répondrons également par mail dans les plus brefs délais  	&#x1F497;	</span>
    </div>
  </form>
</div>
      </div>


            );
        }


    }



    export default Contact;

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
