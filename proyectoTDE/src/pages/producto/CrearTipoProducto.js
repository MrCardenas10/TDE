import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, CardBody, Col } from "reactstrap";
import { TiThumbsDown, TiThumbsUp, TiEdit } from "react-icons/lib/ti";
import { MdImportantDevices } from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import ModalTipoProducto from "./ModalTipoProducto";

const TipoSchema = Yup.object().shape({
  tipo_producto: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

class CrearTipoProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipos: [],
      parametro: "",
      tipoproducto: [],
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
      url: `${URL}/tipoproducto`,
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
            message: "Se registro Con Exito",
            level: "success"
          });
        }, 100);
        document.getElementById("limpiar_campos").reset();

        this.llamar_listar();
      } else {
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
        document.getElementById("limpiar_campos").reset();
      }
    });
  }

  //LISTAR

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/tipoproducto`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let tipos = [];
      r.data.forEach(d => {
        const { id_tipo_producto, tipo_producto, estado } = d;
        let obj = {
          id_tipo_producto,
          tipo_producto,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            estado === 1
              ? this.boton_estado(
                  "btn btn-danger",
                  <TiThumbsDown />,
                  id_tipo_producto
                )
              : this.boton_estado(
                  "btn btn-success",
                  <TiThumbsUp />,
                  id_tipo_producto
                ),
            <span> </span>,
            estado === 1 ? (
              <button
                onClick={() => this.modal_tipoproducto(id_tipo_producto)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null
          ]
        };
        tipos.push(obj);
      });
      this.setState({
        tipos
      });
    });
  }

  modal_tipoproducto(id) {
    axios({
      method: "get",
      url: `${URL}/tipoproducto/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          tipoproducto: r.data,
          abrir_modal: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  cambiar_estado(id) {
    axios({
      method: "delete",
      url: `${URL}/tipoproducto/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Se cambio el estado exitosamente",
            level: "success"
          });
        }, 100);
        this.llamar_listar();
      } else {
        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Hubo problemas con el cambio de estado",
            level: "error"
          });
        }, 100);
      }
    });
  }

  editar(id) {
    this.props.history.push(`/tipoproducto/modificar/${id}`);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  boton_estado(clase, texto, id) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.tipos.length > 0) {
      return this.state.tipos.map((e, i) => (
        <tr key={i}>
          <br />
          <td>{e.tipo_producto}</td>
          <td>{e.estado}</td>
          <td>{e.botones}</td>
          <br />
        </tr>
      ));
    }
  }

  cargando() {
    return (
      <tr>
        <td colSpan="3" className="text-center">
          <img src="/ajax-loader.gif" />
        </td>
      </tr>
    );
  }

  render() {
    var data = this.state.tipos;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (v.tipoproducto.toLowerCase().includes(this.state.parametro)) {
          ds.push(v);
        }
      });
      data = ds;
    }

    return (
      <div>
        {console.log(this.state.tipoproducto)}
        <Formik
          initialValues={this.tipos}
          validationSchema={TipoSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched }) => (
            <Form id="limpiar_campos">
              <div align="center">
                <h3>Tipos de Producto</h3>
              </div>
              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div className="col-3 form-group" />
                        <div align="center" className="col-6 form-group">
                          <label>Tipo de producto *</label>
                          <Field
                            onKeyPress={e => this.onChangeLetras(e)}
                            name="tipo_producto"
                            className="form-control"
                          />
                          {errors.tipo_producto && touched.tipo_producto ? (
                            <div className="text-danger">
                              {errors.tipo_producto}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-3 form-group" />

                        <div align="center" className="col-12 form-group">
                          <button
                            type="submit"
                            className="btn btn-success float-center"
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div align="right" className="col-12 text-red">
                          <label>Los campos con (*) son obligatorios</label>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </Form>
          )}
        </Formik>
        <br />
        <br />
        <Col md={12}>
          <Card className="flex-row">
            <CardBody>
              <div className="row">
                <div className="col-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={["Id", "Tipo producto", "Estado"]}
                    propiedades={[
                      "id_tipo_producto",
                      "tipo_producto",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <ModalTipoProducto
          abrir_modal={this.state.abrir_modal}
          tipoproducto={this.state.tipoproducto}
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

export default CrearTipoProducto;
