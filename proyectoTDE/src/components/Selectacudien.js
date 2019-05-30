import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL, TOKEN } from "./../config/config";

class Selectacudien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_acudiente: []
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
          tbl_acudiente: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.tbl_acudiente.length > 0) {
      return this.state.tbl_acudiente.map((e, i) => (
        <option key={i} value={e.id_acudiente}>
          {" "}
          {e.id_acudiente}{" "}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_acudiente" className="form-control">
        <option value="">Seleccionar</option>
        {this.listar()}
      </Field>
    );
  }
}

export default Selectacudien;
