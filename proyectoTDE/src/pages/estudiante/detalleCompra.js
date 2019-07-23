import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";



class detalleCompra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            ventaM: []
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            modal: newProps.modal_compra,
            ventaM: newProps.ventaM
        });
    }



    render() {
        const data = this.state.ventaM;
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
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}>

                        <h4>Productos</h4>

                    </ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={this.state.ventaM}

                        >
                            {({ errors, touched, values }) => (
                                <Form>


                                    <div className="row">
                                        <div className="col-12">
                                            <BootstrapTable
                                                data={data}
                                                pagination={false}
                                                options={options}
                                                bordered={false}
                                                striped
                                            >
                                                <TableHeaderColumn
                                                    dataField="cantidad"
                                                    width="20%"
                                                    isKey
                                                    dataSort
                                                >
                                                    Cantidad
                            </TableHeaderColumn>
                                                <TableHeaderColumn
                                                    dataField="total"
                                                    width="20%"
                                                    dataSort
                                                >
                                                    Total
                            </TableHeaderColumn>
                                                <TableHeaderColumn
                                                    dataField="id_producto"
                                                    width="20%"
                                                    dataSort
                                                >
                                                    Producto
                            </TableHeaderColumn>
                                                <TableHeaderColumn
                                                    dataField="producto"
                                                    width="40%"
                                                    dataSort
                                                >
                                                    Nombre
                            </TableHeaderColumn>

                                            </BootstrapTable>
                                        </div>
                                    </div>

                                    <ModalFooter>


                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </Modal>

            </div >
        );
    }
}

export default detalleCompra;
