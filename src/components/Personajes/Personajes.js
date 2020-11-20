import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Global from "./../../Global";

export default class Personajes extends Component {
  state = {
    personajes: [],
    status: false,
  };

  componentDidMount = () => {
    this.getPersonaje();
  };

  getPersonaje = () => {
    axios
      .get(
        `${Global.urlSeries}/api/Series/PersonajesSerie/${this.props.idSerie}`
      )
      .then((res) => {
        this.setState({
          personajes: res.data,
          status: true,
        });
      });
  };

  render() {
    return (
      <div className='container mt-3'>
        <NavLink to={`/serie/${this.props.idSerie}`}>Volver</NavLink>
        <div className='row'>
          {this.state.status == true &&
            this.state.personajes.map((personaje) => {
              return (
                <div class='card mt-3 col-4' key={personaje.idPersonaje}>
                  <img
                    src={personaje.imagen}
                    class='card-img-top'
                    alt={personaje.nombre}
                  />
                  <div class='card-body'>
                    <h5 class='card-title'>{personaje.nombre}</h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
