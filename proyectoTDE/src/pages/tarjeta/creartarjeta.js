import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { URL } from "./../../config/config";
import EstudianteSelect from "./../../components/EstudianteSelect";
import { Card, Col, CardBody, Input } from "reactstrap";
import { MdImportantDevices } from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { MdSearch } from "react-icons/lib/md";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaTarjeta from "./AyudaTarjeta";

const TarjetaSchema = Yup.object().shape({
  id_persona: Yup.string().required("Campo obligatorio"),
  cod_tarjeta: Yup.string().required("Campo obligatorio")
});

class creartarjeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarjetas: [],
      parametro: "",
      ayuda_modal: false
    };
  }

  tarjeta = {
    cod_tarjeta: "",
    id_persona: ""
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
    this.setState({
      ayuda_modal: false
    });
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
          apellidos
        } = d;
        let obj = {
          cod_tarjeta,
          saldo,
          estado: estado === 1 ? "Activo" : "Inactivo",
          id_persona,
          nombres,
          apellidos,

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

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true
    });
  };

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
        this.setState({
          ayuda_modal: false
        });
        if (r.ok) {
          this.checkBreakpoint(this.props.breakpoint);

          setTimeout(() => {
            if (!this.notificationSystem) {
              return;
            }

            this.notificationSystem.addNotification({
              title: <MdImportantDevices />,
              message: "Se cambió el estado con éxito",
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
          v.apellidos.toLowerCase().includes(this.state.parametro) ||
          v.estado.toLowerCase().includes(this.state.parametro) ||
          v.nombres.toLowerCase().includes(this.state.parametro)
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
              <div className="row">
                <div className="col-lg-4" />

                <div className="col-lg-4">
                  <center>
                    <h3>Tarjetas</h3>
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
                        <div align="center" className="col-6 form-group">
                          <label>Cod Tarjeta *</label>
                          <Field name="cod_tarjeta" className="form-control" />
                          {errors.cod_tarjeta && touched.cod_tarjeta ? (
                            <div className="text-danger">
                              {errors.cod_tarjeta}
                            </div>
                          ) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Estudiante *</label>
                          <EstudianteSelect />
                          {errors.id_persona && touched.id_persona ? (
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
                    titulos={[
                      "Cod_Tarjeta",
                      "Saldo",
                      "Doc Estudiante",
                      "Nombres",
                      "Apellidos",

                      "Estado"
                    ]}
                    propiedades={[
                      "cod_tarjeta",
                      "saldo",
                      "id_persona",
                      "nombres",
                      "apellidos",

                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <AyudaTarjeta ayuda_modal={this.state.ayuda_modal} />

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
