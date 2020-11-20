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
                <div
                  className='card col-md-3 mt-3 mr-2 px-md-5'
                  key={personaje.idPersonaje}
                >
                  <img
                    src={personaje.imagen}
                    className='card-img-top pt-3'
                    alt={personaje.nombre}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{personaje.nombre}</h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
