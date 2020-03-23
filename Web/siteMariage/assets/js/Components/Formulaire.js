import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import FormInvites from '../Containers/FormInvites';

class Formulaire extends Component {


  render(){
    return(
  <div>
  <br></br><br></br><br></br>
  <FormInvites />
  </div>
    )
  }
}
export default Formulaire;
