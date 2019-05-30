import React, { Component } from "react";
import axios from "axios";
import { URL } from "./../../config/config";
import { Card, CardBody, Col } from "reactstrap";
import Tabla from "./../../components/Tabla";

// import ModificarVisitante from './../Visitante/ModificarVisitante';

export default class Visitante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitante: [],
      parametro: ""
    };
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/visitante`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let r = respuesta.data;
      let visitante = [];
      r.data.forEach(d => {
        const { id_visitante, nombre_visitante, apellido, estado } = d;
        let obj = {
          id_visitante,
          nombre_visitante,
          apellido,
          estado: estado === 1 ? "Activo" : "Inactivo",
          botones: [
            this.boton_estado(
              `btn btn-${estado === 1 ? "danger" : "success"}`,
              estado === 1 ? "Inhabilitar" : "Activar",
              id_visitante
            ),
            <button
              onClick={() => this.editar(id_visitante)}
              className="btn btn-info"
            >
              Editar
            </button>
          ]
        };
        visitante.push(obj);
      });
      this.setState({
        visitante
      });
    });
  }

  editar(id_visitante) {
    this.props.history.push(`/visitante/modificar/${id_visitante}`);
  }

  componentDidMount() {
    this.llamar_listar();
  }

  // componentWillReceiveProps() {
  // this.llamar_listar();
  // }

  cambiar_estado(id_visitante) {
    axios({
      method: "delete",
      url: `${URL}/visitante/${id_visitante}`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    })
      .then(respuesta => {
        let r = respuesta.data;
        if (r.ok) {
          this.setState({
            sweetShow: true,
            sweetTitle: "Genial",
            sweetText: r.mensaje,
            sweetType: "seccess"
          });
          this.llamar_listar();
        } else {
          this.setState({
            sweetShow: true,
            sweetTitle: "Ops",
            sweetText: r.error,
            sweetType: "error"
          });
        }
      })
      .catch(error => {
        alert("Error");
      });
  }

  boton_estado(clase, texto, id_visitante) {
    return (
      <button
        onClick={() => {
          this.cambiar_estado(id_visitante);
        }}
        className={clase}
      >
        {texto}
      </button>
    );
  }

  listar() {
    if (this.state.visitante.length > 0) {
      return this.state.visitante.map((e, i) => (
        <tr key={i}>
          <td>{e.nombre_visitante}</td>
          <td>{e.apellido}</td>
          <td>{e.id_visitante}</td>
          <td>{e.estado}</td>
          <td>{e.botones}</td>
        </tr>
      ));
    }
  }

  render() {
    var data = this.state.visitante;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.nombre_visitante.toLowerCase().includes(this.state.parametro) ||
          v.id_visitante.toString().includes(this.state.parametro) ||
          v.apellido.toLowerCase().includes(this.state.parametro) ||
          v.estado.includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Col md={12}>
          <Card className="flex-row">
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  <input
                    onKeyUp={({ target }) =>
                      this.setState({ parametro: target.value.toLowerCase() })
                    }
                  />
                  <Tabla
                    datos={data}
                    botones
                    titulos={[
                      "Documento",
                      "Nombre Visitante",
                      "Apellido Visitante",
                      "Estado"
                    ]}
                    propiedades={[
                      "id_visitante",
                      "nombre_visitante",
                      "apellido",
                      "estado",
                      "botones"
                    ]}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}
