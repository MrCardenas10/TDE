import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Card, Col, CardBody } from "reactstrap";
import moment from "moment";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty
} from "react-icons/lib/md";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";

const RecargaSchema = Yup.object().shape({
  monto: Yup.string().required("Campo Obligatorio"),
  cod_tarjeta: Yup.string().required("Campo Obligatorio")
});

class CrearRecarga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recargas: []
    };

    this.handleChange = this.handleChange.bind(this); // en el contructor se crea esto que es para poder utilizar el onChange
  }

  recarga = {
    monto: "",
    cod_tarjeta: ""
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

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }
    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
  }

  Numeros(e) {
    //Solo numeros
    var out = "";
    var filtro = "1234567890"; //Caracteres validos

    //Recorrer el texto y verificar si el caracter se encuentra en la lista de validos
    for (var i = 0; i < e.length; i++)
      if (filtro.indexOf(e.charAt(i)) != -1)
        //Se añaden a la salida los caracteres validos
        out += e.charAt(i);

    //Retornar valor filtrado
    return out;
  }

  handleChange() {
    let ini = document.getElementById("fecha_inicio").value || 0;
    let fi = document.getElementById("fecha_fin").value || 0;
    let inicio = moment(ini).format("YYYY-MM-DD");
    let fin = moment(fi).format("YYYY-MM-DD");
    if (fin === "1969-12-31") {
      this.llamar_listar();
    }
    console.log(fin);
    axios({
      method: "get",
      url: `${URL}/recarga/show/${inicio}/${fin}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          recargas: r.data
        });
      })
      .catch(error => {
        alert("Error");
      });
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/recarga`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          recargas: r.data
        });
      })
      .catch(error => {
        alert("Error");
      });
  }

  componentDidMount() {
    this.llamar_listar();
  }

  listar() {
    if (this.state.recargas.length > 0) {
      return this.state.recargas.map((e, i) => (
        <tr key={i}>
          <td>{e.id_recarga}</td>
          <td>{e.fecha}</td>
          <td>{e.monto}</td>
          <td>{e.cod_tarjeta}</td>
        </tr>
      ));
    }
  }

  cargando() {
    return (
      <tr>
        <td colSpan="6" className="text-center">
          <img src="/ajax-loader.gif" />
        </td>
      </tr>
    );
  }

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/recarga`,
      headers: {
        Authorization: "bearer " + localStorage.token
      },
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;

      console.log(datos);

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
        }, 1000);

        document.getElementById("registro").reset();

        this.llamar_listar();
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

        document.getElementById("registro").reset();
      }
    });
  }

  render() {
    const data = this.state.recargas;
    const options = {
      sizePerPage: 5,
      prePage: "Anterior",
      nextPage: "Siguiente",
      firstPage: "Primera",
      lastPage: "Ultimo",
      hideSizePerPage: true
    };

    return (
      <div>
        <Formik
          initialValues={this.recarga}
          validationSchema={RecargaSchema}
          onSubmit={value => {
            this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <div align="center">
                <h3 className="align-center">Recargas</h3>
              </div>

              <div className="content">
                <Col md={12}>
                  <Card className="flex-row">
                    <CardBody>
                      <div className="row">
                        <div className="col-5 form-group">
                          <label>Monto*</label>
                          <Field
                            name="monto"
                            type="text"
                            className="form-control"
                            onKeyPress={e => this.onChangeNumero(e)}
                          />
                          {errors.monto && touched.monto ? (
                            <div className="text-danger">{errors.monto}</div>
                          ) : null}
                        </div>
                        <div className="col-5 form-group">
                          <label>Tarjeta* </label>
                          <Field
                            name="cod_tarjeta"
                            type="text"
                            onKeyPress={e => this.onChangeNumero(e)}
                            className="form-control"
                          />
                          {errors.cod_tarjeta && touched.cod_tarjeta ? (
                            <div className="text-danger">
                              {errors.cod_tarjeta}
                            </div>
                          ) : null}
                        </div>
                        <div className="col-2 form-group">
                          <div className="col-1">
                            <hr />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-success float-center"
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div align="right" className="col-12 text-danger">
                          <label>Los campos con (*) son obligatorios</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6" />
                        <div className="col-3">
                          <Field
                            type="date"
                            id="fecha_inicio"
                            name="fecha_inicio"
                            className="form-control"
                          />
                        </div>
                        <div className="col-3">
                          <Field
                            name="fecha_fin"
                            id="fecha_fin"
                            type="date"
                            className="form-control"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <br />

                      <div className="row">
                        <div className="col-12">
                          <BootstrapTable
                            data={data}
                            pagination={true}
                            options={options}
                            bordered={false}
                            striped
                          >
                            <TableHeaderColumn
                              dataField="id_recarga"
                              width="15%"
                              isKey
                              dataSort
                            >
                              ID Recarga
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="fecha"
                              width="15%"
                              dataSort
                            >
                              Fecha y Hora
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="monto"
                              width="15%"
                              dataSort
                            >
                              Valor
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="cod_tarjeta"
                              width="15%"
                              dataSort
                            >
                              Cod Tarjeta
                            </TableHeaderColumn>
                          </BootstrapTable>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </div>
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

export default CrearRecarga;
