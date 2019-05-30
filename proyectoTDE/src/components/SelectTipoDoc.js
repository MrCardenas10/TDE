import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class SelectTipoDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo_doc: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/tipodocumento/select`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          tipo_doc: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.tipo_doc.length > 0) {
      let id = this.props.id_tipo_documento;

      return this.state.tipo_doc.map((e, i) => (
        <option value={id} key={i} value={e.id_tipo_documento}>
          {e.tipo_documento}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field
        component="select"
        name="id_tipo_documento"
        className="form-control"
      >
        <option value=""> Tipo Documento </option>
        {this.listar()}
      </Field>
    );
  }
}

export default SelectTipoDoc;
