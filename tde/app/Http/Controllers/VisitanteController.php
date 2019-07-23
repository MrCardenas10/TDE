<?php

namespace App\Http\Controllers;
use App\Model\Visitante;
use Illuminate\Http\Request;
use Validator;


class VisitanteController extends Controller{
     /**
     * Update the specified resource in storage.
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $visitante = Visitante::select("tbl_visitante.*")
        ->get();
        return response()->json([
            'ok' => true,
            'data' => $visitante
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
            'nombre_visitante' => 'required|max:45',
            'apellido_visitante' => 'required|max:45',
            'id_visitante' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "error"=> $validator
            ]);
            }

            try {
                 Visitante::create($input);
                 return response()->json([
                    "ok" => true,
                    "mensaje" => "Registró con éxito" 
                ]);
            }catch (\Exception $th) {
                return response()->json([
                    "ok" => false,
                    "error" => $th->getMessage()
                ]);
            }
    }
   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_visitante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_visitante)
    {
        $input = $request->all();
        $validator = Validator::make($input,[
            'nombre_visitante' => 'required|max:25',
            'apellido_visitante' => 'required|max:25',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "ok" => false,
                "error"=> $validator->messages(),
            ]);
            }

            try {
                $visitante = Visitante::find($id_visitante);
                if ($visitante == false) {
                    return response()->json([
                        "ok" => false,
                        "error" => "No se encontro", 
                    ]);
                }

                $visitante -> update($input);

                 return response()->json([
                    "ok" => true,
                    "mensaje" => "Se modificó con éxito",
                ]);
            } catch (\Exception $th) {
                return response()->json([
                    "ok" => false,
                    "error" => $th->getMessage()
                ]);
            }
        
    }

     /**
     * Display the specified resource.
     *
     * @param  int  $id_visitante
     * @return \Illuminate\Http\Response
     */
    public function show($id_visitante)
    {
        $visitante = Visitante::select("tbl_visitante.*")
        ->where("tbl_visitante.id_visitante", $id_visitante)
        ->first();
        return response()->json([
            "ok"=> true,
            "data" => $visitante
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id_visitante
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_visitante)
    {
        try {
            $visitante = Visitante::find($id_visitante);

            if ($visitante == false) {
                return response()->json([
                    'ok' => false,
                    'error' => "No se encontro"
                ]);
            } 

            $visitante->update([
                'estado' =>$visitante->estado== 1 ? 0 : 1, 
            ]);

             return response()->json([
                "ok" => true,
                "mensaje" => "Se cambió el estado exitosamente",
            ]);
            
        }catch (\Exception $ex) {
            return response()->json([
                'ok' => false,
                'error' => $ex->getMessage(),
            ]);
        }
    
    }
}
