import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class lis_tbl_acudiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acudientes: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/acudiente/select`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      console.log(datos);
      if (datos.ok) {
        this.setState({
          acudientes: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.acudientes.length > 0) {
      return this.state.acudientes.map((e, i) => (
        <option key={i} value={e.id_acudiente}>
          {e.nombres}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_acudiente" className="form-control">
        <option value="">Acudiente</option>
        {this.listar()}
      </Field>
    );
  }
}

export default lis_tbl_acudiente;
