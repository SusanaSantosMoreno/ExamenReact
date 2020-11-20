import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Series from "./components/Series/Series";
import Personajes from "./components/Personajes/Personajes";
import AddPersonaje from "./components/Personajes/AddPersonaje";
import editPersonaje from "./components/Personajes/editPersonaje";

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Menu></Menu>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route
            exact
            path='/serie/:idSerie'
            render={(props) => {
              var idSerie = props.match.params.idSerie;
              return <Series idSerie={idSerie}></Series>;
            }}
          ></Route>
          <Route
            exact
            path='/personajesSerie/:idSerie'
            render={(props) => {
              var idSerie = props.match.params.idSerie;
              return <Personajes idSerie={idSerie}></Personajes>;
            }}
          ></Route>
          <Route exact path='/nuevoPersonaje' component={AddPersonaje}></Route>
          <Route
            exact
            path='/modificarPersonaje'
            component={editPersonaje}
          ></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
