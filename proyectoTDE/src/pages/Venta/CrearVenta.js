import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, handleChange } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Card, Col, CardBody } from "reactstrap";
import Tabla from "./../../components/Tabla";
import VerVenta from "./VerVenta";
import moment from 'moment';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdDeleteForever,
  MdLoyalty
} from "react-icons/lib/md";

import { FaTrashO, FaTrash } from "react-icons/lib/fa";
import { TiEye } from "react-icons/lib/ti";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import SelectTipo from "./../../components/SelectTipo";
import { elementType } from "prop-types";
import { TiInfoLarge } from "react-icons/lib/ti";
import AyudaVenta from "./AyudaVenta";

const VentaSchema = Yup.object().shape({

  Cod_Tarjeta: Yup.string()
    .required('Campo Obligatorio')
});

class CrearVenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ventaM: [],
      ventas: [],
      productos: {},
      total: 0,
      cantidad: 0,
      parametro: "",
      ver_modal: false,
      ayuda_modal: false

    };

    this.handleChange = this.handleChange.bind(this);

  }

  venta = {

    Cod_Tarjeta: "",
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

  /////////////////////////LLAMAR PRODUCTOS//////////////////////////////////////////

  handleChange(event) {
    var { productos } = this.state;
    var id = event.target.value;
    axios({
      method: "post",
      url: `${URL}/venta/tabla/${event.target.value}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          let cant2 = document.getElementById("txt_cant_prod").value || 0;
          if (cant2 === 0) {
            cant2 = 1;
          }


          if (r.data.cantidad < parseInt(cant2)) {
            this.checkBreakpoint(this.props.breakpoint);
            if (!this.notificationSystem) {
              return;
            }

            this.notificationSystem.addNotification({
              title: <MdImportantDevices />,
              message: "La cantidad no disponible",
              level: "error"
            });

            document.getElementById("hola").reset();

            return;
          }

          this.setState({
            cantidad: r.data.cantidad

          });
          let sub = cant2 * r.data.precio;
          r.data.precio = sub;
          r.data.cantidad = cant2;

          let oo = productos[r.data.id_producto];


          if (oo == undefined) {
            if (!productos[r.data.id_producto]) {
              productos[r.data.id_producto] = {
                id_producto: r.data.id_producto,
                producto: r.data.producto,
                cantidad: Number(cant2),
                precio: r.data.precio
              }
            }
          } else {
            let valca = productos[r.data.id_producto].cantidad;

            if ((valca + cant2) <= this.state.cantidad) {
              if (!productos[r.data.id_producto]) {
                productos[r.data.id_producto] = {
                  id_producto: r.data.id_producto,
                  producto: r.data.producto,
                  cantidad: Number(cant2),
                  precio: r.data.precio
                }

              } else {
                productos[r.data.id_producto].cantidad += Number(cant2);
                productos[r.data.id_producto].precio += r.data.precio * r.data.cantidad;
              }
              this.setState({ productos, ayuda_modal: false });
              document.getElementById("hola").reset();
            } else {
              this.checkBreakpoint(this.props.breakpoint);
              if (!this.notificationSystem) {
                return;
              }

              this.notificationSystem.addNotification({
                title: <MdImportantDevices />,
                message: "La cantidad no disponible",
                level: "error"
              });

              document.getElementById("hola").reset();

              return;



            }
          }




          // this.state.productos.forEach(element => {
          //   if (id == element.id_producto) {
          //     console.log(id);
          //     console.log(element.id_producto);

          //     const t = this.state.productos.map(x => { return x.id_producto }).indexOf(element.id_producto);
          //     this.state.productos[t].cantidad = r.data.cantidad = r.data.cantidad + cant2;
          //     this.state.productos[t].precio = this.state.productos[t].cantidad * r.data.precio;


          //   } else {

          //     console.log("hola");

          //   }

          // });

          // let data = this.state.productos;


          // data.push(r.data);

          // this.setState({
          //   productos: data

          // });

          this.setState({
            total: this.state.total + r.data.precio
          });
          document.getElementById("hola").reset();




        } else {
          this.checkBreakpoint(this.props.breakpoint);
          if (!this.notificationSystem) {
            return;
          }




        }
      })
      .catch(error => {

      });
  }



  ////////////////////////////////////////////////////////////////////////////////////

  componentDidMount() {
    this.llamar_listar();

  }


  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true,
      ver_modal: false
    });
  };


  ///////////////////BOTON ELIMINAR/////////////////////////////////////////////////////

  boton(clase, title, id_producto) {
    return (
      <button
        onClick={() => {
          this.eliminar(id_producto);
        }}
        className={clase}
      >
        {title}
      </button>
    );
  }

  ////////////////////////////////MODAL DETALLE///////////////////////////////////

  modal_ver(id) {
    axios({
      method: "get",
      url: `${URL}/venta/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          ventaM: r.data,
          ver_modal: true,
          ayuda_modal: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  ///////////////////////////////////LISTAR PRODUCTOS/////////////////////////////////////

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
            <td>{e.precio}</td>
            <td> {this.boton("btn btn-danger", <FaTrash />, e.id_producto)}
            </td>
          </tr>
        );
      });
    }
    return prds;
  }

  //////////////////////////LLAMAR LISTAR/////////////////////////////////////////////

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/saludoventa`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let ventas = [];
      r.data.forEach(d => {
        const { id_venta, fecha, Monto_Venta, cod_tarjeta } = d;
        let obj = {
          id_venta,
          fecha,
          Monto_Venta,
          cod_tarjeta,
          botones: [
            <span> </span>,
            <button
              onClick={() => this.modal_ver(id_venta)}
              className="btn btn-secondary"
              style={{ backgroundColor: "#6c757d", borderColor: "gray" }}
            >
              <TiEye />
            </button>
          ]
        };
        ventas.push(obj);
      });
      this.setState({
        ventas
      });
    });
  }

  //////////////////////////LISTAR VENTAS/////////////////////////////////////////////

  listarventas() {
    if (this.state.ventas.length > 0) {
      return this.state.ventas.map((e, i) => (
        <tr key={i}>
          <td>{e.id_venta}</td>
          <td>{e.fecha}</td>
          <td>{e.Monto_Venta}</td>
          <td>{e.cod_tarjeta}</td>
          <td>{e.botones}</td>
        </tr>
      ));
    }
  }


  /////////////////////////////////GUARDAR///////////////////////////////////////////

  guardar(value) {
    this.setState({
      ayuda_modal: false,
      ver_modal: false
    });

    let data = [];
    let op = Object.keys(this.state.productos);
    op.forEach(k => {
      data.push(this.state.productos[k]);
    });

    let hola = value.Cod_Tarjeta;

    let po = {
      data,
      hola
    };

    axios({
      method: "post",
      url: `${URL}/venta`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: po
    }).then(respuesta => {
      let datos = respuesta.data;

      if (datos.ok) {
        this.checkBreakpoint(this.props.breakpoint);


        if (!this.notificationSystem) {
          return;
        }

        this.notificationSystem.addNotification({
          title: <MdImportantDevices />,
          message: datos.mensaje,
          level: "success"
        });

        this.state.productos = [];
        this.state.total = 0;
        this.llamar_listar();


        document.getElementById("hola").reset();


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
        }, 1000);

        document.getElementById("hola").reset();
      }
    });
  }

  ///////////////////////////////////ELIMINAR PRODUCTO///////////////////////////////////////////

  eliminar(id_producto) {
    this.setState({
      ayuda_modal: false,
      abrir_modal: false
    });
    var { productos } = this.state;
    let estadop = [];
    let conver = Object.keys(this.state.productos);
    conver.forEach(k => {
      estadop.push(this.state.productos[k]);
    });

    const pro = estadop.map(x => { return x.id_producto }).indexOf(id_producto);

    let prod = estadop;

    let to = estadop[pro].precio;


    prod.splice(pro, 1)

    this.setState({
      total: this.state.total - to
    });


    this.setState({
      productos: estadop
    });
  }

  render() {
    var data = this.state.ventas;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (v.ventaM.toLowerCase().includes(this.state.parametro)) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Formik
          initialValues={this.venta}
          validationSchema={VentaSchema}
          onSubmit={value => { this.guardar(value) }}
        >
          {({ errors, touched }) => (
            <Col md={12}>
              <div className="row">
                <div className="col-lg-4" />

                <div className="col-lg-4">
                  <center>
                    <h3>Venta</h3>
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
                            <label>Cantidad </label>
                            <Field
                              id="txt_cant_prod"
                              className="form-control"
                              value={this.cantidad}
                            />
                          </div>
                          <div className="col-5 form-group">

                            <label>Cod Producto</label>
                            <Field

                              id="id_producto"
                              className="form-control"
                              onChange={this.handleChange}
                              name="id_producto"
                            />
                            {errors.id_producto && touched.id_producto ? (
                              <div className="text-danger">
                                {errors.id_producto}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 form-group">
                            <label>Cod Tarjeta * </label>
                            <Field name="Cod_Tarjeta" type="number" className="form-control" />
                            {errors.Cod_Tarjeta && touched.Cod_Tarjeta ? (
                              <div className="text-danger">
                                {errors.Cod_Tarjeta}
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
                              Guardar
                            </button>
                          </div>

                        </div>
                        <div className="row">
                          {/* <div align="left" className="col-12 text">
                            <label>Los campos con (*) son obligatorios</label>
                          </div> */}
                        </div>
                      </div>
                    </Form>

                    <div className="col-6">



                      <span>Total : $ {this.state.total} </span>
                      <hr />
                      <table class="table">
                        <thead>
                          <tr>
                            <th>ID producto</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
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
              <span align="center"><h4 className="text">Ventas recientes</h4></span>
              <div className="row">


                <div className="col-12">
                  <hr />
                  <Tabla
                    datos={data}
                    botones
                    titulos={[
                      "# Venta",
                      "Fecha",
                      "Total",
                      "Cod Tarjeta",

                    ]}
                    propiedades={[
                      "id_venta",
                      "fecha",
                      "Monto_Venta",
                      "cod_tarjeta",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <VerVenta
          ver_modal={this.state.ver_modal}
          ventaM={this.state.ventaM}
        />

        <AyudaVenta ayuda_modal={this.state.ayuda_modal} />


        <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </div >
    );
  }
}
export default CrearVenta;
