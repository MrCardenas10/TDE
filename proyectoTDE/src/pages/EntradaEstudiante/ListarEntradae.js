import React, { Component } from "react";
import axios from "axios";
import { URL } from "./../../config/config";
import SweetAlert from "sweetalert-react";
// import ModificarVisitante from './../Visitante/ModificarVisitante';
import { Card, CardHeader, Col } from "reactstrap";
import Tabla from "./../../components/tabla";

export default class ListarEntradae extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entradae: [],
      parametro: ""
    };
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/entradaestudiante`
    }).then(respuesta => {
      let r = respuesta.data;
      let entradae = [];
      r.data.forEach(d => {
        const { nombrep, apellidop, fecha_entradae, entrada, id_entradae } = d;
        entradae.push({
          id_entradae,
          fecha_entradae,
          nombrep,
          apellidop,
          entrada: entrada === 1 ? "Entro" : "No Entro"
        });
      });
      this.setState({
        entradae
      });
    });
  }

  // editar(id_entradae) {
  //   this.props.history.push(`/entradaestudiante/modificar/${id_entradae}`);
  // }

  componentDidMount() {
    this.llamar_listar();
  }

  // cambiar_estado(id_entradae) {
  //   axios({
  //     method: "delete",
  //     url: `${URL}/entradaestudiante/${id_entradae}`
  //   })
  //     .then(respuesta => {
  //       let r = respuesta.data;
  //       if (r.ok) {
  //         this.checkBreakpoint(this.props.breakpoint);

  //         setTimeout(() => {
  //           if (!this.notificationSystem) {
  //             return;
  //           }

  //           this.notificationSystem.addNotification({
  //             title: <MdImportantDevices />,
  //             message: "!Se modifico con exito¡",
  //             level: "success"
  //           });
  //         }, 100);
  //         this.llamar_listar();
  //       } else {
  //         this.checkBreakpoint(this.props.breakpoint);

  //         setTimeout(() => {
  //           if (!this.notificationSystem) {
  //             return;
  //           }

  //           this.notificationSystem.addNotification({
  //             title: <MdImportantDevices />,
  //             message: "Problemas con al inhabilitar",
  //             level: "danger"
  //           });
  //         }, 100);
  //       }
  //     })
  //     .catch(error => {
  //       alert("Error");
  //     });
  // }

  // boton_estado(clase, texto, id_entradae) {
  //   return (
  //     <button
  //       onClick={() => {
  //         this.cambiar_estado(id_entradae);
  //       }}
  //       className={clase}
  //     >
  //       {texto}
  //     </button>
  //   );
  // }

  listar() {
    if (this.state.entradae.length > 0) {
      return this.state.entradae.map((e, i) => (
        <tr key={i}>
          <td>{e.nombrep}</td>
          <td>{e.apellidop}</td>
          <td>{e.fecha_entradae}</td>
          <td>{e.entrada}</td>
        </tr>
      ));
    }
  }

  render() {
    var data = this.state.entradae;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (
          v.nombrep.toLowerCase().includes(this.state.parametro) ||
          v.apellidop.toString().includes(this.state.parametro) ||
          v.fecha_entradae.toLowerCase().includes(this.state.parametro) ||
          v.entrada.includes(this.state.parametro)
        ) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Col md={12}>
          <Card className="demo-icons">
            <CardHeader>
              <div className="row">
                <div className="col-12">
                  <input
                    onKeyUp={({ target }) =>
                      this.setState({ parametro: target.value.toLowerCase() })
                    }
                  />
                  <Tabla
                    datos={data}
                    titulos={[
                      "Nombre Estudiante",
                      "Apellido Estudiante",
                      "Fecha Ingreso",
                      "Estado"
                    ]}
                    propiedades={[
                      "nombrep",
                      "apellidop",
                      "fecha_entradae",
                      "entrada"
                    ]}
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        </Col>
        <SweetAlert
          show={this.state.sweetShow}
          title={this.state.sweetTitle}
          text={this.state.sweetText}
          value={this.state.sweetType}
          onConfirm={() => this.setState({ sweetShow: false })}
        />
      </div>
    );
  }
}
