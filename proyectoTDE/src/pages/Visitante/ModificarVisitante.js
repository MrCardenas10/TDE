import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, CardBody, Col } from "reactstrap";
import {
  MdImportantDevices
  // MdCardGiftcard,
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const ModificarVisitanteSchema = Yup.object().shape({
  nombre_visitante: Yup.string()
    .min(2, "Too Short")
    .max(25, "Too Long")
    .required("Required"),
  apellido_visitante: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  id_visitante: Yup.string().required("Required")
});

export default class ModificarVisitante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetShow: false,
      sweetTitle: "",
      sweetText: "",
      sweetType: "",
      visitante: null
    };
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case "xs":
      case "sm":
      case "md":
        return this.openSidebar("close");

      case "lg":
      case "xl":
      default:
        return this.openSidebar("open");
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }
    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
  }

  componentWillMount() {
    let id_visitante = this.props.match.params.id_visitante;
    axios({
      method: "get",
      url: `${URL}/visitante/${id_visitante}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          visitante: r.data
        });
      })
      .catch(error => {
        alert("Error");
      });
  }

  modificar(value) {
    axios({
      method: "put",
      url: `${URL}/visitante/${this.props.match.params.id_visitante}`,
      data: value
    })
      .then(respuesta => {
        let datos = respuesta.data;
        if (datos.ok) {
          this.checkBreakpoint(this.props.breakpoint);

          setTimeout(() => {
            if (!this.notificationSystem) {
              return;
            }

            this.notificationSystem.addNotification({
              title: <MdImportantDevices />,
              message: "Se modifico Con Exito",
              level: "success"
            });
          }, 100);
          this.props.history.push("/visitante/crear");
        } else {
          this.checkBreakpoint(this.props.breakpoint);

          setTimeout(() => {
            if (!this.notificationSystem) {
              return;
            }

            this.notificationSystem.addNotification({
              title: <MdImportantDevices />,
              message: "Problemas con la modificacion",
              level: "error"
            });
          }, 100);
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
        initialValues={this.state.visitante}
        validationSchema={ModificarVisitanteSchema}
        onSubmit={value => {
          this.modificar(value);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <br />
            <br />
            <center>
              <h1>Modificar Visitante</h1>
            </center>
            <br />
            <br />

            <Col md={12}>
              <Card className="flex-row">
                <CardBody>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Nombre</label>
                      <Field name="nombre_visitante" className="form-control" />
                      {errors.nombre_visitante && touched.nombre_visitante ? (
                        <div className="text-danger">
                          {errors.nombre_visitante}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-6 form-group">
                      <label>Apellido</label>
                      <Field
                        name="apellido_visitante"
                        className="form-control"
                      />
                      {errors.apellido_visitante &&
                      touched.apellido_visitante ? (
                        <div className="text-danger">
                          {errors.apellido_visitante}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Numero del Visitante</label>
                      <Field name="id_visitante" className="form-control" />
                      {errors.id_visitante && touched.id_visitante ? (
                        <div className="text-danger">{errors.id_visitante}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-warning float-right"
                    >
                      Modificar
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Form>
        )}
      </Formik>
    );
  }

  render() {
    return (
      <div>
        {this.state.visitante != null ? this.formulario() : ""}

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
