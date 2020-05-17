// ./src/js/app.js

import React, { Component } from 'react';
import app from "../css/app.css"

import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import Cadeau from './Components/Cadeau';
import Formulaire from './Components/Formulaire';
import Navigation from './Components/Navigation';
import Administration from './Components/Administration';
import Contact from './Components/Contact';
import couple from '../img/imgCouple.jpg'
import location from '../img/locationMariage.jpg'
import {COLOR} from './Utils/Color.js'



class Index extends Component {

  redirection() {
    document.location.href = "/user/Formulaire";
  }

  componentDidMount() {

}

    render() {
    return (

      <switch>
       <Route path="/" component={() => <Navigation privilege= {this.props.privilege} />}>
      </Route>

    <Route path="/user/Accueil">


   <body>


<header className="w3-display-container w3-wide bgimg w3-grayscale-min" id="home" style={{backgroundColor: COLOR.argente}}>
  <div className="w3-display-middle w3-text-black w3-center">
    <h1 className="w3-jumbo">Stéphanie et Nicolas</h1>
    <h2>Vont se marier</h2>
    <h2><b>06.03.2021</b></h2>
  </div>
</header>





<div className="w3-container w3-padding-64 "id="us" style={{backgroundColor: COLOR.argente}}>
  <div className="w3-content">
    <img className="w3-round w3-grayscale-min" src={couple} style={{width:"100%",margin:"32px 0"}}/>
    <p><i>On va se marier ... blablabla lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.</i>
    </p>
  </div>
</div>


<div className="w3-display-container bgimg2">
  <div className="w3-display-middle w3-text-white w3-center">
    <h1 className="w3-jumbo">Tu es invité</h1><br></br>
    <h2>Bien évidemment !</h2>
  </div>
</div>


<div className="w3-container w3-padding-64 w3-center" id="wedding" style={{backgroundColor: COLOR.argente}}>
  <div className="w3-content">
    <h1 className="w3-text-grey"><b>LE MARIAGE</b></h1>
    <img className="w3-round-large w3-grayscale-min" src={location} style={{width:"100%",margin:"64px 0"}}/>
    <div className="w3-row">
      <div className="w3-half">
        <h2>Quand</h2>
        <p>Cérémonie - 14h00</p>
        <p>Reception et Dinner - 17h00</p>
      </div>
      <div className="w3-half">
        <h2>Où</h2>
        <p>Adresse</p>
        <p>Adresse</p>
      </div>
    </div>
  </div>
</div>


<div className="w3-container w3-padding-64  w3-center w3-wide" id="rsvp" style={{backgroundColor: COLOR.argente}}>
  <h1>EN ESPERANT QUE VOUS SEREZ PRESENTS</h1>
  <p className="w3-large">Veuillez répondre d'ici janvier 2021</p>
  <p className="w3-xlarge" >
    <button onClick={this.redirection} className="w3-button w3-round" id="confimButton" style={{padding:"8px 60px", backgroundColor: COLOR.bleuNav, color: COLOR.blanc}} >Je confirme ma présence</button>
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
      <p><i>Sincerely, Stéphanie et Nicolas</i></p>
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



<div className="w3-hide-small" style={{marginBottom:"32px"}} ></div>


</body>







    </Route>
    <Route path="/user/Cadeaux" component={Cadeau}></Route>
    <Route path="/user/Contact" component={Contact}></Route>
    <Route path="/user/Formulaire" component={() => <Formulaire privilege= {this.props.privilege} />}></Route>
    <Route path="/logout" component={() => {
            window.location.reload();
                }}>
    </Route>
    <Route path="/admin/cadeau" component={() => {
            window.location.reload();
                }}>
    </Route>
    <Route path="/admin" component={Administration}></Route>
                </switch>



    )

  }



}

  export default Index;

  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous"
  />
