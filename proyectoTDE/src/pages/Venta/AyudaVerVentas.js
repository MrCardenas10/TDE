import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AyudaVerVenta extends Component {
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
            Para hacer un filtro de las ventas ingrese una fecha de inicio y una fecha final, en la tabla aparecerán las ventas hechas en el lapso de tiempo elegido.
</ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AyudaVerVenta;
