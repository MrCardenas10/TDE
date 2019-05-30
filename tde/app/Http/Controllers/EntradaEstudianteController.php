<?php

namespace App\Http\Controllers;
use App\Model\EntradaEstudiante;
use App\Model\DetalleEntradaLector;
use App\Model\Estudiante;
use App\Model\tarjeta;
use App\Model\Persona;
use Illuminate\Http\Request;
use Validator;


class EntradaEstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // if (date("Y-m-d G:i:s") >= date("Y-m-d 13:20:00")) {
        //     $estudiantes = EntradaEstudiante::select("tbl_entrada_lector.entrada");
        //         $estudiantes->update([
        //             'entrada' =>$estudiantes->entrada == 0 ? 0 : 0
        //         ]);
        //         echo "HOLA";
        //     }
        // $dia = 1;
        // $fecha = date("Y-m-d")  // Aquí le estamos agregando un día a la fecha actual, para que se eliminen los registros a las 12 PM automaticamente.
        // DB:table("tbl_entrada_lector")
        // ->whereRaw("DATE_ADD(fecha_entrada, INTERVAL $day DAY) = '$fecha'")
        // ->delete();
        
        $entradae = EntradaEstudiante::select("tbl_entrada_lector.id_entrada_lector","tbl_entrada_lector.fecha_entrada","tbl_entrada_lector.entrada", "tbl_persona.nombres","tbl_persona.apellidos")
        ->join("tbl_detalle_estudiante","tbl_detalle_estudiante.id_entrada_lector","=" , "tbl_entrada_lector.id_entrada_lector")
        ->join("tbl_tarjeta","tbl_detalle_estudiante.cod_tarjeta","=" , "tbl_tarjeta.cod_tarjeta")
        ->join("tbl_persona","tbl_tarjeta.id_persona","=" , "tbl_persona.id_persona")
        ->where("tbl_persona.rol","1")
        ->where("tbl_entrada_lector.entrada","1")
        ->get();


        return response()->json([
            "ok" => true,
            "data" => $entradae
        ]);
   
    }

    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'cod_tarjeta' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "error"=> "Error del validator"
            ]);
            }

            $tarjeta = $request->cod_tarjeta;
                $cod_tarjeta = tarjeta::select("tbl_tarjeta.cod_tarjeta")
                ->where("tbl_tarjeta.cod_tarjeta",$tarjeta)
                ->first();
                if ($cod_tarjeta == false) {
                    return response()->json([
                        "ok" => false,
                        "error" => "La tarjeta ingresada no existe"
                    ]);
                }
            // if (date("Y-m-d G:i") >= date("Y-m-d 13:12")) {
            //     return response()->json([
            //         "ok" => false,
            //         "error" => "Ya no puede ingresar", 
            //     ]);
            // }
            
            // if ($cod_tarjeta != $input){
            //     return response()->json([
            //         "ok" => false,
            //         "error" => "No existe la tarjeta",
            //     ]);
            // }
       
            try {
                 $registro = EntradaEstudiante::create();
                 $ultimo = $registro->id_entrada_lector;
            }catch (\Exception $th) {
                return response()->json([
                    "ok" => false,
                    "error" => "error al registrar en la tabla entrada lector"
                ]);
            }
            
            try{
                
                //  $ultimo = EntradaEstudiante::select("tbl_entrada_lector.id_entrada_lector")
                // ->orderby("tbl_entrada_lector.id_entrada_lector","DESC")->take(1)
                // ->get();
                
                DetalleEntradaLector::create([
                    'id_entrada_lector' => $ultimo,
                    'cod_tarjeta' => $tarjeta
                 ]);
                 }
                 catch(\Exception $th) {
                return response()->json([
                    "ok" => false,
                    "error" => "error al registrar tabla estudiante lector"
                ]);
                }
            
                return response()->json([
                    "ok" => true,
                    "error" => "Entrada con exito"
                ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_entrada_lector
     * @return \Illuminate\Http\Response
     */
    public function show($id_entrada_lector)
    {
        $entradae = EntradaEstudiante::select("tbl_entrada_lector.id_entrada_lector","tbl_entrada_lector.fecha_entrada","tbl_entrada_lector.entrada", "tbl_persona.nombres","tbl_persona.apellidos")
        ->join("tbl_detalle_estudiante","tbl_entrada_lector.id_entrada_lector","=" , "tbl_detalle_estudiante.id_entrada_lector")
        ->join("tbl_tarjeta","tbl_tarjeta.cod_tarjeta","=" , "tbl_detalle_estudiante.cod_tarjeta")
        ->join("tbl_estudiante","tbl_estudiante.id_estudiante","=" , "tbl_tarjeta.id_estudiante")
        ->join("tbl_persona","tbl_estudiante.id_persona","=" , "tbl_persona.id_persona")
        ->first();

        return response()->json([
            "ok" => true,
            "data" => $entradae
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_entrada_lector
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_entrada_lector)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'fecha_entrada' => 'required|max:25',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "error"=> $validator->messages(),
            ]);
            }

            try {
                $entradae = EntradaEstudiante::find($id_entrada_lector);
                if ($entradae == false) {
                    return response()->json([
                        "ok" => true,
                        "error" => "No se encontro", 
                    ]);
                }

                $entradae -> update($input);

                 return response()->json([
                    "ok" => true,
                    "mensaje" => "Se Modifico Con Exito",
                ]);
            } catch (\Exception $th) {
                return response()->json([
                    "ok" => false,
                    "error" => $th->getMessage()
                ]);
            }
        
    }


       /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id_entrada_lector
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_entrada_lector)
    {
        try {
            $entradae = EntradaEstudiante::find($id_entrada_lector);

            if ($entradae == false) {
                return response()->json([
                    'ok' => false,
                    'error' => "No se encontro"
                ]);
            } 

            $entradae->update([
                'entrada' =>$entradae->entrada== 1 ? 0 : 1,
            ]);

             return response()->json([
                "ok" => true,
                "mensaje" => "Se Modifico Con Exito!",
            ]);
            
        }catch (\Exception $ex) {
            return response()->json([
                'ok' => false,
                'error' => $ex->getMessage(),
            ]);
        }
    
    }
}
