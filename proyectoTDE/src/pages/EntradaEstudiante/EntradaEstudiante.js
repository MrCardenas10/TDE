import React, { Component } from "react";
import { Formik, Form, Field, isInteger } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "../../config/config";
import { Card, CardBody, Col, Input } from "reactstrap";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdSearch
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaEntradaEstudiante from "./AyudaEntradaEstudiante";

const EntradaeSchema = Yup.object().shape({
  cod_tarjeta: Yup.number("La tarjeta tiene que ser un numero")
    .min(111111, "El número de la tarjeta es muy corto")
    .required("La tarjeta es requerida para ingresar")
    .positive("Ingrese solo numeros positivos")
});

export default class EntradaEstudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entradae: [],
      parametro: "",
      ayuda_modal: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  tarjeta = {};

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/entradaestudiante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let entradae = [];
      r.data.forEach(d => {
        const {
          nombres,
          apellidos,
          fecha_entrada,
          entrada,
          id_entrada_lector
        } = d;
        entradae.push({
          id_entrada_lector,
          fecha_entrada,
          nombres,
          apellidos,
          entrada: entrada === 1 ? "Entro" : "No Entro"
        });
      });
      this.setState({
        entradae
      });
    });
  }

  componentDidMount() {
    this.llamar_listar();
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

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true
    });
  };

  // onChangeLetras(e) {
  //   const re = /[\u00F1A-z À-ú]*[\u00F1A-Z a-z À-ú][\u00F1A-Z a-z À-ú _]*$/g;
  //   if (!re.test(e.key)) {
  //     e.preventDefault();
  //   }
  //   this.checkBreakpoint(this.props.breakpoint);

  //   setTimeout(() => {
  //     if (!this.notificationSystem) {
  //       return;
  //     }

  //     this.notificationSystem.addNotification({
  //       title: <MdImportantDevices />,
  //       message: "En este campo solo se letras",
  //       level: "error"
  //     });
  //   }, 100);
  // }

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

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }
    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
  }

  handleChange(event) {
    let cod_tarjeta = event.target.value;
    let array = {
      cod_tarjeta
    };
    axios({
      method: "post",
      url: `${URL}/entradaestudiante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: array
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
            message: datos.mensaje,
            level: "success"
          });
        }, 100);
        this.llamar_listar();
      } else {
        // this.checkBreakpoint(this.props.breakpoint);
        // setTimeout(() => {
        //   if (!this.notificationSystem) {
        //     return;
        //   }
        //   this.notificationSystem.addNotification({
        //     title: <MdImportantDevices />,
        //     message: datos.error,
        //     level: "error"
        //   });
        // }, 50);
        // document.getElementById("registro").reset();
      }
    });
  }

  listar() {
    if (this.state.entradae.length > 0) {
      return this.state.entradae.map((e, i) => (
        <tr key={i}>
          <td>{e.nombres}</td>
          <td>{e.apellidos}</td>
          <td>{e.fecha_entrada}</td>
          <td>{e.entrada}</td>
        </tr>
      ));
    }
  }

  render() {
    var data = this.state.entradae;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.nombres.toLowerCase().includes(this.state.parametro) ||
          v.apellidos.toString().includes(this.state.parametro) ||
          v.fecha_entrada.toLowerCase().includes(this.state.parametro) ||
          v.entrada.includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <div className="row">
          <div className="col-lg-4" />

          <div className="col-lg-4">
            <center>
              <h3>Entrada Estudiante</h3>
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
        <Formik
          initialValues={this.tarjeta}
          validationSchema={EntradaeSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <Col md={12}>
                <Card className="flex-row">
                  <CardBody>
                    <div className="row">
                      <div className="col-4 form-group" />
                      <div className="col-4 form-group">
                        <label>Tarjeta *</label>
                        <Field
                          id="cod_tarjeta"
                          name="cod_tarjeta"
                          onChange={this.handleChange}
                          onKeyPress={e => this.onChangeNumero(e)}
                          className="form-control"
                        />
                        {errors.cod_tarjeta && touched.cod_tarjeta ? (
                          <div className="text-danger">
                            {errors.cod_tarjeta}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-4 form-group" />
                    </div>
                    <div className="row">
                      <div className="col-4 form-group" />
                      <div className="col-4">
                        {/* <button
                          type="submit"
                          className="btn btn-success float-right"
                        >
                          Entrar
                        </button> */}
                      </div>
                      <div className="col-4 form-group" />
                    </div>

                    <div className="row">
                      <div align="right" className="col-12 text-red">
                        <label>Los campos con (*) son obligatorios</label>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Form>
          )}
        </Formik>
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
                <div className="col-12">
                  <Tabla
                    datos={data}
                    titulos={[
                      "Nombre Estudiante",
                      "Apellido Estudiante",
                      "Fecha Ingreso",
                      "Estado"
                    ]}
                    propiedades={[
                      "nombres",
                      "apellidos",
                      "fecha_entrada",
                      "entrada"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <br />
        <AyudaEntradaEstudiante ayuda_modal={this.state.ayuda_modal} />

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
