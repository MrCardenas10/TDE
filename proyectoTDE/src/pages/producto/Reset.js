import React, { Component } from "react";
import { URL } from "./../../config/config";
import TDEImage from "./../../assets/img/logo/TDE.png";
import ReactDOM from "react-dom";

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
  newpassword: Yup.string().required("Por favor escriba su nueva contraseña"),
  confirmPassword: Yup.string().required(
    "Vuelva a ingresar su nueva contraseña"
  )
});

const bem = bn.create("backgroup");

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  login = {
    newpassword: "",
    confirmPassword: ""
  };

  logiarse(value) {
    axios({
      method: "post",
      url: `${URL}/reset`,
      data: {
        newpassword: value.newpassword,
        confirmPassword: value.confirmPassword,
        User: localStorage.user
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok !== null) {
        localStorage.removeItem("user");
        window.location = "/login";
        this.login = {
          newpassword: "",
          confirmPassword: ""
        };
      } else {
        console.log("Eror al reseterar");
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
                <Form>
                  <center>
                    <img src={TDEImage} width="200" height="230" alt="TDE" />
                  </center>

                  <br />

                  <label>Nueva Contraseña:</label>
                  <Field
                    placeholder="*********"
                    type="password"
                    name="newpassword"
                    className="form-control"
                  />
                  {errors.newpassword && touched.newpassword ? (
                    <div className="text-danger">{errors.newpassword}</div>
                  ) : null}
                  <br />
                  <label>Confirmar Contraseña:</label>
                  <Field
                    placeholder="*********"
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-danger">{errors.confirmPassword}</div>
                  ) : null}
                  <br />
                  <center>
                    <button
                      type="submit"
                      className="btn btn-success alighcenter"
                    >
                      Guardar
                    </button>
                  </center>
                </Form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Reset;
