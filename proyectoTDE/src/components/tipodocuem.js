import React, { Componet } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../../config/config";

export class tipodocuem extends Componet {
  constructor(props) {
    super(props);
    this.state = {
      tipo_documento: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/tipodocumento/select`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.susccess) {
        this.setState({
          tipo_documento: datos.data
        });
      }
    });
  }

  listar() {
    if (this.state.tipo_documento.length > 0) {
      this.state.tipo_documento.map((e, i) => (
        <option key={i} value={e.id_tipo_documento}>
          {e.documento}
        </option>
      ));
    }
  }

  render() {
    return (
      <div>
        <Field
          component="select"
          name="id_tipo_documento"
          className="form-control"
        >
          <option value="">Tipo Documento</option>
          {this.listar()}
        </Field>
      </div>
    );
  }
}
