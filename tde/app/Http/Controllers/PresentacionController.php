<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Presentacion;
use Validator;

class PresentacionController extends Controller
{
    public function select()
    {
        $presentacion = Presentacion::all();

        return response()->json([
            "ok"=>true,
            "data"=>$presentacion
        ]);
        
    }

    public function index()
    {
        $presentacion = Presentacion::select("tbl_presentacion.*")
        ->get();

        $presentaciones = Presentacion::select("tbl_presentacion.*")
        ->where("tbl_presentacion.estado", "1")
        ->get();

        return response()->json([
            "ok"=> true,
            "data"=> $presentacion,
            "select"=>$presentaciones
        ]);
    }


    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
    
            'presentacion' => 'required|string|unique:tbl_presentacion|max:45',
            
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        Presentacion::create($input);

        return response()->json([
            "ok"=> true,
            "mensaje" => "Se registro con exito" 
        ]);

        }catch(\Exception $ex){
            return response()->json([
                "ok" => false,
                "error" => $ex-> getMessage()
            ]);
        }
    } 

    public function show($id){
        $presentacion = Presentacion::select("tbl_presentacion.*")
        ->where("tbl_presentacion.id_presentacion", $id )  
        ->first();

        return response()->json([
            "ok"=> true,
            "data" => $presentacion
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'presentacion' => 'required|max:45|string|unique:tbl_presentacion',
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
            $presentacion = Presentacion::find($id); // metodo  estatico
    
            if($presentacion == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $presentacion->update($input);
    
            return response()->json([
                "ok"=> true,
                "mensaje" => "Se modifico con exito" 
            ]);
    
            }catch(\Exception $ex){
                return response()->json([
                    "ok" => false,
                    "error" => $ex-> getMessage()
                ]);
            }
    }

   
    public function destroy($id)
    {
        try{
            $presentacion = Presentacion::find($id); // metodo  estatico
    
            if($presentacion == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $presentacion->update([
                'estado'=>$presentacion->estado == 1 ? 0 : 1,
            ]);
    
            return response()->json([
                "ok"=> true,
                "mensaje" => "Se modifico con exito" 
            ]);
    
            }catch(\Exception $ex){
                return response()->json([
                    "ok" => false,
                    "error" => $ex-> getMessage()
                ]);
            }
    }   

}
