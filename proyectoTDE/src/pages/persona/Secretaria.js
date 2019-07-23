import React, { Component } from "react";

class Secretaria extends Component {
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
            llamado Secretaria, en la <br /> Institución Educativa Asamblea
            Departamental, en este rol podras hacer <br /> muchas actividades
            relacionadas con la gestión de los usuarios y las tarjetas. <br />{" "}
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
                <h4>Gestión de usuarios</h4>
              </strong>
              <hr style={{ width: "280px" }} />
              <p style={{ margin: "0px 20px 0px 0px" }}>
                En esta parte del sistema, podras registrar nuevos usuarios,
                entre ellos estudiantes, vendedores, vigilantes, etc. Además de
                controlar la información de los mismos.
              </p>
            </div>
            <div className="col-lg-4">
              <h4>Tarjetas</h4>
              <hr style={{ width: "280px" }} />
              <p>
                En la parte de las tarjetas, podras crear las tarjetas para que
                después de crearlas puedas asignarlas a los estudiantes, para dar paso a las
                demas fucionalidades del sistema.
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

export default Secretaria;
