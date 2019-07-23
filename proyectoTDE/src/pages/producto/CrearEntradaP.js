import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, handleChange } from "formik";
// import Yup from "yup";
import { URL } from "./../../config/config";
import Tabla from "./../../components/Tabla";
import { Card, CardBody, Col, Input } from "reactstrap";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdSearch
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaEntradaP from "./AyudaEntradaP";
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
      entrada: [],
      cantidad: "",
      entradap: {
        id_producto: "",
        cantidad: ""
      },
      parametro: "",
      ayuda_modal: false
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
          this.setState({ productos, ayuda_modal: false });
          document.getElementById("hola").reset();
        } else if (r.ok === false) {
          if (!this.notificationSystem) {
            return;
          }

          // this.notificationSystem.addNotification({
          //   title: <MdImportantDevices />,
          //   message: r.error,
          //   level: "error"
          // });
          // document.getElementById("hola").reset();
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

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/entrada`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let entrada = [];
      r.data.forEach(d => {
        const { cantidad_producto, fecha_entrada, producto } = d;
        let obj = {
          cantidad_producto,
          fecha_entrada,
          producto
        };
        entrada.push(obj);
      });
      this.setState({
        entrada
      });
    });
  }

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true
    });
  };

  componentDidMount() {
    this.llamar_listar();
  }

  listare() {
    if (this.state.entrada.length > 0) {
      return this.state.entrada.map((e, i) => (
        <tr key={i}>
          <br />
          <td>{e.cantidad_producto}</td>
          <td>{e.producto}</td>
          <td>{e.fecha_entrada}</td>
          <br />
        </tr>
      ));
    }
  }

  guardar() {
    this.setState({
      ayuda_modal: false
    });
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
        document.getElementById("hola").reset();
        this.llamar_listar();
        this.state.productos = [];
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
      }
    });
  }

  render() {
    var data = this.state.entrada;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.producto.toLowerCase().includes(this.state.parametro) ||
          v.fecha_entrada.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }

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
              <div className="row">
                <div className="col-lg-4" />

                <div className="col-lg-4">
                  <center>
                    <h3>Entrada Productos</h3>
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
                            {errors.txt_cant_prod && touched.txt_cant_prod ? (
                              <div className="text-danger">
                                {errors.txt_cant_prod}
                              </div>
                            ) : null}
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
        <br />

        <Col md={12}>
          <Card className="demo-icons">
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
                    titulos={["Producto", "Cantidad", "Fecha de Entrada"]}
                    propiedades={[
                      "producto",
                      "cantidad_producto",
                      "fecha_entrada"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <AyudaEntradaP ayuda_modal={this.state.ayuda_modal} />

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
