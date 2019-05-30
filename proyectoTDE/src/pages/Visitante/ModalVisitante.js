import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const VisitanteSchema = Yup.object().shape({
  nombre_visitante: Yup.string()
    .min(2, "Too Short")
    .max(25, "Too Long")
    .required("Ingrese el nombre del visitante"),
  apellido_visitante: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Ingrese el apellido del visitante"),
  id_visitante: Yup.string().required(
    "Por favor ingrese el documento del visitante"
  )
});

class ModalVisitante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      visitantes: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.abrir_modal,
      visitantes: newProps.visitantes
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
      url: `${URL}/visitante/${this.state.visitantes.id_visitante}`,
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
            message: datos.mensaje,
            level: "success"
          });
        }, 100);
        this.toggle();
        // setTimeout(() => {
        //   this.llamar_listar();
        // }, 200);
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
              initialValues={this.state.visitantes}
              validationSchema={VisitanteSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <center>
                    <h1>Modificar Visitante</h1>
                  </center>
                  <br />
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
                  <br />
                  <ModalFooter>
                    <Button type="submit" color="primary">
                      Modificar
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle}>
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

export default ModalVisitante;
