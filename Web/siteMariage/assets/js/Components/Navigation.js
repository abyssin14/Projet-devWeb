import React,{Component} from 'react';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import { BrowserRouter, Route as Router } from 'react-router-dom';
import  '../../css/app.css';
import NavigationHtml from "../Utils/NavigationHtml.js"
import AdminNavigationHtml from "../Utils/AdminNavigationHtml.js"
import ReactDOM from 'react-dom';






class Navigation extends React.Component {
  constructor(props) {
      super(props);
  }


  displayNavBar(){
    if(this.props.privilege == 'admin'){
      return <AdminNavigationHtml />
    }else{
      return <NavigationHtml />

    }
  }

  render() {



    return(
      <div>
      {this.displayNavBar()}
      </div>



    );

  }
}

export default Navigation;


<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  crossorigin="anonymous"
/>