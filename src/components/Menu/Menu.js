import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Global from "./../../Global";

export default class Navigation extends Component {
  state = {
    series: [],
    status: false,
  };

  componentDidMount = () => {
    this.cargarSeries();
  };

  cargarSeries = () => {
    axios.get(`${Global.urlSeries}/api/Series`).then((res) => {
      this.setState({
        series: res.data,
        status: true,
      });
    });
  };

  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container'>
          <NavLink className='navbar-brand' to='/'>
            Menu
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/nuevoPersonaje'>
                  Nuevo Personaje
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/create'>
                  Modificar Personajes
                </NavLink>
              </li>
              <li className='nav-item dropdown'>
                <a
                  class='nav-link dropdown-toggle'
                  href='#'
                  id='navbarDropdown'
                  role='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Series
                </a>
                <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
                  {this.state.status == true &&
                    this.state.series.map((serie) => {
                      return (
                        <NavLink
                          className='dropdown-item'
                          to={`/serie/${serie.idSerie}`}
                        >
                          {serie.nombre}
                        </NavLink>
                      );
                    })}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
