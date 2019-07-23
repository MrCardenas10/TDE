import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AyudaVenta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.ayuda_modal
    });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}>

            <h4>Ayuda</h4>

          </ModalHeader>
          <ModalBody >
            Para crear una venta, ingrese el codigo del producto, por medio del lector de código de barras, seguido del código de la tarjeta, y finalmente, de clic en el botón "Guardar".
</ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AyudaVenta;
