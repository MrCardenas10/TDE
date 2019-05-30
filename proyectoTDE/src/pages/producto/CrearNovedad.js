import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import ProductoSelect from "./../../components/ProductoSelect";
import { URL } from "./../../config/config";
import { TiEdit } from "react-icons/lib/ti";
import { Card, CardBody, Col } from "reactstrap";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import ModalNovedad from "./ModalNovedades";

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

class CrearNovedad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novedades: [],
      parametro: "",
      novedad: [],
      abrir_modal: false
    };
  }

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

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/novedad`,
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
            message: datos.mensaje,
            level: "success"
          });
        }, 100);
        this.llamar_listar();
      } else {
        document.getElementById("limpiar_campos").reset();

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

  //LISTAR

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/novedad`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let novedades = [];
      r.data.forEach(d => {
        const { id_novedad, cantidad_producto, motivo_salida, id_producto } = d;
        let obj = {
          cantidad_producto,
          motivo_salida,
          id_producto,
          botones: [
            <button
              onClick={() => this.modal_novedad(id_novedad)}
              className="btn btn-info"
            >
              <TiEdit />
            </button>
          ]
        };
        novedades.push(obj);
      });
      this.setState({
        novedades
      });
    });
  }

  modal_novedad(id) {
    axios({
      method: "get",
      url: `${URL}/novedad/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          novedad: r.data,
          abrir_modal: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  editar(id) {
    this.props.history.push(`/novedad/modificar/${id}`);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  listar() {
    if (this.state.novedades.length > 0) {
      return this.state.novedades.map((e, i) => (
        <tr key={i}>
          <br />
          <td>{e.cantidad_producto}</td>
          <td>{e.motivo_salida}</td>
          <td>{e.id_producto}</td>
          <td>{e.botones}</td>
          <br />
        </tr>
      ));
    }
  }

  cargando() {
    return (
      <tr>
        <td colSpan="4" className="text-center">
          <img src="/ajax-loader.gif" />
        </td>
      </tr>
    );
  }

  render() {
    var data = this.state.novedades;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (v.novedad.toLowerCase().includes(this.state.parametro)) {
          ds.push(v);
        }
      });
      data = ds;
    }

    return (
      <div>
        <hr />
        <center>
          <h3>Crear Novedad</h3>
        </center>

        <Col md={12}>
          <Card className="demo-icons">
            <CardBody>
              <Formik
                initialValues={this.novedad}
                validationSchema={NovedadSchema}
                onSubmit={value => {
                  this.guardar(value);
                }}
              >
                {({ errors, touched }) => (
                  <Form id="limpiar_campos">
                    <div class="row">
                      <div className="col-4 form-group">
                        <label>Cantidad de producto *</label>
                        <Field
                          onKeyPress={e => this.onChangeNumero(e)}
                          name="cantidad_producto"
                          type="number"
                          className="form-control"
                        />
                        {errors.cantidad_producto &&
                        touched.cantidad_producto ? (
                          <div className="text-danger">
                            {errors.cantidad_producto}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-4 form-group">
                        <label>Motivo salida *</label>
                        <Field
                          onKeyPress={e => this.onChangeLetras(e)}
                          name="motivo_salida"
                          className="form-control"
                        />
                        {errors.motivo_salida && touched.motivo_salida ? (
                          <div className="text-danger">
                            {errors.motivo_salida}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-4 form-group">
                        <label>Producto</label>
                        <ProductoSelect />
                        {errors.id_producto && touched.id_producto ? (
                          <div className="text-danger">
                            {errors.id_producto}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div class="col-4 form-group" />
                      <div className="col-4 form-group">
                        <br />
                        <div className="col-7">
                          <button
                            type="submit"
                            className="btn btn-success float-right"
                          >
                            Registrar
                          </button>
                        </div>
                      </div>
                      <div class="col-4" />
                    </div>
                    <div className="row">
                      <div align="right" className="col-12 text-red">
                        <label>Los campos con (*) son obligatorios</label>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>

        <br />

        <Col md={12}>
          <Card className="demo-icons">
            <CardBody>
              <br />

              <div className="row">
                <div className="col-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={[
                      "Cantidad de Producto",
                      "Motivo de Salida",
                      "Producto"
                    ]}
                    propiedades={[
                      "cantidad_producto",
                      "motivo_salida",
                      "id_producto",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <ModalNovedad
          abrir_modal={this.state.abrir_modal}
          novedad={this.state.novedad}
        />
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

export default CrearNovedad;
