import React,{Component} from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route as Router } from 'react-router-dom';
import  '../../css/app.css';


class AdminNavigationHtml extends React.Component{
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
          const bgPink = {backgroundColor: 'rgb(123, 107, 86)'}
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
                <MDBNavLink to="/user/Contact">Contact</MDBNavLink>
                </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="/admin/cadeau">Administration</MDBNavLink>
                </MDBNavItem>
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
export default AdminNavigationHtml;

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>