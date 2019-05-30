import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class ProductoSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/select`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        this.setState({
          productos: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.productos.length > 0) {
      let id = this.props.id_producto;

      return this.state.productos.map((e, i) => (
        <option value={id} key={i} value={e.id_producto}>
          {e.producto}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_producto" className="form-control">
        <option value="">Producto</option>
        {this.listar()}
      </Field>
    );
  }
}

export default ProductoSelect;
