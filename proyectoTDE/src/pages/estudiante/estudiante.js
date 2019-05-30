import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, Col, CardBody } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { TiEdit } from "react-icons/lib/ti";

const estudianteSchema = Yup.object().shape({
  id_persona: Yup.string().required("Required"),
  id_acudiente: Yup.string().required("Required")
});

export class estudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estudiantes: [],
      parametro: ""
    };
  }

  estudiante = {
    id_persona: "",
    id_acudiente: ""
  };

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case "xs":
      case "sm":

      case "lg":
      case "xl":
    }
  }

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/Estudiante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.checkBreakpoint(this.props.breakpoint);

        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: datos.mensaje,
            level: "success"
          });
        }, 100);
        this.llamar_listar();
        document.getElementById("registro").reset();
      } else {
        this.checkBreakpoint(this.props.breakpoint);

        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: datos.error,
            level: "error"
          });
        }, 100);
        document.getElementById("registro").reset();
      }
    });
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/Estudiante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let estudiantes = [];
      r.data.forEach(d => {
        const {
          id_persona,
          nombres,
          apellidos,
          email,
          telefono,
          genero,
          tipo_documento,
          nombre_acudiente,
          apellido_acuiente
        } = d;
        let obj = {
          id_persona,
          nombres,
          apellidos,
          email,
          telefono,
          genero,
          tipo_documento,
          nombre_acudiente,
          apellido_acuiente,
          botones: [
            <button
              onClick={() => this.editar(id_persona)}
              className="btn btn-info"
            >
              <TiEdit />
            </button>
          ]
        };
        estudiantes.push(obj);
      });
      this.setState({
        estudiantes
      });
    });
  }

  componentDidMount() {
    this.llamar_listar();
  }

  editar(id_estudiante) {
    this.props.history.push(`/estudiante/modificar/${id_estudiante}`);
  }

  cambiar_estado(id_estudiante) {
    axios({
      method: "delete",
      url: `${URL}/Estudiante/${id_estudiante}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          this.setState({
            sweetShow: true,
            sweetText: r.mensaje,
            sweetTitle: "Hola",
            sweetType: "success"
          });
          this.llamar_listar();
        }
      })
      .catch(error => {
        alert("Error");
      });
  }

  boton_estado(clase, texto, documento_estudiante) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(documento_estudiante);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.estudiantes.length > 0) {
      return this.state.estudiante.map((e, i) => (
        <tr key={i}>
          <td>{e.id_persona}</td>
          <td>{e.id_acudiente}</td>
          <td>{e.botones}</td>
        </tr>
      ));
    }
  }

  cargando() {
    return (
      <tr>
        <td colSpan="8" className="text-center">
          <img src="/load.gif" />
        </td>
      </tr>
    );
  }

  render() {
    var data = this.state.estudiantes;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (v.estudiantes.toLowerCase().includes(this.state.parametro)) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Formik
          initialValues={this.estudiante}
          validationSchema={estudianteSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <div align="center">
                <h3>Estudiantes</h3>
              </div>
              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div align="center" className="col-6 form-group">
                          <label>Documento Estudiante</label>
                          <Field name="id_persona" className="form-control" />
                          {errors.id_persona && touched.id_persona ? (
                            <div className="text-danger">
                              {errors.id_persona}
                            </div>
                          ) : null}
                        </div>

                        <div align="center" className="col-6 form-group">
                          <label>Documento Acudiente</label>
                          <Field name="id_acudiente" className="form-control" />
                          {errors.id_acudiente && touched.id_acudiente ? (
                            <div className="text-danger">
                              {errors.id_acudiente}
                            </div>
                          ) : null}
                        </div>

                        <div align="center" className="col-12 form-group">
                          <button
                            type="submit"
                            className="btn btn-success float-center"
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div align="right" className="col-12 text-red">
                          <label>Los campos con (*) son obligatorios</label>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </Form>
          )}
        </Formik>

        <br />

        <Col md={12}>
          <Card className="flex-row">
            <CardBody>
              <div className="row">
                <div className="col-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={["Documento Estudiante", "Documento Acudiente"]}
                    propiedades={["id_persona", "id_acudiente", "botones"]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </div>
    );
  }
}

export default estudiante;
