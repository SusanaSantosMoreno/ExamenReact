import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Global from "./../../Global";

export default class Series extends Component {
  state = {
    serie: {},
    status: false,
  };

  componentDidMount = () => {
    this.getSerie();
  };

  componentDidUpdate = () => {
    this.getSerie();
  };

  getSerie = () => {
    axios
      .get(`${Global.urlSeries}/api/Series/${this.props.idSerie}`)
      .then((res) => {
        this.setState({
          serie: res.data,
          status: true,
        });
      });
  };

  render() {
    return (
      <div className='container mt-3'>
        {this.state.status == true && (
          <div class='card w-50 mx-auto'>
            <img
              src={this.state.serie.imagen}
              class='card-img-top'
              alt={this.state.serie.nombre}
            />
            <div class='card-body'>
              <h5 class='card-title'>{this.state.serie.nombre}</h5>
              <p class='card-text'>
                Año: {this.state.serie.anyo}- puntuación:{" "}
                {this.state.serie.puntuacion}
              </p>
              <NavLink
                className='btn btn-outline-dark w-100'
                to={`/personajesSerie/${this.state.serie.idSerie}`}
              >
                Personajes
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}
