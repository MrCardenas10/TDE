import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import PersonaSelect from "./../../components/PersonaSelect";
import VisitanteSelect from "./../../components/VisitanteSelect";
import { Card, CardBody, Col, Input } from "reactstrap";
import Tabla from "./../../components/Tabla";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdSearch
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const EntradavSchema = Yup.object().shape({
  motivo: Yup.string()
    .min(2, "Por favor explique mejor el motivo de su visita")
    .max(250, "Sea más sencillo en el motivo de la visita")
    .required("Required"),
  id_visitante: Yup.string().required("Required")
  // id_persona: Yup.string().required("Required")
});

export default class Entrada extends Component {
  entrada2 = {
    motivo: "",
    id_visitante: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      entrada: [],
      parametro: ""
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

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/entradavisitante`,
      headers: {
        Authorization: "bearer" + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let entrada = [];
      r.data.forEach(d => {
        const {
          fecha_entrada_visitante,
          motivo,
          nombre_visitante,
          nombres,
          apellido_visitante,
          id_entrada_visitante
        } = d;
        entrada.push({
          id_entrada_visitante,
          fecha_entrada_visitante,
          motivo,
          nombre_visitante,
          apellido_visitante,
          nombres
        });
      });
      this.setState({
        entrada
      });
    });
  }

  componentDidMount() {
    this.llamar_listar();
  }

  listar() {
    if (this.state.entrada.length > 0) {
      return this.state.entrada.map((e, i) => (
        <tr key={i}>
          <td>{e.fecha_entrada_visitante}</td>
          <td>{e.motivo}</td>
          <td>{e.nombre_visitante}</td>
          <td>{e.apellido_visitante}</td>
          <td>{e.nombres}</td>
        </tr>
      ));
    }
  }

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/entradavisitante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: {
        motivo: value.motivo,
        id_visitante: value.id_visitante,
        id_persona: localStorage.id_persona
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        document.getElementById("registro").reset();
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
        console.log(
          value.motivo +
            " " +
            value.id_visitante +
            " " +
            localStorage.id_persona
        );
      }
    });
  }

  render() {
    var data = this.state.entrada;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.motivo.toLowerCase().includes(this.state.parametro) ||
          v.nombre_visitante.toLowerCase().includes(this.state.parametro) ||
          v.apellido_visitante.toLowerCase().includes(this.state.parametro) ||
          v.nombres.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <br />
        <br />
        <center>
          <h1>Registrar Entrada Visitante</h1>
        </center>
        <br />
        <br />

        <Formik
          initialValues={this.entrada2}
          validationSchema={EntradavSchema}
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
                      <div className="col-2 form-group" />

                      <div className="col-4 form-group">
                        <label>Motivo</label>
                        <Field name="motivo" className="form-control" />
                        {errors.motivo && touched.motivo ? (
                          <div className="text-danger">{errors.motivo}</div>
                        ) : null}
                      </div>
                      <div className="col-4 form-group">
                        <label>Numero del Visitante</label>
                        <VisitanteSelect />
                        {errors.id_visitante && touched.id_visitante ? (
                          <div className="text-danger">
                            {errors.id_visitante}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-2 form-group" />

                      {/* <div className="col-4 form-group">
                        <label>Numero del Vigilante</label>
                        <PersonaSelect />
                        {errors.id_persona && values.id_persona === "" ? (
                          <div className="text-danger">{errors.id_persona}</div>
                        ) : null}
                      </div> */}
                    </div>
                    <div className="row">
                      <div className="col-4 from-group" />
                      <div className="col-4 from-group">
                        <br />
                        <center>
                          <button type="submit" className="btn btn-success">
                            Entrar
                          </button>
                        </center>
                      </div>
                      <div className="col-4 from-group" />
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
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
                    <br />
                    <div className="row">
                      <div className="col-12">
                        <Tabla
                          datos={data}
                          titulos={[
                            "Fecha Entrada",
                            "Motivo",
                            "Nombre Visitante",
                            "Apellido Visitante",
                            "Vigilante"
                          ]}
                          propiedades={[
                            "fecha_entrada_visitante",
                            "motivo",
                            "nombre_visitante",
                            "apellido_visitante",
                            "nombres"
                          ]}
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                  </CardBody>
                </Card>
              </Col>
            </Form>
          )}
        </Formik>

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
