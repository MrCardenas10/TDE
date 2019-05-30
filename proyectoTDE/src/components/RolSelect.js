import React, { Component } from "react";
import axios from "axios";
import { Field } from "formik";
import { URL } from "./../config/config";

class RolSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/rol/select`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      console.log(datos);
      if (datos.ok) {
        this.setState({
          roles: datos.data
        });
      } else {
        console.log("no se encontró");
      }
    });
  }

  listar() {
    if (this.state.roles.length > 0) {
      return this.state.roles.map((e, i) => (
        <option key={i} value={e.id_rol}>
          {e.rol}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="rol" className="form-control">
        <option value="">Rol</option>
        {this.listar()}
      </Field>
    );
  }
}

export default RolSelect;
