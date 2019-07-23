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

const personaSchema = Yup.object().shape({
  nombres: Yup.string()
    .min(2, "Porfavor escriba un nombre más largo")
    .max(20, "Porfavor escriba un nombre más corto")
    .required("La persona necesita un nombre"),
  apellidos: Yup.string()
    .min(2, "Porfavor escriba un apellido más largo")
    .max(20, "Porfavor escriba un apellido más corto")
    .required("La persona necesita un apellido"),
  genero: Yup.string()
    .min(2, "Porfavor escriba un apellido más largo")
    .max(20, "Porfavor escriba un apellido más corto")
    .required("La persona necesita un apellido"),
  email: Yup.string()
    .min(10, "Porfavor escriba un correo valido")
    .max(60, "El correo a excédio el limite de caracteres")
    .required("La persona necesita un correo"),
  telefono: Yup.string()
    .min(6, "Porfavor escriba un número válido")
    .max(8, "El numero no es valido")
    .required("La contraseña es obligatoria"),
  id_tipo_documento: Yup.string().required("Tipo documento requerido")
});

class ModalPersona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      persona: []
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.abrir_modal,
      persona: newProps.persona
    });
  }

  modificar(value) {
    axios({
      method: "put",
      // url: `${URL}/marca/${this.props.match.params.id_marca}`,
      url: `${URL}/Persona/${this.state.persona.id_persona}`,
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
          <ModalHeader toggle={this.toggle}>
            <center>
              <h4>Modificar Persona</h4>
            </center>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={this.state.persona}
              validationSchema={personaSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <br />
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Tipo Documento *</label>
                      <SelectTipoDoc />
                      {errors.id_tipo_documento && values.id_tipo_documento ? (
                        <div className="text-danger">
                          {errors.id_tipo_documento}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Telefono *</label>
                      <Field name="telefono" className="form-control" />
                      {errors.telefono && touched.telefono ? (
                        <div className="text-danger">{errors.telefono}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 form-group">
                      <label>Correo *</label>
                      <Field name="email" className="form-control" />
                      {errors.email && touched.email ? (
                        <div className="text-danger">{errors.email}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Nombres</label>
                      <Field name="nombres" className="form-control" />
                      {errors.nombres && touched.nombres ? (
                        <div className="text-danger">{errors.nombres}</div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Apellidos</label>
                      <Field name="apellidos" className="form-control" />
                      {errors.apellidos && touched.apellidos ? (
                        <div className="text-danger">{errors.apellidos}</div>
                      ) : null}
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Genero</label>
                      <Field name="genero" className="form-control" />
                      {errors.genero && touched.genero ? (
                        <div className="text-danger">{errors.genero}</div>
                      ) : null}
                    </div>
                  </div>
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

export default ModalPersona;
