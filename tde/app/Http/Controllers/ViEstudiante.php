<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Persona;
use App\Model\Venta;


class ViEstudiante extends Controller
{
    public function infoSaldo($id_persona)
    {
        $tbl_estudiante = Persona::select("tbl_persona.id_persona","tbl_persona.nombres","tbl_persona.apellidos","tbl_persona.genero"
        ,"tbl_tarjeta.saldo","tbl_persona.telefono","tbl_persona.email","tbl_rol.rol","tbl_tipo_documento.tipo_documento")
        ->join("tbl_rol","tbl_persona.rol","=","tbl_rol.id_rol")
        ->join("tbl_tipo_documento","tbl_persona.id_tipo_documento","=","tbl_tipo_documento.id_tipo_documento")
        ->join("tbl_tarjeta","tbl_persona.id_persona","=","tbl_persona.id_persona")
        ->where("tbl_persona.id_persona",$id_persona)
        ->where("tbl_persona.rol","1")
        ->first();

        return response()->json([
            "ok" => true,
            "data" => $tbl_estudiante,
        ]);
    }

    public function recargas($id_persona)
    {
        $tbl_estudiante = Persona::select("tbl_persona.id_persona","tbl_recarga.id_recarga","tbl_recarga.fecha","tbl_recarga.monto","tbl_recarga.cod_tarjeta")
        ->join("tbl_tarjeta","tbl_tarjeta.id_persona","=","tbl_persona.id_persona")
        ->join("tbl_recarga", "tbl_recarga.cod_tarjeta","=","tbl_tarjeta.cod_tarjeta")
        ->where("tbl_persona.id_persona",$id_persona)
        ->where("tbl_persona.rol","1")
        ->get();

        return response()->json([
            "ok" => true,
            "data" => $tbl_estudiante,
        ]);
    }

    public function compras($id_persona)
    {
        // $ventasu=Venta::take(5) 
        // ->orderBy('id_venta', 'desc')
        // ->join("tbl_tarjeta","tbl_venta.cod_tarjeta","=","tbl_tarjeta.cod_tarjeta")
        // ->join("tbl_persona","tbl_tarjeta.id_persona","=","tbl_persona.id_persona")
        // ->where("tbl_persona.id_persona",$id_persona)
        // ->get();

        // return response()->json([
        //     'ok'=> true,
        //     'data'=>$ventasu
        // ]); 

        $tbl_estudiante = Persona::select("tbl_persona.id_persona","tbl_venta.id_venta","tbl_venta.fecha","tbl_venta.Monto_Venta","tbl_venta.cod_tarjeta")
        ->join("tbl_tarjeta","tbl_tarjeta.id_persona","=","tbl_persona.id_persona")
        ->join("tbl_venta", "tbl_venta.cod_tarjeta","=","tbl_tarejta.cod_tarjeta")
        ->where("tbl_persona.id_persona",$id_persona)
        ->where("tbl_persona.rol","1")
        ->get();

        return response()->json([
            "ok" => true,
            "data" => $tbl_estudiante,
        ]);
    }

}
