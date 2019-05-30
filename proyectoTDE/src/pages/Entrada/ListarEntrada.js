import React, { Component } from 'react';
import axios from 'axios';
import {URL} from './../../config/config';


export default class Visitante extends Component {

    constructor(props){
        super(props);
        this.state = {
            entrada:[]
            }

        }
    llamar_listar(){
        axios({
            method : 'get',
            url: `${URL}/entrada`
        }).then(respuesta=>{
            let r = respuesta.data;
            
                 this.setState({
                entrada : r.data
            });
        });
    }

    componentDidMount(){
        this.llamar_listar(); 
    }

    listar(){
        if (this.state.entrada.length > 0 ) {
            return this.state.entrada.map(
                (e,i)=>
            <tr key={i} >
                <td>{e.fecha_entrada}</td>
                <td>{e.motivo}</td>
                <td>{e.nombrev}</td>
                <td>{e.nombrep}</td>
            </tr>
            )
        }
    }

        render(){
            return(
                <div>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Fecha Ingreso</th>
                                <th>Motivo</th>
                                <th>Visitante</th>
                                <th>Vigilante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listar() == null ? 'Cargando ...' : this.listar()}
                        </tbody>
                    </table>
                </div>
            );
        }
}