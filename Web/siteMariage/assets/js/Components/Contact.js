import emailjs from 'emailjs-com';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import app from "../../css/app.css"





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
            
            var service_id = "default_service";
            var template_id = "sitemariage";
            var user_id = 'user_I5n4Z5pi99TRQVlxXwhck';
            emailjs.send(service_id, template_id, this.state,user_id);
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

<div className="w3-grayscale-min fondFormulaire" style={{width:"100%",height:"90%", backgroundColor:"rgb(255, 221, 221)", position:"absolute", top:"10%"}}>
<div className="container" id="formContact" style={{margin:"0 auto"}}>
  <h2 style={{textAlign:"center",fontSize:"26px"}}>Une question ? Envoyer nous votre message !</h2>
  <form>
    <div className="form-group">
      <label for="email">Votre mail </label>
      <input type="email" className="form-control w-25" value={this.state.userSender} onChange={this.handleInputChange} placeholder="Entrer votre adresse mail" name="userSender"></input>
    </div>
    <div className="form-group">
      <label for="pwd">Votre message</label>
      <input type="text-area" className="form-control w-75" style={{height: "15%"}} value={this.state.emailDetails} onChange={this.handleInputChange} placeholder="Entrer votre message" name="emailDetails"></input>
    </div>
    <span  className="btn btn-primary" onClick={this.handleFormSubmit}>Envoyer</span>
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