import React,{Component} from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route as Router } from 'react-router-dom';
import  '../../css/app.css';


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
          const bgPink = {backgroundColor: '#8e7d66'}
          const container = {height: 1300}
      return(

        <Router>
                <header>
                <MDBNavbar style={bgPink}  dark expand="md" scrolling fixed="top">
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
                <MDBNavLink to="">Contact</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
            <MDBNavItem>
            <MDBNavLink to="/logout">Deconnexion</MDBNavLink>
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
