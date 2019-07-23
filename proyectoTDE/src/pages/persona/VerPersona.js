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
  email: Yup.string()
    .min(20, "Porfavor escriba un correo valido")
    .max(60, "El correo a excédio el limite de caracteres")
    .required("La persona necesita un correo"),
  telefono: Yup.string()
    .min(6, "Porfavor escriba un número válido")
    .max(8, "El numero no es valido")
    .required("La contraseña es obligatoria"),
  tipo_documento: Yup.string().required("Tipo documento requerido")
});

class VerPersona extends Component {
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
      modal: newProps.verPersona,
      persona: newProps.persona
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
              onSubmit={() => {}}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <br />
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Tipo Documento *</label>
                      <Field
                        disabled
                        name="tipo_documento"
                        className="form-control"
                      />
                      {errors.tipo_documento && values.tipo_documento ? (
                        <div className="text-danger">
                          {errors.tipo_documento}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Telefono *</label>
                      <Field
                        disabled
                        name="telefono"
                        className="form-control"
                      />
                      {errors.telefono && touched.telefono ? (
                        <div className="text-danger">{errors.telefono}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 form-group">
                      <label>Correo *</label>
                      <Field disabled name="email" className="form-control" />
                      {errors.email && touched.email ? (
                        <div className="text-danger">{errors.email}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Nombres</label>
                      <Field disabled name="nombres" className="form-control" />
                      {errors.nombres && touched.nombres ? (
                        <div className="text-danger">{errors.nombres}</div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Apellidos</label>
                      <Field
                        disabled
                        name="apellidos"
                        className="form-control"
                      />
                      {errors.apellidos && touched.apellidos ? (
                        <div className="text-danger">{errors.apellidos}</div>
                      ) : null}
                    </div>
                    <br />
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Telefono</label>
                      <Field
                        disabled
                        name="telefono"
                        className="form-control"
                      />
                      {errors.telefono && touched.telefono ? (
                        <div className="text-danger">{errors.telefono}</div>
                      ) : null}
                    </div>
                    <div className="col-6 form-group">
                      <label>Genero</label>
                      <Field disabled name="genero" className="form-control" />
                      {errors.genero && touched.genero ? (
                        <div className="text-danger">{errors.genero}</div>
                      ) : null}
                    </div>
                  </div>
                  <ModalFooter>
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

export default VerPersona;
