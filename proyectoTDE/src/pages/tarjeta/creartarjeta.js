import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { URL } from "./../../config/config";
import EstudianteSelect from "./../../components/EstudianteSelect";
import { Card, Col, CardBody } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { TiEdit } from "react-icons/lib/ti";

const TarjetaSchema = Yup.object().shape({
  id_persona: Yup.string().required("Required"),
  cod_tarjeta: Yup.string().required("Required")
});

class creartarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarjetas: [],
      parametro: ""
    };
  }

  tarjeta = {
    cod_tarjeta: "",
    id_estudiante: ""
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
      url: `${URL}/Tarjeta`,
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

  //LISTAR
  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/Tarjeta`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let tarjetas = [];
      r.data.forEach(d => {
        const {
          cod_tarjeta,
          saldo,
          estado,
          id_persona,
          nombres,
          apellidos,
          email
        } = d;
        let obj = {
          cod_tarjeta,
          saldo,
          estado: estado === 1 ? "Activo" : "Inactivo",
          id_persona,
          nombres,
          apellidos,
          email,
          botones: [
            estado === 1
              ? this.boton_estado(
                  "btn btn-danger bordered",
                  <TiThumbsDown />,
                  cod_tarjeta
                )
              : this.boton_estado(
                  "btn btn-success",
                  <TiThumbsUp />,
                  cod_tarjeta
                ),
            <span> </span>
          ]
        };
        tarjetas.push(obj);
      });
      this.setState({
        tarjetas
      });
    });
  }

  cambiar_estado(id) {
    axios({
      method: "delete",
      url: `${URL}/Tarjeta/${id}`,
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
        alert("Error al listar");
      });
  }

  editar(id) {
    this.props.history.push(`/Tarjeta/modificar/${id}`);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  boton_estado(clase, title, id) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id);
        }}
        className={clase}
      >
        {title}
      </button>
    );
  }

  listar() {
    if (this.state.tarjetas.length > 0) {
      return this.state.tarjetas.map((e, i) => (
        <tr key={i}>
          <td>{e.cod_tarjeta}</td>
          <td>{e.saldo}</td>
          <td>{e.id_persona}</td>
          <td>{e.nombres}</td>
          <td>{e.apellidos}</td>
          <td>{e.email}</td>
          <td>{e.estado}</td>
          <td>{e.botones}</td>
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
    var data = this.state.tarjetas;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.tarjeta.toLowerCase().includes(this.state.parametro) ||
          v.id_persona.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }

    return (
      <div>
        <Formik
          initialValues={this.tarjeta}
          validationSchema={TarjetaSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <div align="center">
                <h3>Tarjetas</h3>
              </div>
              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div align="center" className="col-6 form-group">
                          <label>Cod Tarjeta *</label>
                          <Field name="cod_tarjeta" className="form-control" />
                          {errors.cod_tarjeta && touched.cod_tarjeta ? (
                            <div className="text-danger">
                              {errors.cod_tarjeta}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-4 form-group">
                          <label>Estudiante *</label>
                          <EstudianteSelect />
                          {errors.id_persona && values.id_persona === "" ? (
                            <div className="text-danger">
                              {errors.id_persona}
                            </div>
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
                      "Cod_Tarjeta",
                      "Saldo",
                      "Doc Estudiante",
                      "Nombres",
                      "Apellidos",
                      "Correo",
                      "Estado"
                    ]}
                    propiedades={[
                      "cod_tarjeta",
                      "saldo",
                      "id_persona",
                      "nombres",
                      "apellidos",
                      "email",
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

export default creartarjeta;
