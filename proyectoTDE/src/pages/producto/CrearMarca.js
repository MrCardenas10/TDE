import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, Col, CardBody, Input } from "reactstrap";
import { MdImportantDevices, MdSearch } from "react-icons/lib/md";
import { TiThumbsDown, TiThumbsUp } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { TiEdit } from "react-icons/lib/ti";
import ModalMarca from "./ModalMarca";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaMarca from "./AyudaMarca";

const MarcaSchema = Yup.object().shape({
  marca: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Campo obligatorio")
});

class CrearMarca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marcas: [],
      parametro: "",
      abrir_modal: false,
      ayuda_modal: false
    };
  }

  marca = {
    marca: ""
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
      url: `${URL}/marca`,
      headers: {
        Authorization: "bearer " + localStorage.token
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
      url: `${URL}/marca`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let marcas = [];
      r.data.forEach(d => {
        const { id_marca, marca, estado } = d;
        let obj = {
          id_marca,
          marca,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            estado === 1
              ? this.boton_estado(
                  "btn btn-danger bordered",
                  <TiThumbsDown />,
                  id_marca
                )
              : this.boton_estado("btn btn-success", <TiThumbsUp />, id_marca),
            <span> </span>,
            estado === 1 ? (
              <button
                onClick={() => this.modal_marca(id_marca)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null
          ]
        };
        marcas.push(obj);
      });
      this.setState({
        marcas
      });
    });
  }

  modal_marca(id) {
    axios({
      method: "get",
      url: `${URL}/marca/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          marca: r.data,
          abrir_modal: true,
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
      abrir_modal: false
    });
  };

  cambiar_estado(id) {
    this.setState({
      ayuda_modal: false,
      abrir_modal:false
    });
    axios({
      method: "delete",
      url: `${URL}/marca/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          this.state.abrir_modal = false;
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

  // editar(id) {
  //   this.props.history.push(`/marca/modificar/${id}`);
  // }

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
    if (this.state.marcas.length > 0) {
      return this.state.marcas.map((e, i) => (
        <tr key={i}>
          <br />
          <td>{e.id_marca}</td>
          <td>{e.marca}</td>
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
    var data = this.state.marcas;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.marca.toLowerCase().includes(this.state.parametro) ||
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
          initialValues={this.marca}
          validationSchema={MarcaSchema}
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
                    <h3>Marcas</h3>
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
                          <label>Marca *</label>
                          <Field
                            name="marca"
                            className="form-control"
                            onKeyPress={e => this.onChangeLetras(e)}
                          />
                          {errors.marca && touched.marca ? (
                            <div className="text-danger">{errors.marca}</div>
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
                    titulos={["Id", "Marca", "Estado"]}
                    propiedades={["id_marca", "marca", "estado", "botones"]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <ModalMarca
          abrir_modal={this.state.abrir_modal}
          marca={this.state.marca}
        />

        <AyudaMarca ayuda_modal={this.state.ayuda_modal} />

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

export default CrearMarca;
