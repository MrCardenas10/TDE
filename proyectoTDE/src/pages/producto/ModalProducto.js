import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MarcaSelect from "./../../components/MarcaSelect";
import PresentacionSelect from "./../../components/PresentacionSelect";
import TipoProductoSelect from "./../../components/TipoProductoSelect";
import UnidadMedidaSelect from "./../../components/UnidadMedidaSelect";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const ProductoSchema = Yup.object().shape({
  producto: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  precio: Yup.string().required("Required"),
  id_presentacion: Yup.string().required("Required"),
  id_marca: Yup.string().required("Required"),
  id_tipo_producto: Yup.string().required("Required"),
  id_unidad_medida: Yup.string().required("Required")
});

class ModalProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      producto: []
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
      producto: newProps.producto
    });
  }

  onChangeLetras(e) {
    const re = /[\u00F1A-z À-ú]*[\u00F1A-Z a-z À-ú][\u00F1A-Z a-z À-ú _]*$/g;
    if (!re.test(e.key)) {
      e.preventDefault();
      this.checkBreakpoint(this.props.breakpoint);

      setTimeout(() => {
        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: "En este campo solo se letras",
          level: "error"
        });
      }, 100);
    }
  }

  onChangeNumero(e) {
    const re = /[0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
      this.checkBreakpoint(this.props.breakpoint);

      setTimeout(() => {
        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: "En este campo solo se admiten numeros",
          level: "error"
        });
      }, 100);
    }
  }

  modificar(value) {
    axios({
      method: "put",
      // url: `${URL}/producto/${this.props.match.params.id_producto}`,
      url: `${URL}/producto/${this.state.producto.id_producto}`,
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
            message: "Se actualizó exitosamente",
            level: "success"
          });
        }, 100);
        this.toggle();
        // setTimeout(() => {
        //   this.llamar_listar();
        // }, 200);
        window.location = "/producto";
      } else {
        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }
          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Hubo problemas con la actualización",
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
              initialValues={this.state.producto}
              validationSchema={ProductoSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <center>
                    <h3>Modificar Producto</h3>
                  </center>
                  <br />
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>Producto</label>
                      <Field
                        name="producto"
                        className="form-control"
                        onKeyPress={e => this.onChangeLetras(e)}
                      />
                      {errors.producto && touched.producto ? (
                        <div className="text-danger">{errors.producto}</div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Precio</label>
                      <Field
                        name="precio"
                        className="form-control"
                        onKeyPress={e => this.onChangeNumero(e)}
                      />
                      {errors.precio && touched.precio ? (
                        <div className="text-danger">{errors.precio}</div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Presentación</label>
                      <PresentacionSelect
                        id_presentacion={this.state.producto.id_presentacion}
                      />
                      {errors.id_presentacion && touched.id_presentacion ? (
                        <div className="text-danger">
                          {errors.id_presentacion}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Marca</label>
                      <MarcaSelect id_marca={this.state.producto.id_marca} />
                      {errors.id_marca && touched.id_marca ? (
                        <div className="text-danger">{errors.id_marca}</div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Tipo Producto</label>
                      <TipoProductoSelect
                        id_tipo_producto={this.state.producto.id_tipo_producto}
                      />
                      {errors.id_tipo_producto && touched.id_tipo_producto ? (
                        <div className="text-danger">
                          {errors.id_tipo_producto}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Unidad Medida</label>
                      <UnidadMedidaSelect
                        id_unidad_medida={this.state.producto.id_unidad_medida}
                      />
                      {errors.id_unidad_medida && touched.id_unidad_medida ? (
                        <div className="text-danger">
                          {errors.id_unidad_medida}
                        </div>
                      ) : null}
                    </div>

                    <br />
                  </div>
                  <br />
                  <ModalFooter>
                    <Button type="submit" color="info">
                      Modificar
                    </Button>{" "}
                    <Button color="danger" onClick={this.toggle}>
                      Cancelar
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

export default ModalProducto;
