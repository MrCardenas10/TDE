import React, { Component } from "react";
import SweetAlert from "sweetalert-react";
import { URL } from "./../../config/config";

import axios from "axios";

class estudiantelis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_estudiante: [],
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
        url: `${URL}/tbl_estudiante`,
        headers: {
          Authorization: "bearer " + localStorage.token
        }
      })
        .then(respuesta => {
          let r = respuesta.data;
          this.setState({
            tbl_estudiante: r.data
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

  editar(documento_estudiante) {
    this.props.history.push(`/estudiante/modificar/${documento_estudiante}`);
  }

  cambiar_estado(documento_estudiante) {
    axios({
      method: "delete",
      url: `${URL}/tbl_estudiante/${documento_estudiante}`,
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

  boton_estado(clase, texto, documento_estudiante) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(documento_estudiante);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.tbl_estudiante.length > 0) {
      return this.state.tbl_estudiante.map((e, i) => (
        <tr key={i}>
          <td>{e.id_persona}</td>
          <td>{e.id_acudiente}</td>
          <td>{e.estado == 1 ? "Activo" : "Inactivo"}</td>
          <td>
            {e.estado == 1
              ? this.boton_estado(
                  "btn btn-danger",
                  "Inactivar",
                  e.documento_estudiante
                )
              : this.boton_estado(
                  "btn btn-success",
                  "Activar",
                  e.documento_estudiante
                )}
            <button
              onClick={() => this.editar(e.documento_estudiante)}
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
        <h1>tbl_estudiante</h1>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>persona</th>
              <th>Acudiente</th>
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

export default estudiantelis;
