import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, CardBody, Col, Input } from "reactstrap";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdSearch
} from "react-icons/lib/md";
import ModalVisitante from "./ModalVisitante";
import Tabla from "./../../components/Tabla";
import NotificationSystem from "react-notification-system";
import { TiEdit, TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const RegistroVisitanteSchema = Yup.object().shape({
  nombre_visitante: Yup.string()
    .min(1, "Too Short")
    .max(25, "Too Long")
    .required("Por favor escriba el nombre"),
  apellido_visitante: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Por favor escriba el apellido"),
  id_visitante: Yup.string().required("Por favor escriba el documento")
});

export default class Entrada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitante: [],
      parametro: "",
      visitantes: [],
      abrir_modal: false
    };
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
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

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/visitante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let visitante = [];
      r.data.forEach(d => {
        const {
          id_visitante,
          nombre_visitante,
          apellido_visitante,
          estado
        } = d;
        let obj = {
          id_visitante,
          nombre_visitante,
          apellido_visitante,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            estado === 1
              ? this.boton_estado(
                  "btn btn-danger bordered",
                  <TiThumbsDown />,
                  id_visitante
                )
              : this.boton_estado(
                  "btn btn-success",
                  <TiThumbsUp />,
                  id_visitante
                ),
            <span> </span>,
            estado === 1 ? (
              <button
                onClick={() => this.modal_visitante(id_visitante)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null
          ]
        };
        visitante.push(obj);
      });
      this.setState({
        visitante
      });
    });
  }

  modal_visitante(id) {
    axios({
      method: "get",
      url: `${URL}/visitante/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          visitantes: r.data,
          abrir_modal: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  editar(id_visitante) {
    this.props.history.push(`/visitante/modificar/${id_visitante}`);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  cambiar_estado(id_visitante) {
    axios({
      method: "delete",
      url: `${URL}/visitante/${id_visitante}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          this.setState({
            abrir_modal: false,
            sweetShow: true,
            sweetTitle: "Genial",
            sweetText: r.mensaje,
            sweetType: "seccess"
          });
          this.llamar_listar();
        } else {
          this.setState({
            sweetShow: true,
            sweetTitle: "Ops",
            sweetText: r.error,
            sweetType: "error"
          });
        }
      })
      .catch(error => {
        alert("Error");
      });
  }

  boton_estado(clase, texto, id_visitante) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id_visitante);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.visitante.length > 0) {
      return this.state.visitante.map((e, i) => (
        <tr key={i}>
          <td>{e.nombre_visitante}</td>
          <td>{e.apellido_visitante}</td>
          <td>{e.id_visitante}</td>
          <td>{e.estado}</td>
          <td>{e.botones}</td>
        </tr>
      ));
    }
  }

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/visitante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.checkBreakpoint(this.props.breakpoint);

        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }
          document.getElementById("registro").reset();

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Se registro Con Exito",
            level: "success"
          });
        }, 100);
        this.llamar_listar();
      } else {
        this.checkBreakpoint(this.props.breakpoint);

        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Error al registrar",
            level: "error"
          });
        }, 100);
      }
    });

    console.log(value);
  }

  render() {
    var data = this.state.visitante;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.nombre_visitante.toLowerCase().includes(this.state.parametro) ||
          v.id_visitante.toString().includes(this.state.parametro) ||
          v.apellido_visitante.toLowerCase().includes(this.state.parametro) ||
          v.estado.includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <br />
        <center>
          <h1>Registrar Visitante</h1>
        </center>
        <br />
        <br />
        <Formik
          initialValues={this.visitantes}
          validationSchema={RegistroVisitanteSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <div className="row">
              <div className="col-12">
                <Form id="registro">
                  <Col md={12}>
                    <Card className="flex-row">
                      <CardBody>
                        <div className="row">
                          <div className="col-4 form-group">
                            <label>Nombre</label>
                            <Field
                              name="nombre_visitante"
                              className="form-control"
                              onKeyPress={e => this.onChangeLetras(e)}
                            />
                            {errors.nombre_visitante &&
                            touched.nombre_visitante ? (
                              <div className="text-danger">
                                {errors.nombre_visitante}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-4 form-group">
                            <label>Apellido</label>
                            <Field
                              name="apellido_visitante"
                              className="form-control"
                              onKeyPress={e => this.onChangeLetras(e)}
                            />
                            {errors.apellido_visitante &&
                            touched.apellido_visitante ? (
                              <div className="text-danger">
                                {errors.apellido_visitante}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-4 form-group">
                            <label>Documento</label>
                            <Field
                              name="id_visitante"
                              onKeyPress={e => this.onChangeNumero(e)}
                              className="form-control"
                            />
                            {errors.id_visitante && touched.id_visitante ? (
                              <div className="text-danger">
                                {errors.id_visitante}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4 form-group" />
                          <div className="col-4 form-group">
                            <br />
                            <br />
                            <center>
                              <button type="submit" className="btn btn-success">
                                Registrar
                              </button>
                            </center>
                          </div>
                          <div className="col-4 form-group" />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Form>
              </div>
            </div>
          )}
        </Formik>
        <br />
        <br />
        <Col md={12}>
          <Card className="flex-row">
            <CardBody>
              <div className="row">
                <div className="col-4" />
                <div className="col-4" />
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
              <br />
              <div className="row">
                <div className="col-md-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={[
                      "Documento",
                      "Nombre Visitante",
                      "Apellido Visitante",
                      "Estado"
                    ]}
                    propiedades={[
                      "id_visitante",
                      "nombre_visitante",
                      "apellido_visitante",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <ModalVisitante
          abrir_modal={this.state.abrir_modal}
          visitantes={this.state.visitantes}
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
