import React, { Component } from "react";
import SweetAlert from "sweetalert-react";
import { URL } from "./../../config/config";

import axios from "axios";

class personalis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_persona: [],
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
        url: `${URL}/tbl_persona`,
        headers: {
          Authorization: "bearer " + localStorage.token
        }
      })
        .then(respuesta => {
          let r = respuesta.data;
          this.setState({
            tbl_persona: r.data
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

  editar(id_persona) {
    this.props.history.push(`/persona/modificar/${id_persona}`);
  }

  cambiar_estado(id_persona) {
    axios({
      method: "delete",
      url: `${URL}/tbl_persona/${id_persona}`,
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
            sweetTitle: "",
            sweetType: "success"
          });
          this.llamar_listar();
        }
      })
      .catch(error => {
        alert("Error");
      });
  }

  boton_estado(clase, texto, id_persona) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id_persona);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.tbl_persona.length > 0) {
      return this.state.tbl_persona.map((e, i) => (
        <tr key={i}>
          <td>{e.email}</td>
          <td>{e.nombres}</td>
          <td>{e.apellidos}</td>
          <td>{e.telefono}</td>
          <td>{e.genero}</td>
          <td>{e.rol}</td>
          <td>{e.estado == 1 ? "Activo" : "Inactivo"}</td>
          <td>
            {e.estado == 1
              ? this.boton_estado("btn btn-danger", "Inactivar", e.id_persona)
              : this.boton_estado("btn btn-success", "Activar", e.id_persona)}
            <button
              onClick={() => this.editar(e.id_persona)}
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
        <h1>tbl_persona</h1>
        <br />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>email</th>
              <th>nombres</th>
              <th>apellidos</th>
              <th>telefono</th>
              <th>genero</th>
              <th>rol</th>
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

export default personalis;
