import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class PresentacionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentacion: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/selectpresentacion`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        this.setState({
          presentacion: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.presentacion.length > 0) {
      let id = this.props.id_presentacion;

      return this.state.presentacion.map((e, i) => (
        <option value={id} key={i} value={e.id_presentacion}>
          {e.presentacion}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_presentacion" className="form-control">
        <option value="">Presentacion</option>
        {this.listar()}
      </Field>
    );
  }
}

export default PresentacionSelect;
