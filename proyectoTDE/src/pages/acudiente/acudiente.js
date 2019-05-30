import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, Col, CardBody } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { TiEdit } from "react-icons/lib/ti";

const acudienteSchema = Yup.object().shape({
  id_acudiente: Yup.string().required("Campo Obligatorio"),
  nombres: Yup.string().required("Campo Obligatorio"),
  telefono: Yup.string().required("Campo Obligatorio"),
  apellidos: Yup.string().required("Campo Obligatorio"),
  correo: Yup.string().required("Campo Obligatorio")
});

class acudiente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acudientes: [],
      parametro: ""
    };
  }

  acudiente = {
    id_acudiente: "",
    apellidos: "",
    nombres: "",
    telefono: "",
    correo: ""
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

      case "lg":
      case "xl":
    }
  }

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/Acudiente`,
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

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: datos.mensaje,
            level: "success"
          });
        }, 100);
        this.llamar_listar();
        document.getElementById("registro").reset();
      } else {
        this.checkBreakpoint(this.props.breakpoint);

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
        document.getElementById("registro").reset();
      }
    });
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/Acudiente`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let acudientes = [];
      r.data.forEach(d => {
        const {
          id_acudiente,
          nombres,
          apellidos,
          telefono,
          correo,
          estado
        } = d;
        let obj = {
          id_acudiente,
          nombres,
          apellidos,
          telefono,
          correo,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            estado === 1
              ? this.boton_estado(
                  "btn btn-danger bordered",
                  <TiThumbsDown />,
                  id_acudiente
                )
              : this.boton_estado(
                  "btn btn-success",
                  <TiThumbsUp />,
                  id_acudiente
                ),
            <span> </span>,

            estado === 1 ? (
              <button
                onClick={() => this.editar(id_acudiente)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null
          ]
        };
        acudientes.push(obj);
      });
      this.setState({
        acudientes
      });
    });
  }

  componentDidMount() {
    this.llamar_listar();
  }

  editar(id_acudiente) {
    this.props.history.push(`/Acudiente/modificar/${id_acudiente}`);
  }

  cambiar_estado(id_acudiente) {
    axios({
      method: "delete",
      url: `${URL}/Acudiente/${id_acudiente}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          this.checkBreakpoint(this.props.breakpoint);

          setTimeout(() => {
            if (!this.notificationSystem) {
              return;
            }

            this.notificationSystem.addNotification({
              title: <MdImportantDevices />,
              message: "Se cambio el estado Con Exito",
              level: "success"
            });
          }, 100);
          this.llamar_listar();
        }
      })
      .catch(error => {
        alert("Error");
      });
  }

  boton_estado(clase, title, id_acudiente) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id_acudiente);
        }}
        className={clase}
      >
        {title}
      </button>
    );
  }

  listar() {
    if (this.state.tbl_acudiente.length > 0) {
      return this.state.tbl_acudiente.map((e, i) => (
        <tr key={i}>
          <td>{e.id_acudiente}</td>
          <td>{e.nombres}</td>
          <td>{e.apellidos}</td>
          <td>{e.telefono}</td>
          <td>{e.correo}</td>
          <td>{e.estado}</td>
          <td>{e.botones}</td>
        </tr>
      ));
    }
  }

  cargando() {
    return (
      <tr>
        <td colSpan="8" className="text-center">
          <img src="/load.gif" />
        </td>
      </tr>
    );
  }

  render() {
    var data = this.state.acudientes;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.nombres.toLowerCase().includes(this.state.parametro) ||
          v.apellidos.toLowerCase().includes(this.state.parametro) ||
          v.id_acudiente.toLowerCase().includes(this.state.parametro) ||
          v.correo.toLowerCase().includes(this.state.parametro) ||
          v.telefono.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Formik
          initialValues={this.acudiente}
          validationSchema={acudienteSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <div align="center">
                <h3>Acudientes</h3>
              </div>
              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div className="col-4 form-group">
                          <label>Documento *</label>
                          <Field
                            name="id_acudiente"
                            type="number"
                            className="form-control"
                          />
                          {errors.id_acudiente && touched.id_acudiente ? (
                            <div className="text-danger">
                              {errors.id_acudiente}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-4 form-group">
                          <label>Nombres *</label>
                          <Field name="nombres" className="form-control" />
                          {errors.nombres && touched.nombres ? (
                            <div className="text-danger">{errors.nombres}</div>
                          ) : null}
                        </div>

                        <div className="col-4 form-group">
                          <label>Apellidos *</label>
                          <Field name="apellidos" className="form-control" />
                          {errors.apellidos && touched.apellidos ? (
                            <div className="text-danger">
                              {errors.apellidos}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-5 form-group">
                          <label>Teléfono *</label>
                          <Field
                            name="telefono"
                            type="number"
                            className="form-control"
                          />
                          {errors.telefono && touched.telefono ? (
                            <div className="text-danger">{errors.telefono}</div>
                          ) : null}
                        </div>

                        <div className="col-2" />

                        <div className="col-5 form-group">
                          <label>Correo *</label>
                          <Field
                            name="correo"
                            type="email"
                            className="form-control"
                          />
                          {errors.correo && touched.correo ? (
                            <div className="text-danger">{errors.correo}</div>
                          ) : null}
                        </div>

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
              <div className="row">
                <div className="col-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={[
                      "Documento",
                      "Nombres",
                      "Apellidos",
                      "Telefono",
                      "Correo",
                      "Estado"
                    ]}
                    propiedades={[
                      "id_acudiente",
                      "nombres",
                      "apellidos",
                      "telefono",
                      "correo",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

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

export default acudiente;
