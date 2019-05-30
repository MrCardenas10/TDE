<?php

namespace App\Http\Controllers;
use App\Model\Visitante;
use Illuminate\Http\Request;

class VisitantesController extends Controller
{
    
    public function select(){

        $visitantes = Visitante::select("tbl_visitante.id_visitante","tbl_visitante.nombre_visitante","tbl_visitante.apellido_visitante")
        ->where("tbl_visitante.estado","1")
        ->get();
        return response()->json([
            "ok" => true,
            "data" => $visitantes
        ]);

    }

}
