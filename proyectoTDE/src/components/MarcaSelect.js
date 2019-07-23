import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class MarcaSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marcas: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/selectmarca`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      console.log(datos);
      if (datos.ok) {
        this.setState({
          marcas: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.marcas.length > 0) {
      let id = this.props.id_marca;

      return this.state.marcas.map((e, i) => (
        <option value={id} key={i} value={e.id_marca}>
          {e.marca}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_marca" className="form-control">
        <option value="">Marca</option>
        {this.listar()}
      </Field>
    );
  }
}

export default MarcaSelect;
