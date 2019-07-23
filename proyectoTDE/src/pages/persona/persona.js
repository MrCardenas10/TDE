import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ModalPersona from "./ModalPersona";
import VerPersona from "./VerPersona";
import RolSelect from "./../../components/RolSelect";
import AcudienteSelect from "./../../components/AcudienteSelect";
import SelectTipoDoc from "./../../components/SelectTipoDoc";
import { URL } from "./../../config/config";
import { Card, Col, CardBody, Input } from "reactstrap";
import {
  MdImportantDevices,
  MdSentimentVeryDissatisfied
} from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp, TiEyeOutline } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import "bootstrap/dist/css/bootstrap.min.css";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaPersona from "./AyudaPersona";

import { TiEdit } from "react-icons/lib/ti";
import {
  // MdCardGiftcard,
  MdSearch
} from "react-icons/lib/md";

const personaSchema = Yup.object().shape({
  id_persona: Yup.string().required("Campo Obligatorio"),
  nombres: Yup.string().required("Campo Obligatorio"),
  apellidos: Yup.string().required("Campo Obligatorio"),
  email: Yup.string().required("Campo Obligatorio"),
  password: Yup.string().required("Campo Obligatorio"),
  genero: Yup.string().required("Campo Obligatorio"),
  telefono: Yup.string().required("Campo Obligatorio"),
  rol: Yup.string().required("Campo Obligatorio"),
  id_tipo_documento: Yup.string().required("Campo Obligatorio")
});

