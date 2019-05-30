import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const PresentacionSchema = Yup.object().shape({
  presentacion: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

class ModalPresentacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      presentacion: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.abrir_modal,
      presentacion: newProps.presentacion
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  modificar(value) {
    axios({
      method: "put",
      // url: `${URL}/marca/${this.props.match.params.id_marca}`,
      url: `${URL}/presentacion/${this.state.presentacion.id_presentacion}`,
      headers: {
        Authorization: "bearer" + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }
          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Se actualizo exitosamente",
            level: "success"
          });
        }, 100);
        this.toggle();
        // setTimeout(() => {
        //   this.llamar_listar();
        // }, 200);
        window.location="/presentacion";
      } else {
        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }
          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Hubo problemas con la actualizacion",
            level: "error"
          });
        }, 100);
      }
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
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Formik
              initialValues={this.state.presentacion}
              validationSchema={PresentacionSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <center>
                    <h3>Modificar Presentación</h3>
                  </center>
                  <br />
                  <div className="row">
                    <div className="col-2 form-group" />

                    <div className="col-8 form-group">
                      <label>Presentación</label>
                      <Field name="presentacion" className="form-control" />
                      {errors.presentacion && touched.presentacion ? (
                        <div className="text-danger">{errors.presentacion}</div>
                      ) : null}
                    </div>
                    <div className="col-2 form-group" />

                    <br />
                  </div>
                  <br />
                  <ModalFooter>
                    <Button type="submit" color="info">
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

export default ModalPresentacion;
