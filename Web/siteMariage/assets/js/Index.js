// ./src/js/app.js

import React, { Component } from 'react';
import app from "../css/app.css"

import { BrowserRouter, Route, Switch, Link, HashRouter, NavLink } from 'react-router-dom';
import Cadeau from './Components/Cadeau';
import Formulaire from './Components/Formulaire';
import Navigation from './Components/Navigation';
import Administration from './Components/Administration';
import Contact from './Components/Contact';
import couple from '../img/photo_couple.png'
import location from '../img/locationMariage.jpg'
import {COLOR} from './Utils/Color.js'



class Index extends Component {


  redirection() {
    document.getElementById("retourVueFormulaire").click();
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
    <img className="w3-round w3-grayscale-min" src={couple} style={{width:"100%",margin:"32px 0;"}}/>

    <p><i>Il était une fois, l’histoire d’une jeune demoiselle de presque 25 ans, Stéphanie, et d’un jeune homme de 25 ans, Nicolas. <br></br>
        La première vivait à la campagne et le deuxième en ville. Tous les deux désespéraient de trouver l’amour.<br></br>
        Grâce à la magie du net, ils furent mis en contact. Très vite, ils commencèrent à discuter de façon régulière, sauf le vendredi soir… Et oui, c’était soirée pétanque pour Nicolas!<br></br>
        Après plusieurs soirées à discuter par messages, ils décidèrent de se donner rendez-vous afin de mieux faire connaissance.<br></br>
        Le jeudi 31 mai fut la date choisie. Ils se donnèrent rendez-vous dans un bar au cimetière d’Ixelles vers 19h.<br></br>
        Stéphanie se souvient encore avoir presque annulé car elle était fatiguée de se faire briser le coeur. Elle se souvient aussi que ce fut sa soeur Eléonore qui la poussa à se lever de son lit, à se faire jolie et à aller au rendez-vous.<br></br>
        Nicolas se souvient, lui, d’ avoir été très stressé et nerveux car il avait peur de ne pas lui plaire. Lui qui voulait tant trouver son âme-soeur. Cette personne qui partagerait sa vie, ses envies et ses projets.<br></br>
        Le moment fatidique du face-à-face arriva et tout de suite ils tombèrent sous le charme l’un de l’autre. Stéphanie se souvient avoir pensé qu’il avait des yeux bleus magnifique, tandis que Nicolas se souvient avoir tout de suite remarqué son beau sourire. Tout les deux très stressés, ils s’installèrent en terrasse et commencèrent à discuter de tout et de rien. Après un laps de temps qui leur avait semblé court, ils se rendirent compte que plus de 4h avaient passé depuis le début du rendez-vous et que leur stress avait disparu pour laisser place à un sentiment de bien-être et d’excitation. Nicolas, gentleman dans l’âme, proposa de raccompagner Stéphanie à sa voiture.<br></br>
        A peine rentrer chez eux, ils se proposèrent un deuxième rendez-vous, et se mirent d’accord pour un cinéma la semaine d’après.<br></br>
        La semaine fut longue et pleine d’attente, autant pour Stéphanie que pour Nicolas. Mais l’heure du deuxième rendez-vous sonna bien assez vite. Ni Stéphanie, ni Nicolas ne se souviennent du film car ils se demandèrent tous les deux ce qui allait se passer après. Va-t-elle m’embrasser pensait Nicolas. Va-t-il m’embrasser pensait Stéphanie.<br></br>
        Et surprise, ils échangèrent leur premier baiser. Ce qui marqua le début de leur histoire d’amour. </i>
    </p>
  </div>
</div>


<div className="w3-display-container bgimg2">
  <div className="w3-display-middle w3-text-white w3-center" >
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
          <p>Cérémonie : 15h-16h</p>
          <p>Vin d’honneur : 16h30-18h30</p>
          <p>Repas de mariage : 19h-22h</p>
          <p>Soirée dansante : 22h-03h00</p>

      </div>
      <div className="w3-half">
        <h2>Où</h2>
        <p>La Ferme de Beaurieux,</p>
        <p>Rue Saussale 2, 1490 Court-Saint-Etienne</p>
      </div>
    </div>
  </div>
</div>


<div className="w3-container w3-padding-64  w3-center w3-wide" id="rsvp" style={{backgroundColor: COLOR.argente}}>
  <h1>EN ESPERANT QUE VOUS SEREZ PRESENTS</h1>
  <p className="w3-large">Veuillez répondre d'ici le 15 janvier 2021</p>
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
    <Link to="/user/Formulaire" className="btn btn-primary" id="retourVueFormulaire" style={{display:"none"}}></Link>

                </switch>



    )

  }



}

  export default Index;
console.log = console.warn = console.error = () => {};

  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous"
  />
