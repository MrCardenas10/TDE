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
import bn from "./../../utils/bemnames";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("El email es requerido")
});

const bem = bn.create("backgroup");

class Recuperar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = {
    email: ""
  };

  logiarse(value) {
    axios({
      method: "post",
      url: `${URL}/recover`,
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        localStorage.user = value.email;
        document.getElementById("registro").reset();

        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: "Verifique su correo en los proximos 60 minutos",
          level: "success"
        });

        this.login = {
          email: ""
        };
      } else {

        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: "Este correo no existe",
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

                  <br />
                  <center>
                    <button
                      type="submit"
                      className="btn btn-success alighcenter"
                    >
                      Recuperar
                    </button>
                  </center>
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

export default Recuperar;
