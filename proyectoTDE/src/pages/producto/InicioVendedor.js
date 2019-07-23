import React, {Component} from 'react';
import { Chart } from 'react-chartjs-2';
import { Card, Col, CardBody, Input } from "reactstrap";
import { Line } from 'react-chartjs-2';
import { URL } from "./../../config/config";
import axios from "axios";

class InicioVendedor extends Component{

constructor(props){
 super(props);
 this.state={productos:[]}
}

  componentDidMount(){
    this.diagrama();
    this.vista();
    axios({
      method: "get",
      url: `${URL}/inicioVendedor`,
      headers: {
        Authorization: "bearer" + localStorage.token
      },
      
    }).then(respuesta =>{
      let datos= respuesta.data;
      this.setState({productos:datos.Producto})
    }); 
  }

  diagrama(){
    let data = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      datasets: [
        {
          label: 'Productos vendidos en la semana',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(35,143,182,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(35,143,182,20)',
          pointHoverBorderColor: 'rgba(450,450,450,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.productos
        }
      ]
    };
    
    return (
      <div>
        <Line data={data} />
      </div>
    );
  }

  vista(){
    if(this.state.productos != null){
      return this.diagrama();
    }else{
      return " ";
    }
  }

 
render(){
    return(
      <div className="content">
        <Col md={12}>
          <Card className="flex-row">
            <CardBody>
              <div>{console.log(this.state.productos)}
              {this.vista()}</div>
            </CardBody>
          </Card>
        </Col>
        </div>
    );
}
}
 


export default InicioVendedor;

