import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MarcaSelect from "./../../components/MarcaSelect";
import PresentacionSelect from "./../../components/PresentacionSelect";
import TipoProductoSelect from "./../../components/TipoProductoSelect";
import UnidadMedidaSelect from "./../../components/UnidadMedidaSelect";
import { URL } from "./../../config/config";
import { Card, CardBody, Col } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaProducto from "./AyudaProducto";

const ProductoSchema = Yup.object().shape({
  id_producto: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Campo obligatorio"),
  producto: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Campo obligatorio"),
  precio: Yup.string().required("Campo obligatorio"),
  id_presentacion: Yup.string().required("Campo obligatorio"),
  id_marca: Yup.string().required("Campo obligatorio"),
  id_tipo_producto: Yup.string().required("Campo obligatorio"),
  id_unidad_medida: Yup.string().required("Campo obligatorio")
});

class CrearProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sweetShow: false,
      sweetTitle: "",
      sweetText: "",
      sweetType: "",
      ayuda_modal: false
    };
  }

  producto = {
    id_producto: "",
    producto: "",
    precio: "",

    id_presentacion: "",
    id_marca: "",
    id_tipo_producto: "",
    id_unidad_medida: ""
  };

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case "xs":
      case "sm":
      case "md":
        return this.openSidebar("close");

      case "lg":
      case "xl":
      default:
        return this.openSidebar("open");
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }
    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
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

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true
    });
  };

  guardar(value) {
    this.setState({
      ayuda_modal: false
    });
    axios({
      method: "post",
      url: `${URL}/producto`,
      headers: {
        Authorization: "bearer" + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        document.getElementById("limpiar_campos").reset();

        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Se registró con éxito",
            level: "success"
          });
        }, 100);
      } else {
        document.getElementById("limpiar_campos").reset();

        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Problemas con el registro",
            level: "error"
          });
        }, 100);
      }
    });
  }

  render() {
    return (
      <div>
        <hr />
        <Formik
          initialValues={this.producto}
          validationSchema={ProductoSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched }) => (
            <Form id="limpiar_campos">
              <div className="row">
                <div className="col-lg-4" />

                <div className="col-lg-4">
                  <center>
                    <h3>Crear Producto</h3>
                  </center>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    padding: " 0px 105px 0px 0px"
                  }}
                  className="col-lg-4"
                >
                  <button
                    style={{ borderRadius: "5px", backgroundColor: "#fff" }}
                    onClick={this.modal_ayuda}
                  >
                    <TiInfoLarge />
                  </button>
                </div>
              </div>

              <Col md={12}>
                <Card className="flex-row">
                  <CardBody>
                    <div className="row">
                      <div className="col-6 form-group">
                        <label>Código Producto *</label>
                        <Field
                          onKeyPress={e => this.onChangeNumero(e)}
                          name="id_producto"
                          className="form-control"
                          placeholder="ingrese el codigo del producto"
                        />
                        {errors.id_producto && touched.id_producto ? (
                          <div className="text-danger">
                            {errors.id_producto}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-6 form-group">
                        <label>Producto *</label>
                        <Field
                          name="producto"
                          className="form-control"
                          placeholder="ingrese el nombre del producto"
                        />
                        {errors.producto && touched.producto ? (
                          <div className="text-danger">{errors.producto}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6 form-group">
                        <label>Precio *</label>
                        <Field
                          onKeyPress={e => this.onChangeNumero(e)}
                          name="precio"
                          className="form-control"
                          placeholder="ingrese el precio"
                        />
                        {errors.precio && touched.precio ? (
                          <div className="text-danger">{errors.precio}</div>
                        ) : null}
                      </div>
                      <div className="col-6 form-group">
                        <label>Presentación</label>
                        <PresentacionSelect />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 form-group">
                        <label>Marca</label>
                        <MarcaSelect />
                      </div>
                      <div className="col-4 form-group">
                        <label>Tipo Producto</label>
                        <TipoProductoSelect />
                      </div>

                      <div className="col-4 form-group">
                        <label>Unidad Medida</label>
                        <UnidadMedidaSelect />
                      </div>
                    </div>

                    <br />
                    <div className="row">
                      <div className="col-4" />

                      <div className="col-4">
                        <center>
                          <button type="submit" className="btn btn-success">
                            Crear
                          </button>
                        </center>
                      </div>
                      <div className="row">
                        <div align="right" className="col-12 text-red">
                          <label>Los campos con (*) son obligatorios</label>
                        </div>
                      </div>

                      <div className="col-4" />
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <div className="col-3" />
            </Form>
          )}
        </Formik>

        <AyudaProducto ayuda_modal={this.state.ayuda_modal} />

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

export default CrearProducto;
