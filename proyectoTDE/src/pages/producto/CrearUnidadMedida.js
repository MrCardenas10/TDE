import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, CardBody, Col } from "reactstrap";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import Tabla from "./../../components/Tabla";
import { MdImportantDevices } from "react-icons/lib/md";
import ModalUnidadMedida from "./ModalUnidadMedida";
import { TiEdit } from "react-icons/lib/ti";

const UnidadSchema = Yup.object().shape({
  unidad_medida: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

class CrearUnidadMedida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unidades: [],
      parametro: "",
      abrir_modal: false,
      unidad_medida: []
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
      url: `${URL}/unidadmedida`,
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
      url: `${URL}/unidadmedida`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let unidades = [];
      r.data.forEach(d => {
        const { id_unidad_medida, unidad_medida } = d;
        let obj = {
          unidad_medida,
          botones: [
            <button
              onClick={() => this.modal_unidad(id_unidad_medida)}
              className="btn btn-info"
            >
              <TiEdit />
            </button>
          ]
        };
        unidades.push(obj);
      });
      this.setState({
        unidades
      });
    });
  }

  modal_unidad(id) {
    axios({
      method: "get",
      url: `${URL}/unidadmedida/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          unidad_medida: r.data,
          abrir_modal: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  editar(id) {
    this.props.history.push(`/unidadmedida/modificar/${id}`);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  listar() {
    if (this.state.unidades.length > 0) {
      return this.state.unidades.map((e, i) => (
        <tr key={i}>
          <br />
          <td>{e.unidad_medida}</td>
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
    var data = this.state.unidades;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (v.unidadmedida.toLowerCase().includes(this.state.parametro)) {
          ds.push(v);
        }
      });
      data = ds;
    }

    return (
      <div>
        <Formik
          initialValues={this.unidad}
          validationSchema={UnidadSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched }) => (
            <Form id="limpiar_campos">
              <div align="center">
                <h3>Unidad de Medida</h3>
              </div>
              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div className="col-3 form-group" />
                        <div align="center" className="col-6 form-group">
                          <label>Unidad de Medida * </label>
                          <Field onKeyPress={(e) => this.onChangeLetras(e)}
                            name="unidad_medida"
                            className="form-control"
                          />
                          {errors.unidad_medida && touched.unidad_medida ? (
                            <div className="text-danger">
                              {errors.unidad_medida}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-3 form-group" />

                        <div align="center" className="col-12 form-group">
                          <button
                            type="submit"
                            className="btn btn-success float-center"
                          >
                            Crear
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
                    titulos={["Unidad de medida"]}
                    propiedades={["unidad_medida", "botones"]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <ModalUnidadMedida
          abrir_modal={this.state.abrir_modal}
          unidad_medida={this.state.unidad_medida}
        />

        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </div>
      // <div>
      //   <Formik
      //     initialValues={this.unidad}
      //     validationSchema={UnidadSchema}
      //     onSubmit={value => {
      //       this.guardar(value);
      //     }}
      //   >
      //     {({ errors, touched }) => (
      //       <Form id="registro">
      //         <div align="center">
      //           <h3>Unidades de Medida </h3>
      //         </div>
      //         <div className="content">
      //           <Col md={12}>
      //             <Card className="flex-row">
      //               <CardBody>
      //                 <div className="row">
      //                   <div className="col-3 form-group">
      //                     <div align="center" className="col-6 form-group">
      //                       <label>Unidad de Medida *</label>
      //                       <Field
      //                         name="unidad_medida"
      //                         className="form-control"
      //                       />
      //                       {errors.unidad_medida && touched.unidad_medida ? (
      //                         <div className="text-danger">
      //                           {errors.unidad_medida}
      //                         </div>
      //                       ) : null}
      //                     </div>
      //                     <div className="col-3 form-group" />
      //                     <div align="center" className="col-12 form-group">
      //                       <button
      //                         type="submit"
      //                         className="btn btn-success float-center"
      //                       >
      //                         Crear
      //                       </button>
      //                     </div>
      //                   </div>
      //                   <div className="col-4" />
      //                   <div align="right" className="col-12 text-red">
      //                     <label>Los campos con (*) son obligatorios</label>
      //                   </div>
      //                 </div>
      //               </CardBody>
      //             </Card>
      //           </Col>
      //         </div>
      //       </Form>
      //     )}
      //   </Formik>
      //   <br />

      //   <Col md={12}>
      //     <Card className="flex-row">
      //       <CardBody>
      //         <br />

      //         <div className="row">
      //           <div className="col-12">
      //             <Tabla
      //               datos={data}
      //               botones
      //               titulos={["Unidad de medida"]}
      //               propiedades={["unidad_medida", "botones"]}
      //             />
      //           </div>
      //         </div>
      //       </CardBody>
      //     </Card>
      //   </Col>
      //   <ModalUnidadMedida
      //     abrir_modal={this.state.abrir_modal}
      //     unidad_medida={this.state.unidad_medida}
      //   />
      //   <NotificationSystem
      //     dismissible={false}
      //     ref={notificationSystem =>
      //       (this.notificationSystem = notificationSystem)
      //     }
      //     style={NOTIFICATION_SYSTEM_STYLE}
      //   />
      // </div>
    );
  }
}

export default CrearUnidadMedida;
