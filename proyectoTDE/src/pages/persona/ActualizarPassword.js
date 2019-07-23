import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SelectTipoDoc from "./../../components/SelectTipoDoc";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const PasswordSchema = Yup.object().shape({
  newpassword: Yup.string().required("Por favor escriba su nueva contraseña"),
  confirmPassword: Yup.string().required(
    "Vuelva a ingresar su nueva contraseña"
  )
});

class ActualizarPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  password = {
    newpassword: "",
    confirmPassword: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.password_modal
    });
  }

  logiarse(value) {
    axios({
      method: "put",
      url: `${URL}/actualizarPassword/${localStorage.id_persona}`,
      data: {
        newpassword: value.newpassword,
        confirmPassword: value.confirmPassword
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok !== null) {
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

        this.toggle();
        setTimeout(() => {
          window.location = "/";
        }, 1500);
      } else {
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
        this.toggle();
      }
      console.log(respuesta);
    });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <center>
              <h4>Actualizar Contraseña</h4>
            </center>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={this.password}
              validationSchema={PasswordSchema}
              onSubmit={value => {
                this.logiarse(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <br />
                  <div className="row">
                    <div className="col-lg-4" />

                    <div className="col-lg-4">
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
                    </div>
                    <div className="col-lg-4" />
                  </div>
                  <div className="row">
                    <div className="col-lg-4" />
                    <div className="col-lg-4">
                      <label>Confirmar Contraseña:</label>

                      <Field
                        placeholder="*********"
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                      />
                      {values.newpassword != values.confirmPassword ? (
                        <div className="text-danger">
                          Las contraseñas no son iguales{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="text-danger">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-lg-4" />
                  </div>
                  <br />

                  <ModalFooter>
                    <Button type="submit" color="primary">
                      Modificar
                    </Button>{" "}
                    <Button color="danger" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
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

export default ActualizarPerfil;
