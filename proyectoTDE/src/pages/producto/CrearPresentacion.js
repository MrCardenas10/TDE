import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, CardBody, Col, Input } from "reactstrap";
import { MdImportantDevices, MdSearch } from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import { TiEdit } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import ModalPresentacion from "./ModalPresentacion";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaPresentacion from "./AyudaPresentacion";

const PresentacionSchema = Yup.object().shape({
  presentacion: Yup.string()
    .min(2, "Nombre demasiado corto")
    .max(50, "Nombre demasiado largo")
    .required("Campo obligatorio")
});

class CrearPresentacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentaciones: [],
      parametro: "",
      presentacion: [],
      abrir_modal: false,
      ayuda_modal: false
    };
  }

  prese = {
    presentacion: ""
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

  guardar(value) {
    this.setState({
      ayuda_modal: false,
      abrir_modal:false
    });
    axios({
      method: "post",
      url: `${URL}/presentacion`,
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
            message: "Se registro Con Exito",
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
            message: "Problemas con el registro",
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
      url: `${URL}/presentacion`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let presentaciones = [];
      r.data.forEach(d => {
        const { id_presentacion, presentacion, estado } = d;
        let obj = {
          id_presentacion,
          presentacion,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            estado === 1
              ? this.boton_estado(
                  "btn btn-danger bordered",
                  <TiThumbsDown />,
                  id_presentacion
                )
              : this.boton_estado(
                  "btn btn-success",
                  <TiThumbsUp />,
                  id_presentacion
                ),
            <span> </span>,
            estado === 1 ? (
              <button
                onClick={() => this.modal_presentacion(id_presentacion)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null
          ]
        };
        presentaciones.push(obj);
      });
      this.setState({
        presentaciones
      });
    });
  }

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true,
      abrir_modal: false
    });
  };

  modal_presentacion(id) {
    axios({
      method: "get",
      url: `${URL}/presentacion/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          presentacion: r.data,
          abrir_modal: true,
          ayuda_modal: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  cambiar_estado(id) {
    this.setState({
      ayuda_modal: false,
      abrir_modal:false
    });
    axios({
      method: "delete",
      url: `${URL}/presentacion/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        this.state.abrir_modal = false;
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

  // editar(id) {
  //   this.props.history.push(`/presentacion/modificar/${id}`);
  // }

  componentDidMount() {
    this.llamar_listar();
  }

  boton_estado = (clase, texto, id) => {
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
  };

  listar() {
    if (this.state.presentaciones.length > 0) {
      return this.state.presentaciones.map((e, i) => (
        <tr key={i}>
          <br />
          <td>{e.id_presentacion}</td>
          <td>{e.presentacion}</td>
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
    var data = this.state.presentaciones;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.presentacion.toLowerCase().includes(this.state.parametro) ||
          v.estado.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }

    return (
      <div>
        <Formik
          initialValues={this.prese}
          validationSchema={PresentacionSchema}
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
                    <h3>Presentación</h3>
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
              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div className="col-3 form-group" />
                        <div align="center" className="col-6 form-group">
                          <label>Presentación *</label>
                          <Field
                            onKeyPress={e => this.onChangeLetras(e)}
                            name="presentacion"
                            className="form-control"
                          />
                          {errors.presentacion && touched.presentacion ? (
                            <div className="text-danger">
                              {errors.presentacion}
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

        <Col md={12}>
          <Card className="flex-row">
            <CardBody>
              <div align="right">
                <div className="col-4">
                  <MdSearch
                    height="35"
                    width="55"
                    size="2"
                    className="cr-search-form__icon-search text-secondary"
                  />
                  <Input
                    type="search"
                    className="cr-search-form__input"
                    placeholder="Buscar..."
                    onKeyUp={({ target }) =>
                      this.setState({
                        parametro: target.value.toLowerCase()
                      })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={["Id", "Presentación", "Estado"]}
                    propiedades={[
                      "id_presentacion",
                      "presentacion",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <ModalPresentacion
          abrir_modal={this.state.abrir_modal}
          presentacion={this.state.presentacion}
        />

        <AyudaPresentacion ayuda_modal={this.state.ayuda_modal} />

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

export default CrearPresentacion;
