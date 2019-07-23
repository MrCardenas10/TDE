import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { URL } from "./../../config/config";
import * as Yup from "yup";
import SweetAlert from "sweetalert-react";
import axios from "axios";

const personaSchema = Yup.object().shape({
  id_persona: Yup.string().required(""),
  nombres: Yup.string().required(""),
  apellidos: Yup.string().required(""),
  correo: Yup.string().required(""),
  clave: Yup.string().required(""),
  genero: Yup.string().required(""),
  id_rol: Yup.string().required(""),
  id_tipo_document: Yup.string().required("")
});

class Modificar_persona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetShow: false,
      sweetTitle: "",
      sweetText: "",
      sweetType: "",
      Persona: null
    };
  }

  Persona = {
    id_persona: "",
    nombres: "",
    apellidos: "",
    correo: "",
    clave: "",
    telefono: "",
    genero: "",
    id_rol: "",
    id_tipo_document: ""
  };

  componentWillMount() {
    let id = this.props.match.params.id;
    axios({
      method: "get",
      url: `${URL}/tbl_persona/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          Persona: r.data
        });
      })
      .catch(error => {
        alert("Error");
      });
  }

  modificar(value) {
    axios({
      method: "put",
      url: `${URL}/tbl_persona/${value}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          sweetShow: true,
          sweetText: datos.mensaje,
          sweetTitle: "Hola",
          sweetType: "success"
        });
      } else {
        this.setState({
          sweetShow: true,
          sweetText: datos.error,
          sweetTitle: "Hola",
          sweetType: "error"
        });
      }
    });
  }

  formulario() {
    return (
      <Formik
        initialValues={this.state.Persona}
        validationSchema={personaSchema}
        onSubmit={value => {
          this.modificar(value);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <center>
              <div className="row">
                <div className="col-4 form-group">
                  <label>Documento</label>
                  <Field name="id_persona" className="form-control" />
                  {errors.id_persona && touched.id_persona ? (
                    <div className="text-danger">{errors.id_persona}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Nombres</label>
                  <Field name="nombres" className="form-control" />
                  {errors.nombres && touched.nombres ? (
                    <div className="text-danger">{errors.nombres}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Apellidos</label>
                  <Field name="apellidos" className="form-control" />
                  {errors.apellidos && touched.apellidos ? (
                    <div className="text-danger">{errors.apellidos}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Correo</label>
                  <Field name="correo" className="form-control" />
                  {errors.correo && touched.correo ? (
                    <div className="text-danger">{errors.correo}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Clave</label>
                  <Field name="clave" className="form-control" />
                  {errors.clave && touched.clave ? (
                    <div className="text-danger">{errors.clave}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Genero</label>
                  <Field name="genero" className="form-control" />
                  {errors.genero && touched.genero ? (
                    <div className="text-danger">{errors.genero}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Telefono</label>
                  <Field name="telefono" className="form-control" />
                  {errors.telefono && touched.telefono ? (
                    <div className="text-danger">{errors.telefono}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Rol</label>

                  {errors.id_rol && touched.id_rol ? (
                    <div className="text-danger">{errors.id_rol}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Tipo Documento</label>

                  <tipodo />
                  {errors.id_tipo_document && touched.id_tipo_document ? (
                    <div className="text-danger">{errors.id_tipo_document}</div>
                  ) : null}
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="col-12">
                  <button type="submit" className="btn btn-success float-right">
                    Crear
                  </button>
                </div>
              </div>
            </center>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <div>
        {this.state.Persona != null ? this.formulario() : ""}
        <SweetAlert
          show={this.state.sweetShow}
          title={this.state.sweetTitle}
          text={this.state.sweetText}
          value={this.state.sweetType}
          onConfirm={() => {
            this.setState({ sweetShow: false });
            this.props.history.push("/persona");
          }}
        />
      </div>
    );
  }
}

export default Modificar_persona;
