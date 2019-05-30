<?php

namespace App\Http\Controllers;
use App\Model\EntradaVisitante;
use App\Model\Visitante;
use Illuminate\Http\Request;
use Validator;


class EntradaVisitanteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $entradav = EntradaVisitante::select("tbl_entrada_sistema.fecha_entrada_visitante","tbl_persona.nombres","tbl_visitante.nombre_visitante",
        "tbl_visitante.apellido_visitante","tbl_entrada_sistema.motivo") 
        ->join("tbl_persona","tbl_entrada_sistema.id_persona","=","tbl_persona.id_persona")
        ->join("tbl_visitante","tbl_entrada_sistema.id_visitante", "=","tbl_visitante.id_visitante")
        ->get();

        return response()->json([
            "ok" => true,
            "data" => $entradav
        ]);

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'motivo' => 'required',
            'id_visitante' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "error"=> $validator
            ]);
            }
            // $rol = Persona::select("tbl_persona.rol")
            // ->where("tbl_persona.id_persona",$request->id_persona)
            // ->first();

            // if ($rol !== "2") {
            //     return response()->json([
            //         "ok" => false,
            //         "error" => "No eres un vigilante"
            //     ]);
            // }

            try {
                $motivo = $request->motivo;
                $id_visitante = $request->id_visitante;
                $id_persona = $request->id_persona;
                EntradaVisitante::create([
                    'motivo' => $motivo,
                    'id_visitante' => $id_visitante,
                    'id_persona' => $id_persona
                ]);
                 return response()->json([
                    "ok" => true,
                    "mensaje" => "Entrada con éxito" 
                ]);
            } catch (\Exception $th) {
                return response()->json([
                    "ok" => false,
                    "error" => "Error al crear la entrada"
                ]);
            }   
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_entrada_sistema
     * @return \Illuminate\Http\Response
     */
    public function show($id_entrada_sistema)
    {
        $entradav = EntradaVisitante::select("tbl_entrada_sistema.fecha_entrada_visitante","tbl_persona.nombres","tbl_visitante.nombre_visitante",
        "tbl_visitante.apellido_visitante","tbl_entrada_sistema.motivo")
        ->join("tbl_persona","tbl_entrada_sistema.id_persona","=","tbl_persona.id_persona")
        ->join("tbl_visitante","tbl_entrada_sistema.id_visitante", "=","tbl_visitante.id_visitante")
        ->where("tbl_entrada_sistema.id_entrada_visitante",$id_entrada_sistema)
        ->first();

        return response()->json([
            "ok"=> true,
            "data" => $entradav
        ]);
    }
}
