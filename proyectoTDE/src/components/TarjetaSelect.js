import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class TarjetaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarjeta: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/tarjeta/select`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      console.log(datos);
      if (datos.ok) {
        this.setState({
          tarjeta: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.tarjeta.length > 0) {
      return this.state.tarjeta.map((e, i) => (
        <option key={i} value={e.cod_tarjeta}>
          {e.cod_tarjeta}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="cod_tarjeta" className="form-control">
        <option value="">Marca</option>
        {this.listar()}
      </Field>
    );
  }
}

export default TarjetaSelect;
