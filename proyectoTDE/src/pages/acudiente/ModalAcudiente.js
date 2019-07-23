import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as Yup from "yup";
import SweetAlert from "sweetalert-react";
import axios from "axios";
import swal from "sweetalert";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
const acudienteSchema = Yup.object().shape({
  nombres: Yup.string().required("Required"),
  telefono: Yup.string().required("Required"),
  apellidos: Yup.string().required("Required"),
  documento: Yup.string().required("Required"),
  correo: Yup.string().required("Required")
});

class ModalAcudiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      acu: []
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
      acu: newProps.acu
    });
  }

  modificar(value) {
    axios({
      method: "put",
      url: `${URL}/Acudiente/${this.state.acudiente.id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        swal({
          title: "El registro se ha completado con éxito ",
          text: datos.mensaje,
          icon: "success",
          button: "ok"
        });
      } else {
        swal({
          title: "Los sentimos a ocurrido un error" + "inténtalo nueva mente",
          text: datos.error,
          icon: "success",
          button: "ok"
        });
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
              <h4>Modificar Acudiente</h4>
            </center>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={this.state.acu}
              validationSchema={acudienteSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <br />
                  <div className="row">
                    <div className="col-4 form-group">
                      <label>Nombres</label>
                      <Field name="nombres" className="form-control" />
                      {errors.nombres && touched.nombres ? (
                        <div className="text-danger">{errors.nombres}</div>
                      ) : null}
                    </div>

                    <div className="col-4 form-group">
                      <label>Telefono</label>
                      <Field name="telefono" className="form-control" />
                      {errors.telefono && touched.telefono ? (
                        <div className="text-danger">{errors.telefono}</div>
                      ) : null}
                    </div>

                    <div className="col-4 form-group">
                      <label>Apellidos</label>
                      <Field name="apellidos" className="form-control" />
                      {errors.apellidos && touched.apellidos ? (
                        <div className="text-danger">{errors.apellidos}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-4 form-group">
                    <label>Documento</label>
                    <Field name="documento" className="form-control" />
                    {errors.documento && touched.documento ? (
                      <div className="text-danger">{errors.documento}</div>
                    ) : null}
                  </div>

                  <div className="col-4 form-group">
                    <label>Correo</label>
                    <Field name="correo" className="form-control" />
                    {errors.correo && touched.correo ? (
                      <div className="text-danger">{errors.correo}</div>
                    ) : null}
                  </div>
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

export default ModalAcudiente;
