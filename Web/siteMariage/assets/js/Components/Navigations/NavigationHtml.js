import React,{Component} from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route as Router } from 'react-router-dom';
import  '../../../css/app.css';
import { COLOR } from "../../Utils/Color.js"



class NavigationHtml extends React.Component{
      constructor(props) {
          super(props);
          this.state = {
              collapse: false,
          };
          this.onClick = this.onClick.bind(this);

      }

      onClick() {
        this.setState({
            collapse: !this.state.collapse,
          });
        }
        render(){
          const container = {height: 1300}
      return(

        <Router>
                <header>
                <MDBNavbar style={{backgroundColor: COLOR.bleuNav}}  dark expand="md" scrolling fixed="top">
                <MDBNavbarToggler onClick={ this.onClick } />
            <MDBCollapse isOpen = { this.state.collapse } navbar>
            <MDBNavbarNav left>
            <MDBNavItem >
            <MDBNavLink to="/user/Accueil"><strong>Accueil</strong></MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink to="/user/Cadeaux">Cadeaux</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to="/user/Formulaire">Formulaire</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                <MDBNavLink to="/user/Contact">Contact</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
            <MDBNavItem>
            <MDBNavLink to="/logout">Déconnexion</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
                </MDBNavbar>
                </header>

                </Router>
      );

    }
}
export default NavigationHtml;
