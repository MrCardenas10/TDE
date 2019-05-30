import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ProductoSchema = Yup.object().shape({
  producto: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  precio: Yup.string().required("Required"),
  id_presentacion: Yup.string().required("Required"),
  id_marca: Yup.string().required("Required"),
  id_tipo_producto: Yup.string().required("Required"),
  id_unidad_medida: Yup.string().required("Required")
});

class VerProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      producto: []
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      modal: newProps.ver_modal,
      producto: newProps.producto
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
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Formik
              initialValues={this.state.producto}
              validationSchema={ProductoSchema}
              onSubmit={value => {
                this.modificar(value);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <center>
                    <h3>Ver Producto</h3>
                  </center>
                  <br />
                  <div className="row">

                    <div className="col-6 form-group">
                      <label>Presentación</label>
                      <Field disabled name="presentacion" className="form-control"/>
                      {errors.presentacion && touched.presentacion ? (
                        <div className="text-danger">
                          {errors.presentacion}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Marca</label>
                      <Field disabled name="marca" className="form-control"/>
                      {errors.marca && touched.marca ? (
                        <div className="text-danger">{errors.marca}</div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Tipo Producto</label>
                      <Field disabled name="tipo_producto" className="form-control"/>
                      {errors.tipo_producto && touched.tipo_producto ? (
                        <div className="text-danger">
                          {errors.tipo_producto}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-6 form-group">
                      <label>Unidad Medida</label>
                      <Field disabled name="unidad_medida" className="form-control"/>
                      {errors.unidad_medida && touched.unidad_medida ? (
                        <div className="text-danger">
                          {errors.unidad_medida}
                        </div>
                      ) : null}
                    </div>

                    <br />
                  </div>
                  <br />
                  <ModalFooter>
                    <Button color="danger" onClick={this.toggle}>
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
       
      </div>
    );
  }
}

export default VerProducto;
