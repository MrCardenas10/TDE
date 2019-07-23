import React, { Component } from "react";

class ViEstudiante extends Component {
    render() {
        return (
            <div>
                <br />
                <br />
                <center>
                    <h2>¡Bienvenid@ {localStorage.nombres}!</h2>
                </center>
                <hr style={{ width: "320px" }} />
                <center>
                    <p style={{ fontSize: "20px" }}>
                        ¡Bienvenid@ {localStorage.nombres}!, en este momento estas en el rol
            llamado Estudiante, en la <br /> Institución Educativa Asamblea
            Departamental, en este rol podras hacer <br /> muchas actividades
            relacionadas con las recargas y compras  <br />{" "}
                        Todas tus actividades son las
                       siguientes:
          </p>
                </center>
                <br />
                <br />
                <br />
                <center>
                    <div className="row">
                        <div className="col-lg-2" />

                        <div className="col-lg-4">
                            <strong>
                                <h4>Recargas</h4>
                            </strong>
                            <hr style={{ width: "280px" }} />
                            <p style={{ margin: "0px 20px 0px 0px" }}>
                                En esta parte del sistema, podras ver todas las recargas
                                que has hecho con tu tarjeta estudiantil y así, estar al tanto
                                de todas tus transacciones.
              </p>
                        </div>
                        <div className="col-lg-4">
                            <h4>Compras</h4>
                            <hr style={{ width: "280px" }} />
                            <p>
                                En la parte de compras, podras ver todas las compras que haces en la
                                cafeteria de la Institución, el dinero que gaste y los productos que
                                compraste.
              </p>
                        </div>
                        <div className="col-lg-2" />

                    </div>
                </center>
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default ViEstudiante;
