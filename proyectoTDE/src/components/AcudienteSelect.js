import React, { Component } from "react";
import axios from "axios";
import { URL } from "./../config/config";
import { Field } from "formik";

export default class AcudienteSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acudiente: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/acudiente/select`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          acudiente: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.acudiente.length > 0) {
      return this.state.acudiente.map((e, i) => (
        <option key={i} value={e.id_acudiente}>
          {e.nombres}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_acudiente" className="form-control">
        <option>Acudiente</option>
        {this.listar()}
      </Field>
    );
  }
}
