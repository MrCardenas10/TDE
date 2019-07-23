import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class UnidadMedidaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unidad: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/selectunidadmedida`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        this.setState({
          unidad: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.unidad.length > 0) {
      let id = this.props.id_unidad_medida;

      return this.state.unidad.map((e, i) => (
        <option value={id} key={i} value={e.id_unidad_medida}>
          {e.unidad_medida}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field
        component="select"
        name="id_unidad_medida"
        className="form-control"
      >
        <option value="">Unidad Medida</option>
        {this.listar()}
      </Field>
    );
  }
}

export default UnidadMedidaSelect;
