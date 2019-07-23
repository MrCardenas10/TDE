import React, { Component } from "react";
import { URL } from "./../../config/config";
import ReactDOM from "react-dom";
import TDEImage from "./../../assets/img/logo/TDE.png";
import App from "./../../App";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./../../styles/reduction.css";
import { Card, CardHeader, Col, CardBody, Row } from "reactstrap";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import { MdImportantDevices } from "react-icons/lib/md";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required(
    "Por favor ingrese su direccion de correo electronico"
  ),
  password: Yup.string().required("Por favor ingrese su contraseña")
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = {
    email: "",
    password: ""
  };

  logiarse(value) {
    axios({
      method: "post",
      url: `${URL}/login`,
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        localStorage.token = datos.token;
        localStorage.rol = datos.rol.rol;
        localStorage.id_persona = datos.id_persona.id_persona;
        localStorage.nombres = datos.nombres.nombres;
        localStorage.email = datos.email;
        localStorage.genero = datos.genero.genero;
        localStorage.telefono = datos.telefono.telefono;
        localStorage.apellidos = datos.apellidos.apellidos;
        localStorage.password = datos.password;

        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: "Bienvenido a TDE",
          level: "success"
        });

        window.location = "/app";
      } else {
        console.log("hola");
        document.getElementById("registro").reset();

        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: datos.error,
          level: "error"
        });
      }
      console.log(respuesta);
    });
  }
  render() {
    return (
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <Formik
              initialValues={this.login}
              validationSchema={LoginSchema}
              onSubmit={value => {
                this.logiarse(value);
              }}
            >
              {({ errors, values, touched }) => (
                <Form id="registro">
                  <center>
                    <img src={TDEImage} width="200" height="230" alt="TDE" />
                  </center>
                  <br />

                  <label>Correo:</label>
                  <Field
                    placeholder="ejemplologin@gmail.com"
                    type="email"
                    name="email"
                    className="form-control"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-danger">{errors.email}</div>
                  ) : null}
                  <br />
                  <label>Contraseña:</label>
                  <Field
                    placeholder="*********"
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : null}
                  <br />
                  <center>
                    <button
                      type="submit"
                      className="btn btn-success alighcenter"
                    >
                      Iniciar
                    </button>
                  </center>
                  <br />
                  <a href="/recuperar">¿Olvidaste tu contraseña?</a>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </Row>
    );
  }
}

export default Login;
