import emailjs from 'emailjs-com';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"





    class Contact extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                userReceiver: "extraaaludo@gmail.com",
                userSender: "extraaaludo@gmail.com",
                emailTitle: "Mariage",
                emailDetails: "salut ça va"
            }
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
        }

        handleFormSubmit() {
            
            var service_id = "default_service";
            var template_id = "sitemariage";
            var user_id = 'user_I5n4Z5pi99TRQVlxXwhck';
            emailjs.send(service_id, template_id, this.state,user_id);
        }

        render() {
            return(

<div style={{height:"100%"}}><br></br><br></br><br></br><br></br><br></br>
<div className="container" id="formContact" style={{margin:"0 auto"}}>
  <h2 style={{textAlign:"center",fontSize:"26px"}}>Une question ? Envoyer nous votre message !</h2>
  <form action="formulaire.php" method="post">
    <div className="form-group">
      <label for="email">Votre mail </label>
      <input type="email" className="form-control w-100"  placeholder="Entrer votre adresses mail" name="mail"></input>
    </div>
    <div className="form-group">
      <label for="pwd">Votre message</label>
      <input type="text" className="form-control w-100"   placeholder="Entrer votre message" name="msg"></input>
    </div>
    <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Envoyer</button>
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