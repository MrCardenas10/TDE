import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";

import { URL, TOKEN } from "./../config/config";

class Persona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_persona: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/lis_persona`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          tbl_persona: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.tbl_persona.length > 0) {
      return this.state.tbl_persona.map((e, i) => (
        <option key={i} value={e.id_persona}>
          {" "}
          {e.id_persona}{" "}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_persona" className="form-control">
        <option value="">Seleccionar</option>
        {this.listar()}
      </Field>
    );
  }
}

export default Persona;
