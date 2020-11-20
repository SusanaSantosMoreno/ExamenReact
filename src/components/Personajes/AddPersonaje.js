import React, { Component } from "react";
import axios from "axios";
import Global from "./../../Global";
import { Redirect } from "react-router-dom";

export default class addPersonaje extends Component {
  state = {
    series: [],
    personaje: {},
    statusSerie: false,
    statusInsert: false,
  };

  inputNombre = React.createRef();
  inputImagen = React.createRef();
  selectSerie = React.createRef();

  componentDidMount = () => {
    this.cargarSeries();
  };

  cargarSeries = () => {
    axios.get(`${Global.urlSeries}/api/Series`).then((res) => {
      this.setState({
        series: res.data,
        statusSerie: true,
      });
    });
  };

  crearPersonaje = (e) => {
    e.preventDefault();
    var personaje = {
      idPersonaje: 1,
      nombre: this.inputNombre.current.value,
      imagen: this.inputImagen.current.value,
      idSerie: parseInt(this.selectSerie.current.value),
    };
    axios.post(`${Global.urlSeries}/api/Personajes`, personaje).then((res) => {
      this.setState({
        statusInsert: true,
      });
    });
  };

  render() {
    if (this.state.statusInsert == true) {
      return <Redirect to='/'></Redirect>;
    } else {
      return (
        <div className='container mt-3'>
          <form onSubmit={this.crearPersonaje}>
            <div className='form-group'>
              <label htmlFor='inputNombre'>Nombre:</label>
              <input
                type='text'
                className='form-control'
                id='inputNombre'
                ref={this.inputNombre}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='inputImagen'>Imagen:</label>
              <input
                type='text'
                className='form-control'
                id='inputImagen'
                ref={this.inputImagen}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='selectSerie'>Serie:</label>
              <select
                className='form-control'
                id='selectSerie'
                ref={this.selectSerie}
              >
                {this.state.statusSerie == true &&
                  this.state.series.map((serie) => {
                    return (
                      <option value={serie.idSerie} key={serie.idSerie}>
                        {serie.nombre}
                      </option>
                    );
                  })}
              </select>
            </div>

            <button className='btn btn-outline-dark float-right'>
              Aceptar
            </button>
          </form>
        </div>
      );
    }
  }
}
