import React, {useState} from 'react';
import Header from './Components/Nav/Header';
import { BrowserRouter, Switch, Route,} from "react-router-dom";
import Home from './Components/Home'
import Compinput from './Components/Compinput';
import Login from './Components/auth/Login';
import Cursos from './Components/Crud-Curso/Cursos';
import LoginState from "./Components/auth/context/LoginState"
import RutaPrivada from "./Routes/RutaPrivada"
import Alumnos  from './Components/Crud-Alumnos/Alumnos'
const App =  () => {

  return (
    <LoginState>
      <BrowserRouter >
        <Header/>
        <Switch>
        <Route exact path="/" component={Login} />
        <RutaPrivada path="/Home"  component={Home} />
        <RutaPrivada path="/Compinput" component={Compinput}/>
        <RutaPrivada path="/Cursos" component={Cursos}/>
        <RutaPrivada path="/Alumnos" component={Alumnos}/>
        </Switch>
      </BrowserRouter>
    </LoginState>

  );
}

export default App
