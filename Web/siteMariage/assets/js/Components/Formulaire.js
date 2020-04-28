import React,{Component} from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route as Router } from 'react-router-dom';
import  '../../css/app.css';
import FormulaireFull from "./Formulaires/FormulaireFull.js"
import FormulaireSansRepas from "./Formulaires/FormulaireSansRepas.js"
import ReactDOM from 'react-dom';


class Formulaire extends React.Component {
  constructor(props) {
      super(props);
  }


  displayFormulaire(){
    if(this.props.privilege == 'compte1r'){
      return <FormulaireFull />
    }else{
      return <FormulaireSansRepas />

    }
  }

  render() {



    return(
      <div style={{height:"100%"}}>
      {this.displayFormulaire()}
      </div>



    );

  }
}

export default Formulaire;


<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>
