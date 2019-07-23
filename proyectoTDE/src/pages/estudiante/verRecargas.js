import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Card, Col, CardBody } from "reactstrap";
import moment from "moment";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { URL } from "./../../config/config";
import { TiInfoLarge } from "react-icons/lib/ti";
import { MdRecentActors } from "react-icons/lib/md";

class verRecargas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recargas: [],
            ayuda_modal: false
        };



        this.reporte = this.reporte.bind(this);
        // en el contructor se crea esto que es para poder utilizar el onChange
    }




    llamar_listar() {
        let id_persona = localStorage.id_persona;
        axios({
            method: "get",
            url: `${URL}/vistae/${id_persona}`,
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

    render() {
        const data = this.state.recargas;
        const options = {
            sizePerPage: 5,
            prePage: "<",
            nextPage: ">",
            firstPage: "<<",
            lastPage: ">>",
            hideSizePerPage: true
        };

        return (
            <div>
                <div className="row">
                    <div className="col-lg-4" />

                    <div className="col-lg-4">
                        <center>
                            <h3>Recargas</h3>
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

                <div className="content">
                    <Col md={12}>
                        <Card className="flex-row">
                            <CardBody>


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
                                            <TableHeaderColumn dataField="fecha" width="15%" dataSort>
                                                Fecha y Hora
                      </TableHeaderColumn>
                                            <TableHeaderColumn dataField="monto" width="15%" dataSort>
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
                                <div className="row">

                                    <div className="col-lg-4" />
                                    <div className="col-lg-4" />
                                    <div className="col-lg-4" style={{ textAlign: "right" }}>
                                        {/* <button
                      style={{ borderRadius: "5px", backgroundColor: "#fff" }}
                      onClick={this.reporte}
                    >
                      <TiInfoLarge />
                    </button> */}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </div>


            </div>
        );
    }
}

export default verRecargas;
