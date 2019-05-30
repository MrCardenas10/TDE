import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class TipoProductoSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/tipoproducto`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        this.setState({
          tipo: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.tipo.length > 0) {
      let id = this.props.id_tipo_producto;

      return this.state.tipo.map((e, i) => (
        <option value={id} key={i} value={e.id_tipo_producto}>
          {e.tipo_producto}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field
        component="select"
        name="id_tipo_producto"
        className="form-control"
      >
        <option value="">Tipo Producto</option>
        {this.listar()}
      </Field>
    );
  }
}

export default TipoProductoSelect;
