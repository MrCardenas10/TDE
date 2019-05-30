import React, { Component } from "react";
import SweetAlert from "sweetalert-react";
import { URL } from "./../../config/config";

import axios from "axios";

class Acudientelis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_acudiente: [],
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
        url: `${URL}/tbl_acudiente`,
        headers: {
          Authorization: "bearer " + localStorage.token
        }
      })
        .then(respuesta => {
          let r = respuesta.data;
          this.setState({
            tbl_acudiente: r.data
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

  editar(id_acudiente) {
    this.props.history.push(`/Acudiente/modificar/${id_acudiente}`);
  }

  cambiar_estado(id_acudiente) {
    axios({
      method: "delete",
      url: `${URL}/tbl_acudiente/${id_acudiente}`,
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

  boton_estado(clase, texto, id_acudiente) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id_acudiente);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.tbl_acudiente.length > 0) {
      return this.state.tbl_acudiente.map((e, i) => (
        <tr key={i}>
          <td>{e.nombres}</td>
          <td>{e.telefono}</td>
          <td>{e.apellidos}</td>
          <td>{e.documento}</td>
          <th>{e.correo}</th>
          <td>{e.estado == 1 ? "Activo" : "Inactivo"}</td>
          <td>
            {e.estado == 1
              ? this.boton_estado("btn btn-danger", "Inactivar", e.id_acudiente)
              : this.boton_estado("btn btn-success", "Activar", e.id_acudiente)}
            <button
              onClick={() => this.editar(e.id_acudiente)}
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
      <div>
        <h1>Lista acudiente </h1>
        <br />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Telefono</th>
              <th>Correo</th>
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

export default Acudientelis;
