import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import SweetAlert from "sweetalert-react";

const ModificarEntradaeSchema = Yup.object().shape({
  fecha_entrada: Yup.string()
    .min(2, "Too Short")
    .max(25, "Too Long")
    .required("Required")
});

export default class ModificarEntradae extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetShow: false,
      sweetTitle: "",
      sweetText: "",
      sweetType: "",
      entradae: null
    };
  }

  componentWillMount() {
    let id_entrada_lector = this.props.match.params.id_entrada_lector;
    axios({
      method: "get",
      url: `${URL}/entradaestudiante/${id_entrada_lector}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          entradae: r.data
        });
        console.log(r);
      })
      .catch(error => {
        alert("Error");
      });
  }

  modificar(value) {
    axios({
      method: "put",
      url: `${URL}/entradaestudiante/${
        this.props.match.params.id_entrada_lector
      }`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    })
      .then(respuesta => {
        let datos = respuesta.data;

        if (datos.ok) {
          this.setState({
            sweetShow: true,
            sweetTitle: "Genial",
            sweetText: "Se Modifico Con Exito",
            sweetType: "seccess"
          });
        } else {
          this.setState({
            sweetShow: true,
            sweetTitle: "Upss",
            sweetText: "Error Al Modificar",
            sweetType: "error"
          });
        }
        console.log(datos);
      })
      .catch(error => {
        alert("Error");
      });
  }

  formulario() {
    return (
      <Formik
        initialValues={this.state.entradae}
        validationSchema={ModificarEntradaeSchema}
        onSubmit={value => {
          this.modificar(value);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <h1>Modificar Entrada Estudiante</h1>
            <div className="row">
              <div className="col-6 form-group">
                <label>Fecha Ingreso</label>
                <Field name="fecha_entrada" className="form-control" />
                {errors.fecha_entrada && touched.fecha_entrada ? (
                  <div className="text-danger">{errors.fecha_entrada}</div>
                ) : null}
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-warning float-right">
                Modificar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <div>
        {this.state.entradae != null ? this.formulario() : ""}

        <SweetAlert
          show={this.state.sweetShow}
          title={this.state.sweetTitle}
          text={this.state.sweetText}
          value={this.state.sweetType}
          onConfirm={() => {
            this.setState({ sweetShow: false });
            this.props.history.push("/entradaestudiante");
          }}
        />
      </div>
    );
  }
}
