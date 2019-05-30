import React, { Component } from "react";
import { URL } from "./../../config/config";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Persona from "./../../components/Persona";
import Selectacudien from "./../../components/Selectacudien";
import SweetAlert from "sweetalert-react";
import axios from "axios";
import swal from "sweetalert";

const tbl_estudianteSchema = Yup.object().shape({
  id_persona: Yup.string().required("Required"),

  id_acudiente: Yup.string().required("Required")
});

class Modificar_estudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetShow: false,
      sweetTitle: "",
      sweetText: "",
      sweetType: "",
      tbl_estudiante: []
    };
  }
  ff;

  // this.state.tbl_estudiante.idtipotrans

  componentWillMount() {
    let id = this.props.match.params.id;
    axios({
      method: "get",
      url: `${URL}/Estudiante/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          tbl_estudiante: r.data
        });
      })
      .catch(error => {
        alert("Error");
      });
  }

  modificar(value) {
    axios({
      method: "put",
      url: `${URL}/Estudiante/${this.state.tbl_estudiante.id}`,
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
        initialValues={this.state.tbl_estudiante}
        validationSchema={tbl_estudianteSchema}
        onSubmit={value => {
          this.modificar(value);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="row">
              {/* <div className="col-4 form-group">
                        <label>id_persona</label>
                        <Persona/>
                            {errors.id_persona && touched.id_persona ? (
                            <div className="text-danger">{errors.id_persona}</div>
                            ) : null}
                        </div> */}

              <div className="col-4 form-group">
                <label>id_acudiente</label>
                <Selectacudien />
                {errors.id_acudiente && touched.id_acudiente ? (
                  <div className="text-danger">{errors.id_acudiente}</div>
                ) : null}
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="col-12">
                <button type="submit" className="btn btn-warning float-right">
                  Modificar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <div>
        {this.state.tbl_estudiante != null ? this.formulario() : ""}
        <SweetAlert
          show={this.state.sweetShow}
          title={this.state.sweetTitle}
          text={this.state.sweetText}
          value={this.state.sweetType}
          onConfirm={() => {
            this.setState({ sweetShow: false });
            this.props.history.push("/Estudiante");
          }}
        />
      </div>
    );
  }
}

export default Modificar_estudiante;
