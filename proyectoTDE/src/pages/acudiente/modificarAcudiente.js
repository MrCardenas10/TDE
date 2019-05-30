import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { URL } from "./../../config/config";

import * as Yup from "yup";
import SweetAlert from "sweetalert-react";
import axios from "axios";
import swal from "sweetalert";

const acudienteSchema = Yup.object().shape({
  nombres: Yup.string().required("Required"),
  telefono: Yup.string().required("Required"),
  apellidos: Yup.string().required("Required"),
  documento: Yup.string().required("Required"),
  correo: Yup.string().required("Required")
});

class modificarAcudiente extends Component {
  constructor(props) {
    super(props);
    this.state = {

      acudiente: null
    };
  }



  componentWillMount() {
    let id = this.props.match.params.id;
    axios({
      method: "get",
      url: `${URL}/Acudiente/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          acudiente: r.data
        });
      })
      .catch(error => {
        alert("Error");
      });
  }

  modificar(value) {
    axios({
      method: "put",
      url: `${URL}/tbl_acudiente/${this.state.acudiente.id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        swal({
          title: "El registro se ha completado con éxito ",
          text: datos.mensaje,
          icon: "success",
          button: "ok"
        });
      } else {
        swal({
          title: "Los sentimos a ocurrido un error" + "inténtalo nueva mente",
          text: datos.error,
          icon: "success",
          button: "ok"
        });
      }
    });
  }

  formulario() {
    return (
      <Formik
        initialValues={this.state.acudiente}
        validationSchema={acudienteSchema}
        onSubmit={value => {
          this.modificar(value);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <center>
              <div className="row">
                <div className="col-4 form-group">
                  <label>Nombres</label>
                  <Field name="nombres" className="form-control" />
                  {errors.nombres && touched.nombres ? (
                    <div className="text-danger">{errors.nombres}</div>
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
                  <label>Apellidos</label>
                  <Field name="apellidos" className="form-control" />
                  {errors.apellidos && touched.apellidos ? (
                    <div className="text-danger">{errors.apellidos}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Documento</label>
                  <Field name="documento" className="form-control" />
                  {errors.documento && touched.documento ? (
                    <div className="text-danger">{errors.documento}</div>
                  ) : null}
                </div>

                <div className="col-4 form-group">
                  <label>Correo</label>
                  <Field name="correo" className="form-control" />
                  {errors.correo && touched.correo ? (
                    <div className="text-danger">{errors.correo}</div>
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
        {this.state.acudiente != null ? this.formulario() : ""}
        <SweetAlert
          show={this.state.sweetShow}
          title={this.state.sweetTitle}
          text={this.state.sweetText}
          value={this.state.sweetType}
          onConfirm={() => {
            this.setState({ sweetShow: false });
            this.props.history.push("/acudiente");
          }}
        />
      </div>
    );
  }
}

export default modificarAcudiente;
