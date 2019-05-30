import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, handleChange } from "formik";
import Yup from "yup";
import { URL } from "./../../config/config";
import { Card, Col, CardBody } from "reactstrap";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import SelectTipo from "./../../components/SelectTipo";

// const VentaSchema = Yup.object().shape({
//     id_producto: Yup.string()
//         .required('Campo Obligatorio')
// });

class CrearVenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      cantidad: "",
      venta: {
        id_producto: "",
        cantidad: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  venta = {
    id_producto: "",
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

  handleChange(event) {
    console.log(event.target.value);
    axios({
      method: "post",
      url: `${URL}/venta/tabla/${event.target.value}`,
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          let cant2 = document.getElementById("txt_cant_prod").value || 0;
          console.log(r.data.cantidad, cant2);
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
          if (cant2 === 0) {
            cant2 = 1;
          }

          let sub = cant2 * r.data.precio;
          r.data.precio = sub;
          r.data.cantidad = cant2;

          let data = this.state.productos;

          data.push(r.data);

          this.setState({
            productos: data
          });

          document.getElementById("hola").reset();
        } else {
          this.checkBreakpoint(this.props.breakpoint);
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  listar() {
    console.log(this.state.productos);
    if (this.state.productos.length > 0) {
      return this.state.productos.map((e, i) => (
        <tr key={i}>
          <td>{e.id_producto}</td>
          <td>{e.producto}</td>
          <td>{e.cantidad}</td>
          <td>{e.precio}</td>
        </tr>
      ));
    }
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={this.venta}
          // validationSchema={VentaSchema}
          onSubmit={value => {}}
        >
          {({ errors, touched, values, handleChange }) => (
            <Col md={12}>
              <div align="center">
                <h3 className="align-center">Ventas</h3>
              </div>
              <Card className="flex-row">
                <CardBody>
                  <div className="row">
                    <Form id="hola">
                      <div className="col-5">
                        <div className="row">
                          <div className="col-6 form-group">
                            <label>Cod Producto</label>
                            <Field
                              onChange={this.handleChange}
                              name="id_producto"
                              className="form-control"
                            />
                            {errors.id_producto && touched.id_producto ? (
                              <div className="text-danger">
                                {errors.id_producto}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-6 form-group">
                            <label>Cantidad </label>
                            <Field
                              id="txt_cant_prod"
                              className="form-control"
                              value={this.cantidad}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 form-group">
                            <label>Cod Tarjeta</label>
                            <Field
                              name="Cod_Tarjeta"
                              className="form-control"
                            />
                            {errors.Cod_Tarjeta && touched.Cod_Tarjeta ? (
                              <div className="text-danger">
                                {errors.Cod_Tarjeta}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-6 form-group">
                            <label>Tipo de Pago </label>
                            <SelectTipo />
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
                        </div>
                      </div>
                    </Form>

                    <div className="col-4">
                      <p>
                        <b>Total: </b>
                      </p>
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
export default CrearVenta;
