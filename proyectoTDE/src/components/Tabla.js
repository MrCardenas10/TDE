import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

export default class Tabla extends Component {
  constructor() {
    super();
    this.state = {
      pag: 1,
      filasPagina: 5
    };
  }
  cambioPagina = (evento, pagina) => {
    this.setState({ pag: pagina });
  };
  cambiaPaginas = e => {
    this.setState({ filasPagina: e.target.value });
  };
  cargarDatos() {
    let id = 0;
    const { datos, propiedades } = this.props;
    const { pag, filasPagina } = this.state;
    let arr = [];
    datos.forEach(d => {
      arr.push(
        <TableRow key={id}>
          {propiedades.map((prop, i) => (
            <TableCell key={i}>{d[prop]}</TableCell>
          ))}
        </TableRow>
      );
      id++;
    });
    return [
      arr.length,
      arr.slice(pag * filasPagina, pag * filasPagina + filasPagina).map(d => d)
    ];
  }

  render() {
    const { pag, filasPagina } = this.state;
    const { titulos } = this.props;
    let datos = this.cargarDatos();
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <Table>
              <TableHead>
                <TableRow>
                  {titulos.map(t => (
                    <TableCell>{t}</TableCell>
                  ))}
                  {this.props.botones ? <TableCell>Opciones</TableCell> : ""}
                </TableRow>
              </TableHead>
              <TableBody>{datos[1]}</TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    count={datos[0]}
                    rowsPerPage={filasPagina}
                    page={pag}
                    labelRowsPerPage="Registros por página"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from} - ${to} de ${count} registros.`
                    }
                    onChangePage={this.cambioPagina}
                    onChangeRowsPerPage={this.cambiaPaginas}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
