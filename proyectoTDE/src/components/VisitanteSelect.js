import React, { Component } from "react";
import axios from "axios";
import { URL } from "./../config/config";
import { Field } from "formik";

export default class VisitanteSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitantes: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/visitantes/select`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          visitantes: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.visitantes.length > 0) {
      return this.state.visitantes.map((e, i) => (
        <option key={i} value={e.id_visitante}>
          {e.nombre_visitante}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_visitante" className="form-control">
        <option>Visitante</option>
        {this.listar()}
      </Field>
    );
  }
}
