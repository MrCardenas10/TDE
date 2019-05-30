import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import ProductoSelect from "./../../components/ProductoSelect";

const NovedadSchema = Yup.object().shape({
  cantidad_producto: Yup.string().required(
    "La cantidad es obligatorio para disminuir el stock del producto"
  ),
  motivo_salida: Yup.string()
    .min(2, "El motivo de la salida es muy corto, porfavor sea mas especifico")
    .max(100, "El motivo de la salida es muy largo, porfavor sea mas concreto")
    .required("Porfavor escriba el motivo de la salida"),
  id_producto: Yup.string().required("El producto es obligatorio")
});

class ModalNovedad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      novedad: []
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
      novedad: newProps.novedad
    });
  }

  modificar(value) {
    axios({
      method: "put",
      // url: `${URL}/novedad/${this.props.match.params.id_novedad}`,
      url: `${URL}/novedad/${this.state.novedad.id_novedad}`,
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
              initialValues={this.state.novedad}
              validationSchema={NovedadSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <center>
                    <h3>Modificar Novedad</h3>
                  </center>
                  <br />
                  <div className="row">
                    <div className="col-12 form-group">
                      <label>Cantidad</label>
                      <Field
                        name="cantidad_producto"
                        className="form-control"
                      />
                      {errors.cantidad_producto && touched.cantidad_producto ? (
                        <div className="text-danger">
                          {errors.cantidad_producto}
                        </div>
                      ) : null}
                    </div>
                    </div>

                  <div className="row">
                    <div className="col-12 form-group">
                      <label>Motivo de salida</label>
                      <Field name="motivo_salida" className="form-control" />
                      {errors.motivo_salida && touched.motivo_salida ? (
                        <div className="text-danger">
                          {errors.motivo_salida}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    
                    <div className="col-12 form-group">
                      <label>Producto</label>
                      <ProductoSelect
                        id_producto={this.state.novedad.id_producto}
                      />
                      {errors.id_producto && touched.id_producto ? (
                        <div className="text-danger">{errors.id_producto}</div>
                      ) : null}
                    </div>
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

export default ModalNovedad;
