import React, { Component } from "react";

class InicioVigilante extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <center>
          <h2>¡Bienvenido {localStorage.nombres}!</h2>
        </center>
        <hr style={{ width: "320px" }} />
        <center>
          <p style={{ fontSize: "20px" }}>
            ¡Bienvenido {localStorage.nombres}!, en este momento estas en el rol
            llamado Vigilante, en la <br /> Institución Educativa Asamblea
            Departamental, en este rol podras hacer <br /> muchas actividades
            relacionadas con la entrada de los usuarios tanto de <br />{" "}
            visitantes, como de los estudiantes. Todas tus actividades son las
            siguientes:
          </p>
        </center>
        <br />
        <br />
        <br />
        <center>
          <div className="row">
            <div className="col-lg-4">
              <strong>
                <h4>Entrada de Estudiantes</h4>
              </strong>
              <hr style={{ width: "280px" }} />
              <p style={{ margin: "0px 20px 0px 0px" }}>
                En esta parte del sistema, podras registrar automaticamente la
                entrada de los estudiantes por medio de la Tarjeta la cual
                tendra el estudiante, en esta parte no tendras mucho control ya
                que solo podras ver las entradas de los estudiantes.
              </p>
            </div>
            <div className="col-lg-4">
              <h4>Entrada de Visitantes</h4>
              <hr style={{ width: "280px" }} />
              <p>
                En la Entrada Visitantes se podran registrar las entradas de los
                visitantes para tener un control sobre estas entradas, los
                visitantes no necesitarán de una Tarjeta para poder ingresar
                pero si sera necesario ser creado primero.
              </p>
            </div>
            <div className="col-lg-4">
              <h4>Registro de Visitantes</h4>
              <hr style={{ width: "280px" }} />
              <p>
                En la parte de Registro de Visitantes solo se podra registrar al
                visitante con la información básica de el motivo de su ingreso a
                la Institución, para después poder registrar la Entrada de
                Visitantes, ya que si este no esta registrado no podra ingresar.
              </p>
            </div>
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

export default InicioVigilante;
