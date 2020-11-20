import React, { Component } from "react";
import Global from "../../Global";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class editPersonaje extends Component {
  state = {
    series: [],
    personajes: [],
    serie: {},
    personaje: {},
    statusSeries: false,
    statusPersonajes: false,
    statusUpdate: false,
    statusPersonaje: false,
    statusSerie: false,
  };

  selectSerie = React.createRef();
  selectPersonaje = React.createRef();

  componentDidMount = () => {
    this.cargarSeries();
    this.cargarPersonajes();
  };

  cargarSeries = () => {
    axios.get(`${Global.urlSeries}/api/Series`).then((res) => {
      this.setState({
        series: res.data,
        statusSeries: true,
      });
    });
  };

  cargarPersonajes = () => {
    axios.get(`${Global.urlSeries}/api/Personajes`).then((res) => {
      this.setState({
        personajes: res.data,
        statusPersonajes: true,
      });
    });
  };

  updatePersonaje = (e) => {
    e.preventDefault();
    axios
      .put(
        `${Global.urlSeries}/api/Personajes/${this.selectPersonaje.current.value}/${this.selectSerie.current.value}`
      )
      .then((res) => {
        this.setState({
          statusUpdate: true,
        });
      });
  };

  cargarPersonaje = () => {
    axios
      .get(
        `${Global.urlSeries}/api/Personajes/${this.selectPersonaje.current.value}`
      )
      .then((res) => {
        this.setState({
          personaje: res.data,
          statusPersonaje: true,
        });
      });
  };

  cargarSerie = () => {
    axios
      .get(`${Global.urlSeries}/api/Series/${this.selectSerie.current.value}`)
      .then((res) => {
        this.setState({
          serie: res.data,
          statusSerie: true,
        });
      });
  };

  render() {
    if (this.state.statusUpdate == true) {
      return <Redirect to='/'></Redirect>;
    } else {
      return (
        <div className='container mt-3'>
          <form onSubmit={this.updatePersonaje} className='card p-3'>
            <div className='form-group'>
              <label htmlFor='selectSerie'>Selecciona una serie:</label>
              <select
                className='form-control'
                id='selectSerie'
                ref={this.selectSerie}
                onChange={this.cargarSerie}
              >
                {this.state.statusSeries == true &&
                  this.state.series.map((ser) => {
                    return (
                      <option value={ser.idSerie} key={ser.idSerie}>
                        {ser.nombre}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='selectSerie'>Selecciona un personaje:</label>
              <select
                className='form-control'
                id='selectPersonaje'
                ref={this.selectPersonaje}
                onChange={this.cargarPersonaje}
              >
                {this.state.statusPersonajes == true &&
                  this.state.personajes.map((per) => {
                    return (
                      <option value={per.idPersonaje} key={per.idPersonaje}>
                        {per.nombre}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button className='btn btn-outline-dark'>Guardar Cambios</button>
          </form>

          <div className='row mt-4'>
            {this.state.statusSerie == true && (
              <div className='card col-6' key={this.state.serie.idSerie}>
                <img
                  src={this.state.serie.imagen}
                  className='card-img-top'
                  alt={this.state.serie.nombre}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{this.state.serie.nombre}</h5>
                </div>
              </div>
            )}
            {this.state.statusPersonaje == true && (
              <div
                className='card col-6'
                key={this.state.personaje.idPersonaje}
              >
                <img
                  src={this.state.personaje.imagen}
                  className='card-img-top'
                  alt={this.state.personaje.nombre}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{this.state.personaje.nombre}</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}
