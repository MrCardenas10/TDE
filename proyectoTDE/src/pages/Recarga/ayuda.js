import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";



class ayuda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,

        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };





    render() {


        return (
            <div>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>

                        <h5>hola</h5>
                        <ModalFooter>


                        </ModalFooter>


                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default ayuda;
