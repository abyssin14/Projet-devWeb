// ./src/js/app.js

import React, { Component } from 'react';
import '../css/app.css';
import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import Cadeau from './Components/Cadeau';
import Formulaire from './Components/Formulaire';
import Navigation from './Components/Navigation';




class Index extends Component {
  componentDidMount() {

}

    render() {
    return (

      <switch>
       <Route path="/user" component={() => <Navigation privilege= {this.props.privilege} />}>
      </Route>

    <Route path="/user/Accueil">
    

   <body> 
  
 
<header className="w3-display-container w3-wide bgimg w3-grayscale-min" id="home">
  <div className="w3-display-middle w3-text-white w3-center">
    <h1 className="w3-jumbo">Jane et John</h1>
    <h2>Are getting married</h2>
    <h2><b>17.07.2017</b></h2>
  </div>
</header>


<div className="w3-bottom w3-hide-small">
  <div className="w3-bar w3-white w3-center w3-padding w3-opacity-min w3-hover-opacity-off">
    <a href="#home" style={{width:"25%"}} className="w3-bar-item w3-button">Home</a>
    <a href="#us" style={{width:"25%"}}  className="w3-bar-item w3-button">Jane and John</a>
    <a href="#wedding" style={{width:"25%"}}  className="w3-bar-item w3-button">Wedding</a>
    <a href="#rsvp" style={{width:"25%"}}  className="w3-bar-item w3-button w3-hover-black">RSVP</a>
  </div>
</div>


<div className="w3-container w3-padding-64 w3-pale-red w3-grayscale-min" id="us">
  <div className="w3-content">
    <h1 className="w3-center w3-text-grey"><b>Jane et John</b></h1>
    <img className="w3-round w3-grayscale-min" src="/w3images/wedding_couple2.jpg" style={{width:"100%",margin:"32px 0"}}></img>
    <p><i>You all know us. And we all know you. We are getting married lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.</i>
    </p><br></br>
    <p className="w3-center"><a href="#wedding" className="w3-button w3-black w3-round w3-padding-large w3-large">Wedding Details</a></p>
  </div>
</div>


<div className="w3-display-container bgimg2">
  <div className="w3-display-middle w3-text-white w3-center">
    <h1 className="w3-jumbo">You Are Invited</h1><br></br>
    <h2>Of course..</h2>
  </div>
</div>


<div className="w3-container w3-padding-64 w3-pale-red w3-grayscale-min w3-center" id="wedding">
  <div className="w3-content">
    <h1 className="w3-text-grey"><b>THE WEDDING</b></h1>
    <img className="w3-round-large w3-grayscale-min" src="/w3images/wedding_location.jpg" style={{width:"100%",margin:"64px 0"}}/>
    <div className="w3-row">
      <div className="w3-half">
        <h2>When</h2>
        <p>Wedding Ceremony - 2:00pm</p>
        <p>Reception et Dinner - 5:00pm</p>
      </div>
      <div className="w3-half">
        <h2>Where</h2>
        <p>Some place, an address</p>
        <p>Some where, some address</p>
      </div>
    </div>
  </div>
</div>


<div className="w3-container w3-padding-64 w3-pale-red w3-center w3-wide" id="rsvp">
  <h1>HOPE YOU CAN MAKE IT!</h1>
  <p className="w3-large">Kindly Respond By January, 2017</p>
  <p className="w3-xlarge">
    <button onclick="document.getElementById('id01').style.display='block'" className="w3-button w3-round w3-red w3-opacity w3-hover-opacity-off" style={{padding:"8px 60px"}} >RSVP</button>
  </p>
</div>

<div id="id01" className="w3-modal">
  <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{padding:"32px",maxWidth:"600px"}} >
    <div className="w3-container w3-white w3-center">
      <h1 className="w3-wide">CAN YOU COME?</h1>
      <p>We really hope you can make it.</p>
      <form>
        <input className="w3-input w3-border" type="text" placeholder="Name(s)" name="name"></input>
      </form>
      <p><i>Sincerely, John et Jane</i></p>
      <div className="w3-row">
        <div className="w3-half">
          <button onclick="document.getElementById('id01').style.display='none'" type="button" className="w3-button w3-block w3-green">Going</button>
        </div>
        <div className="w3-half">
          <button onclick="document.getElementById('id01').style.display='none'" type="button" className="w3-button w3-block w3-red">Can't come</button>
        </div>
      </div>
    </div>
  </div>
</div>


<footer className="w3-center w3-black w3-padding-16">
  <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" className="w3-hover-text-green">w3.css</a></p>
</footer>
<div className="w3-hide-small" style={{marginBottom:"32px"}} ></div>

  
</body>






  
    </Route>
    <Route path="/user/Cadeaux" component={Cadeau}></Route>
    <Route path="/user/Formulaire" component={Formulaire}></Route>
    <Route path="/logout" component={() => {
            window.location.reload();
                }}>
    </Route>
    <Route path="/admin/cadeau" component={() => {
            window.location.reload();
                }}>
    </Route>
                </switch>



    )

  }



}

  export default Index;


 