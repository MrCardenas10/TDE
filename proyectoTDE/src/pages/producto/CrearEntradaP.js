import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, handleChange } from "formik";
// import Yup from "yup";
import { URL } from "./../../config/config";
import { Card, Col, CardBody } from "reactstrap";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
// import SelectTipo from "./../../components/SelectTipo";

// const VentaSchema = Yup.object().shape({
//     id_producto: Yup.string()
//         .required('Campo Obligatorio')
// });

class CrearEntradaP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: {},
      cantidad: "",
      entradap: {
        id_producto: "",
        cantidad: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  entradap = {
    cantidad: ""
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

  handleChange(event) {
    var { productos } = this.state;
    let valCant = document.getElementById("txt_cant_prod").value;
    axios({
      method: "post",
      url: `${URL}/entrada/tabla/${event.target.value}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          if (!productos[r.data.id_producto]) {
            productos[r.data.id_producto] = {
              id_producto: r.data.id_producto,
              producto: r.data.producto,
              cantidad: Number(valCant)
            };
          } else {
            productos[r.data.id_producto].cantidad += Number(valCant);
          }
          this.setState({ productos });
          document.getElementById("hola").reset();
        } else if (r.ok === false) {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: r.error,
            level: "error"
          });
          document.getElementById("hola").reset();
        }
        /*                if (r.ok) {
                      var cant2 = Number(document.getElementById("txt_cant_prod").value) || 0;
                      if (cant2 === 0) {
                        cant2 = 1;
                      }

          if (cant2 < 0) {
            if (!this.notificationSystem) {
              return;
            }

            this.notificationSystem.addNotification({
              title: <MdImportantDevices />,
              message: "La cantidad no esta disponible",
              level: "error"
            });

            document.getElementById("id_producto").reset();
            document.getElementById("txt_cant_prod").reset();
            document.getElementById("hola").reset();

            return;
          }
          // if (cant2 === 0) {
          //   cant2 = 1;
          // }

          document.getElementById("hola").reset();

          r.data.cantidad = cant2;
          let data = this.state.productos;

          data.push(r.data);

          // this.setState({
          //   productos: data,
          //   entradap:{
          //     id_producto:"",
          //     cantidad:""
          //   }

          // });
          setTimeout(() => {
            this.setState({
              productos: data,
              entradap: {
                id_producto: "",
                cantidad: ""
              }
            });
          }, 100);
          this.entradap.cantidad = "";

          document.getElementById("id_producto").reset();
          document.getElementById("txt_cant_prod").reset();
        } else if (r.ok === false) {
          document.getElementById("hola").reset();
          this.entradap.cantidad = "";
          document.getElementById("id_producto").reset();
          document.getElementById("txt_cant_prod").reset();
        }*/
      })
      .catch(error => {
        console.log(error);
      });
  }

  listar() {
    let prds = [];
    var prods = Object.keys(this.state.productos);
    if (prods.length > 0) {
      prods.forEach((k, i) => {
        let e = this.state.productos[k];
        prds.push(
          <tr key={i}>
            <td>{e.id_producto}</td>
            <td>{e.producto}</td>
            <td>{e.cantidad}</td>
          </tr>
        );
      });
    }
    return prds;
  }

  guardar() {
    let data = [];
    let op = Object.keys(this.state.productos);
    op.forEach(k => {
      data.push(this.state.productos[k]);
    });
    axios({
      method: "post",
      url: `${URL}/entrada`,
      headers: {
        Authorization: "bearer" + localStorage.token
      },
      data: data
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        document.getElementById("hola").reset();

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
      } else {
        document.getElementById("hola").reset();

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
      }
    });
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={this.entradap}
          // validationSchema={VentaSchema}
          onSubmit={value => {
            this.guardar();
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Col md={12}>
              <div align="center">
                <h3 className="align-center">Entrada de Productos</h3>
              </div>
              <Card className="flex-row">
                <CardBody>
                  <div className="row">
                    <Form id="hola">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-5 form-group">
                            <label>Cod Producto</label>
                            <Field
                              onKeyPress={e => this.onChangeNumero(e)}
                              onChange={this.handleChange}
                              name="id_producto"
                              id="id_producto"
                              className="form-control"
                            />
                            {errors.id_producto && touched.id_producto ? (
                              <div className="text-danger">
                                {errors.id_producto}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-5 form-group">
                            <label>Cantidad</label>
                            <Field
                              onKeyPress={e => this.onChangeNumero(e)}
                              id="txt_cant_prod"
                              name="txt_cant_prod"
                              className="form-control"
                              value={this.cantidad}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2 form-group">
                            <button
                              type="submit"
                              className="btn btn-success float-center  "
                            >
                              Aceptar
                            </button>
                          </div>
                          <div className="col-2 form-group" />
                          <div className="col-2 form-group">
                            <button
                              type="button"
                              className="btn btn-success float-center  "
                            >
                              Agregar
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>

                    <div className="col-6">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID producto</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                          </tr>
                        </thead>
                        <tbody id="tblProductos">{this.listar()}</tbody>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
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
export default CrearEntradaP;
