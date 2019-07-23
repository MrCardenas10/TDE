import React, { Component } from "react";
import axios from "axios";
import ModalProducto from "./ModalProducto";
import VerProducto from "./VerProducto";
import { URL } from "./../../config/config";
import NotificationSystem from "react-notification-system";
import { NOTIFICATION_SYSTEM_STYLE } from "utils/constants";
import { Card, CardBody, Col, Input } from "reactstrap";
import Tabla from "./../../components/Tabla";
import { MdImportantDevices, MdSearch } from "react-icons/lib/md";
import {
  TiEdit,
  TiThumbsDown,
  TiThumbsUp,
  TiEyeOutline
} from "react-icons/lib/ti";

import { TiInfoLarge } from "react-icons/lib/ti/info-large";

class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      producto: [],
      parametro: "",
      abrir_modal: false,
      ver_modal: false
    };
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/producto`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let productos = [];
      r.data.forEach(d => {
        const { id_producto, producto, estado, precio, cantidad } = d;
        let obj = {
          id_producto,
          producto,
          precio,
          cantidad,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            estado === 1
              ? this.boton_estado(
                "btn btn-danger bordered",
                <TiThumbsDown />,
                id_producto
              )
              : this.boton_estado(
                "btn btn-success",
                <TiThumbsUp />,
                id_producto
              ),
            <span> </span>,
            estado === 1 ? (
              <button
                onClick={() => this.modal_producto(id_producto)}
                className="btn btn-info"
              >
                <TiEdit />
              </button>
            ) : null,

            <span> </span>,
            <button
              onClick={() => this.modal_ver(id_producto)}
              className="btn btn-secondary"
              style={{ backgroundColor: "#6c757d", borderColor: "gray" }}
            >
              <TiEyeOutline />
            </button>
          ]
        };
        productos.push(obj);
      });
      this.setState({
        productos
      });
    });
  }

  cambiar_estado(id) {
    axios({
      method: "delete",
      url: `${URL}/producto/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      this.setState({
        abrir_modal: false,
        ver_modal: false
      });
      if (datos.ok) {
        setTimeout(() => {
          if (!this.notificationSystem) {
            return;
          }

          this.notificationSystem.addNotification({
            title: <MdImportantDevices />,
            message: "Se cambió el estado exitosamente",
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
      }
    });
  }

  modal_producto(id) {
    axios({
      method: "get",
      url: `${URL}/producto/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          producto: r.data,
          abrir_modal: true,
          ver_modal: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  modal_ver(id) {
    axios({
      method: "get",
      url: `${URL}/producto/${id}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        this.setState({
          producto: r.data,
          ver_modal: true,
          abrir_modal: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // editar(id) {
  //   this.props.history.push(`/producto/modificar/${id}`);
  // }

  componentDidMount() {
    this.llamar_listar();
  }

  boton_estado(clase, texto, id) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.productos.length > 0) {
      return this.state.productos.map((e, i) => (
        <tr key={i}>
          <td>{e.id_producto}</td>
          <td>{e.producto}</td>
          <td>{e.precio}</td>
          <td>{e.cantidad}</td>
          <td>{e.estado}</td>
          <td>{e.botones}</td>
        </tr>
      ));
    }
  }

  render() {
    var data = this.state.productos;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.producto.toLowerCase().includes(this.state.parametro) ||
          v.estado.toLowerCase().includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <center>
          <h3>Productos</h3>
        </center>

        <Col md={12}>
          <Card className="demo-icons">
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
                    titulos={[
                      "# Producto",
                      "Producto",
                      "Precio",
                      "Cantidad",
                      "Estado"
                    ]}
                    propiedades={[
                      "id_producto",
                      "producto",
                      "precio",
                      "cantidad",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <ModalProducto
          abrir_modal={this.state.abrir_modal}
          producto={this.state.producto}
        />
        <VerProducto
          ver_modal={this.state.ver_modal}
          producto={this.state.producto}
        />
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

export default Producto;
