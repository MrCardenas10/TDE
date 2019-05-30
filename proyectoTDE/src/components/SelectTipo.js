import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class SelectTipo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo_pago: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/tipo/select`
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          tipo_pago: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.tipo_pago.length > 0) {
      let tipo_pago = this.props.tipo_pago;

      return this.state.tipo_pago.map((e, i) => (
        <option value={tipo_pago} key={i}>
          {e.tipo_pago}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_tipo_pago" className="form-control">
        <option value=""> Tipo Pago </option>
        {this.listar()}
      </Field>
    );
  }
}

export default SelectTipo;
