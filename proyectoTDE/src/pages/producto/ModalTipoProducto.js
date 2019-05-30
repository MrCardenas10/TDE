import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CrearMarca from "./CrearMarca";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const TipoSchema = Yup.object().shape({
  tipo_producto: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("El nombre de la marca es obligatorio")
});

class ModalTipoProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tipoproducto: []
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
      tipoproducto: newProps.tipoproducto
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
      // url: `${URL}/tipoproducto/${this.props.match.params.id_tipoproducto}`,
      url: `${URL}/tipoproducto/${this.state.tipoproducto.id_tipo_producto}`,
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
        {console.log(this.state.tipoproducto)}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Formik
              initialValues={this.state.tipoproducto}
              validationSchema={TipoSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <center>
                    <h3>Modificar Tipo Producto</h3>
                  </center>
                  <br />
                  <div className="row">
                    <div className="col-2 form-group" />

                    <div className="col-8 form-group">
                      <label>Tipo Producto</label>
                      <Field name="tipo_producto" className="form-control" onKeyPress={(e) => this.onChangeLetras(e)}/>
                      {errors.tipo_producto && touched.tipo_producto ? (
                        <div className="text-danger">
                          {errors.tipo_producto}
                        </div>
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

export default ModalTipoProducto;
