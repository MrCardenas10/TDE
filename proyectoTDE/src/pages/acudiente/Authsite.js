import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { URL } from "./../../config/config";

class Authsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tbl_persona: []
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `${URL}/lis_persona`,
      headers: {
        Authorization: "bearer " + localStorage.token
      }
    }).then(respuesta => {
      let datos = respuesta.data;
      if (datos.ok) {
        this.setState({
          tbl_persona: datos.data
        });
      } else {
        console.log("no");
      }
    });
  }

  listar() {
    if (this.state.tbl_persona.length > 0) {
      return this.state.tbl_persona.map((e, i) => (
        <option key={i} value={e.id}>
          {" "}
          {e.documento}{" "}
        </option>
      ));
    }
  }

  render() {
    return <Button color="info">info</Button>;
  }
}

export default Authsite;
