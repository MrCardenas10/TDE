import React, { Component } from "react";
import axios from "axios";
import { Formik, Form, Field, handleChange } from "formik";
import * as Yup from "yup";
import { URL } from "./../../config/config";
import { Card, Col, CardBody } from "reactstrap";
import Tabla from "./../../components/Tabla";
import VerVenta from "./VerVenta";
import moment from "moment";
import { FaTrashO, FaTrash } from "react-icons/lib/fa";
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdDeleteForever,
  MdLoyalty
} from "react-icons/lib/md";
import { TiEyeOutline, TiInfoLarge } from "react-icons/lib/ti";
import AyudaVerVenta from "./AyudaVerVentas";
import { IoPrinter } from "react-icons/lib/io";
IoPrinter

class Ventas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ventaM: [],
      ventas: [],
      parametro: "",
      ver_modal: false,
      ayuda_modal: false
    };

    this.filtro = this.filtro.bind(this);
  }

  componentDidMount() {
    this.llamar_listarr();
  }

  ////////////////////////////////FILTRO/////////////////////////////////////////////

  filtro() {

    let ini = document.getElementById("fecha_inicio").value || 0;
    let fi = document.getElementById("fecha_fin").value || 0;
    let inicio = moment(ini).format("YYYY-MM-DD");
    let fin = moment(fi).format("YYYY-MM-DD");
    if (fin === "1969-12-31") {
      this.componentDidMount();

      console.log("hola");
    }

    console.log(inicio);
    console.log(fin);

    axios({
      method: "get",
      url: `${URL}/venta/show/${inicio}/${fin}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
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
              >
                <TiEyeOutline />
              </button>,
              <span> </span>,
              <button
                style={{ borderRadius: "5px", backgroundColor: "#fff" }}
                onClick={() => this.modal_ver(id_venta)}

              >
                <TiEyeOutline />
              </button>
            ]
          };
          ventas.push(obj);
        });
        this.setState({
          ventas,
          ver_modal: false,
          ayuda_modal: false
        });
      })
      .catch(error => {
        alert(error);
      });
  }
  ////////////////////////////////////////////////////////////////////////////////

  comprobante(id) {


    axios({
      method: "get",
      url: `${URL}/comprobante/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }

    })
    window.open(`${URL}/comprobante/${id}`);


  }

  //////////////////////////LLAMAR LISTAR/////////////////////////////////////////////

  llamar_listarr() {
    axios({
      method: "get",
      url: `${URL}/venta`,
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
            >
              <TiEyeOutline />
            </button>, <span> </span>,
            <button

              onClick={() => this.comprobante(id_venta)}
              className="btn btn-primary"

            >

              <IoPrinter />
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

  modal_ayuda = e => {
    e.preventDefault();
    this.setState({
      ayuda_modal: true,
      ver_modal: false
    });
  };

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
            <td> {this.boton("btn btn-danger", <FaTrash />, e.id_producto)}</td>
          </tr>
        );
      });
    }
    return prds;
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
        <div className="row">
          <div className="col-lg-4" />

          <div className="col-lg-4">
            <center>
              <h3>Ventas</h3>
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
        <Col md={12}>
          <Card className="demo-icons">
            <CardBody>
              <div className="row">
                <div className="col-6" />
                <div className="col-3">
                  <input
                    type="date"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    className="form-control"
                  />
                </div>
                <div className="col-3">
                  <input
                    name="fecha_fin"
                    id="fecha_fin"
                    type="date"
                    className="form-control"
                    onChange={this.filtro}
                  />
                </div>

                <div className="col-12">
                  <hr />
                  <Tabla
                    datos={data}
                    botones
                    titulos={["# Venta", "Fecha", "Total", "Cod Tarjeta"]}
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

        <VerVenta ver_modal={this.state.ver_modal} ventaM={this.state.ventaM} />

        <AyudaVerVenta ayuda_modal={this.state.ayuda_modal} />
      </div>
    );
  }
}

export default Ventas;
