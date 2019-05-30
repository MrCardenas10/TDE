import React, {Component} from 'react';
import axios from 'axios';
import { Field } from 'formik';
import {URL} from './../config/config';

class EntradaSelect extends Component {

    constructor(props){
        super(props);
        this.state = {
            entradas : []
        }
        
    } 

    componentDidMount(){
        axios({
            method: 'get',
            url: `${URL}/entrada/select`,
            headers: {
                "Authorization": "bearer"+ localStorage.token
            }
        }).then(respuesta=>{
             let datos = respuesta.data;  

             if(datos.ok){
                this.setState({
                    entradas: datos.data
                 });
             }else{
                 console.log("no se encontró");
             }
             
        });
    }

    listar(){
        if(this.state.entradas.length > 0){
            let id = this.props.id_entrada_producto;
           
            return this.state.entradas.map((e, i)=>
                <option value={id} key={i} value={e.id_entrada_producto}>{e.fecha_entrada}</option>
            );
        }
    }

    render(){
        return(
            <Field component="select" name="id_entrada_producto" className="form-control">
                <option value="">Seleccionar</option>
                {this.listar()}
            </Field>
        );
    }
     
}

export default EntradaSelect;