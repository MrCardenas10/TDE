import React, { Component } from "react";
import SweetAlert from "sweetalert-react";
import { URL, TOKEN } from "./../../config/config";
import axios from "axios";

class listar_tarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarjeta: [],
      sweetShow: false,
      sweetTitle: "",
      sweetText: "",
      sweetType: ""
    };
  }

  llamar_listar() {
    setTimeout(() => {
      axios({
        method: "get",
        url: `${URL}/Tarjeta`,
        headers: {
          Authorization: "bearer " + localStorage.token
        }
      })
        .then(respuesta => {
          let r = respuesta.data;
          this.setState({
            tarjeta: r.data
          });
        })
        .catch(error => {
          alert("Error");
        });
    }, 500);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  editar(cod_tarjeta) {
    this.props.history.push(`/Tarjeta/modificar/${cod_tarjeta}`);
  }

  cambiar_estado(cod_tarjeta) {
    axios({
      method: "delete",
      url: `${URL}/Tarjeta/${cod_tarjeta}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          this.setState({
            sweetShow: true,
            sweetText: r.mensaje,
            sweetTitle: "Hola",
            sweetType: "success"
          });
          this.llamar_listar();
        }
      })
      .catch(error => {
        alert("Error");
      });
  }

  boton_estado(clase, texto, cod_tarjeta) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(cod_tarjeta);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.tarjeta.length > 0) {
      return this.state.tarjeta.map((e, i) => (
        <tr key={i}>
          <td>{e.cod_tarjeta}</td>
          <td>{e.saldo}</td>
          <td>{e.id_estudiante}</td>
          <td>{e.estado == 1 ? "Activo" : "Inactivo"}</td>
          <td>
            {e.estado == 1
              ? this.boton_estado("btn btn-danger", "Inactivar", e.cod_tarjeta)
              : this.boton_estado("btn btn-success", "Activar", e.cod_tarjeta)}
            <button
              onClick={() => this.editar(e.cod_tarjeta)}
              className="btn btn-primary"
            >
              Editar
            </button>
          </td>
        </tr>
      ));
    }
  }

  cargando() {
    return (
      <tr>
        <td colSpan="8" className="text-center">
          <img src="/load.gif" />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className="table-responsive">
        <h1>Tarjeta</h1>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Codigo tarjeta</th>
              <th>Saldo</th>
              <th>Estudiante</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {this.listar() == null ? this.cargando() : this.listar()}
          </tbody>
        </table>
        <SweetAlert
          show={this.state.sweetShow}
          title={this.state.sweetTitle}
          text={this.state.sweetText}
          value={this.state.sweetType}
          onConfirm={() => this.setState({ sweetShow: false })}
        />
      </div>
    );
  }
}

export default listar_tarjeta;
