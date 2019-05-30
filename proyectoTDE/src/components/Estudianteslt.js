import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";

import { URL, TOKEN } from "./../config/config";

class Estudianteslt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_estudiante: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/listar_estudiante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          tbl_estudiante: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.tbl_estudiante.length > 0)
      return this.state.tbl_estudiante.map((e, i) => (
        <option key={i} value={e.documento_estudiante}>
          {" "}
          {e.id_persona}{" "}
        </option>
      ));
  }

  render() {
    return (
      <Field component="select" name="id_estudiante" className="form-control">
        <option value="">Seleccionar</option>
        {this.listar()}
      </Field>
    );
  }
}

export default Estudianteslt;