class persona extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personas: [],
      persona: [],
      parametro: "",
      abrir_modal: false,
      verPersona: false,
      ayuda_modal: false
    };
  }

  persona2 = {
    id_persona: 0,
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    passwordcon: "",
    telefono: "",
    genero: "",
    rol: "",
    id_tipo_documento: "",
    numero: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
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
      verPersona: false,
      abrir_modal: false,
      ayuda_modal: false
    });
    console.log("hola");
    axios({
      method: "post",
      url: `${URL}/Persona`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      console.log(datos);
      if (datos.ok) {
        document.getElementById("registro").reset();
        this.checkBreakpoint(this.props.breakpoint);

        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: datos.mensaje,
          level: "success"
        });

        this.llamar_listar();
      } else {
        this.checkBreakpoint(this.props.breakpoint);

        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdSentimentVeryDissatisfied />,
          message: "Problemas con el registro",
          level: "error"
        });

        document.getElementById("registro").reset();
      }
    });
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/Persona`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;

      let personas = [];
      r.data.forEach(d => {
        const { id_persona, nombres, apellidos, estado, rol } = d;
        let obj = {
          id_persona,
          nombres,
          apellidos,
          estado: estado === 1 ? "Activo" : "Inactivo",
          rol,
          botones: [
            estado === 1
              ? this.boton_estado(
                "btn btn-danger bordered",
                <TiThumbsDown />,
                id_persona
              )
              : this.boton_estado(
                "btn btn-success",
                <TiThumbsUp />,
                id_persona
              ),
            <span> </span>,
            estado === 1 ? (
              <button
                onClick={() => this.modal_persona(id_persona)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null,
            <span> </span>,
            <button
              onClick={() => this.ver_persona(id_persona)}
              className="btn btn-secondary"
              style={{ backgroundColor: "#6c757d", borderColor: "gray" }}
            >
              <TiEyeOutline />
            </button>
          ]
        };
        personas.push(obj);
      });
      this.setState({
        personas
      });
    });
  }

  componentDidMount() {
    this.llamar_listar();
  }

  modal_persona(id) {
    axios({
      method: "get",
      url: `${URL}/Persona/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          persona: r.data,
          abrir_modal: true,
          verPersona: false,
          ayuda_modal: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  ver_persona(id) {
    axios({
      method: "get",
      url: `${URL}/Persona/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          persona: r.data,
          verPersona: true,
          abrir_modal: false,
          ayuda_modal: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true,
      abrir_modal: false,
      verPersona: false
    });
  };

  editar(id_persona) {
    this.props.history.push(`/persona/modificar/${id_persona}`);
  }

  cambiar_estado(id_persona) {
    this.setState({
      verPersona: false,
      abrir_modal: false,
      ayuda_modal: false
    });
    axios({
      method: "delete",
      url: `${URL}/Persona/${id_persona}`,
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

  boton_estado(clase, title, id_persona) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id_persona);
        }}
        className={clase}
      >
        {title}
      </button>
    );
  }

  listar() {
    if (this.state.personas.length > 0) {
      return this.state.personas.map((e, i) => (
        <tr key={i}>
          <td>{e.id_persona}</td>
          <td>{e.nombres}</td>
          <td>{e.apellidos}</td>
          <td>{e.estado}</td>
          <td>{e.rol}</td>
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
    var data = this.state.personas;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.nombres.toLowerCase().includes(this.state.parametro) ||
          v.apellidos.toLowerCase().includes(this.state.parametro) ||
          v.rol.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Formik
          initialValues={this.persona2}
          validationSchema={personaSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <Col md={12}>
                <div className="row">
                  <div className="col-lg-4" />

                  <div className="col-lg-4">
                    <center>
                      <h3>Usuarios</h3>
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
                <Card className="flex-row">
                  <CardBody>
                    <div className="row">
                      <div className="col-4 form-group">
                        <label>Documento *</label>
                        <Field
                          name="id_persona"
                          type="number"
                          className="form-control"
                        />
                        {errors.id_persona && touched.id_persona ? (
                          <div className="text-danger">{errors.id_persona}</div>
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
                          <div className="text-danger">{errors.apellidos}</div>
                        ) : null}
                      </div>
                      <div className="col-4 form-group">
                        <label>Correo *</label>
                        <Field name="email" className="form-control" />
                        {errors.email && touched.email ? (
                          <div className="text-danger">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="col-4 form-group">
                        <label>Clave *</label>
                        <Field
                          name="password"
                          type="password"
                          className="form-control"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-danger">{errors.password}</div>
                        ) : null}
                      </div>

                      <div className="col-4 form-group">
                        <label>Confirmar clave *</label>
                        <Field
                          name="passwordcon"
                          type="password"
                          className="form-control"
                        />
                        {values.password != values.passwordcon ? (
                          <div className="text-danger">
                            Las contraseñas no son iguales{" "}
                          </div>
                        ) : (
                            ""
                          )}
                        {errors.passwordcon && touched.passwordcon ? (
                          <div className="text-danger">
                            {errors.passwordcon}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-4 form-group">
                        <label>Teléfono *</label>
                        <Field name="telefono" className="form-control" />
                        {errors.telefono && touched.telefono ? (
                          <div className="text-danger">{errors.telefono}</div>
                        ) : null}
                      </div>
                      <div className="col-4 form-group">
                        <label>Género *</label>
                        <Field
                          component="select"
                          name="genero"
                          className="form-control "
                        >
                          <option value=""> Género </option>
                          <option>Femenino</option>
                          <option>Masculino</option>
                        </Field>
                        {errors.genero && touched.genero ? (
                          <div className="text-danger">{errors.genero}</div>
                        ) : null}
                      </div>
                      <div className="col-4 form-group">
                        <label>Rol *</label>
                        <RolSelect />
                        {errors.rol && touched.rol ? (
                          <div className="text-danger">{errors.rol}</div>
                        ) : null}
                      </div>

                      <div className="col-4 form-group">
                        <label>Tipo Documento *</label>
                        <SelectTipoDoc />
                        {errors.id_tipo_documento &&
                          touched.id_tipo_documento ? (
                            <div className="text-danger">
                              {errors.id_tipo_documento}
                            </div>
                          ) : null}
                      </div>

                      <div className="col-4 form-group" />
                      <div className="col-4 form-group">
                        {values.rol == 1 ? <label>Acudiente *</label> : ""}
                        {values.rol == 1 ? <AcudienteSelect /> : ""}
                      </div>

                      <div className="col-4 form-group" />
                    </div>
                    <div className="row">
                      <div className="col-4 from-group" />
                      <div className="col-4 from-group">
                        <center>
                          <button type="submit" className="btn btn-success">
                            Crear
                          </button>
                        </center>
                      </div>
                    </div>
                    <div className="row">
                      <div align="right">
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
                <div className="col-lg-4" />
                <div className="col-lg-4" />
                <div className="col-lg-4">
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
                <div className="col-lg-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={[
                      "Documento",
                      "Nombres",
                      "Apellidos",
                      "Rol",
                      "Estado"
                    ]}
                    propiedades={[
                      "id_persona",
                      "nombres",
                      "apellidos",
                      "rol",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <br />

        <ModalPersona
          abrir_modal={this.state.abrir_modal}
          persona={this.state.persona}
        />

        <VerPersona
          verPersona={this.state.verPersona}
          persona={this.state.persona}
        />

        <AyudaPersona ayuda_modal={this.state.ayuda_modal} />

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

export default persona;
