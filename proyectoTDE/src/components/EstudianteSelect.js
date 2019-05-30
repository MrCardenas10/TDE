import React, { Component } from "react";
import axios from "axios";
import { URL } from "./../config/config";
import { Field } from "formik";

export default class EstudianteSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/persona/selectEstudiante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          persona: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.persona.length > 0) {
      return this.state.persona.map((e, i) => (
        <option key={i} value={e.id_persona}>
          {e.nombres}
        </option>
      ));
    }
  }

  render() {
    return (
      <Field component="select" name="id_persona" className="form-control">
        <option>Persona</option>
        {this.listar()}
      </Field>
    );
  }
}
