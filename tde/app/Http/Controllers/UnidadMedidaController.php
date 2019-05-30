<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\UnidadMedida;
use Validator;

class UnidadMedidaController extends Controller
{
    public function select()
    {
        $unidad = UnidadMedida::all();

        return response()->json([
            "ok"=>true,
            "data"=>$unidad
        ]);
        var_dump($unidad);
    }

    public function index()
    {
        $unidades = UnidadMedida::select("tbl_unidad_medida.*")
        ->get();

        return response()->json([
            "ok"=> true,
            "data"=> $unidades
        ]);
    }
    

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
    
            'unidad_medida' => 'required|string|unique:tbl_unidad_medida|max:45',
            
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        UnidadMedida::create($input);

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
        $unidades = UnidadMedida::select("tbl_unidad_medida.*")
        ->where("tbl_unidad_medida.id_unidad_medida", $id )  
        ->first();

        return response()->json([
            "ok"=> true,
            "data"=> $unidades,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'unidad_medida' => 'required|max:45',
            
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
            $unidad = UnidadMedida::find($id);
    
            if($unidad == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $unidad->update($input);
    
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

    // public function destroy($id)
    // {
    //     try{
    //         $unidad = UnidadMedida::find($id);
    
    //         if($unidad == false){
    //             return response()->json([
    //                 "ok" => false,
    //                 "error" => "No se encontro"
    //             ]);
    //         }
    
    //         $unidad->update([
    //             'estado'=>$unidad->estado == 1 ? 0 : 1,
    //         ]);
    
    //         return response()->json([
    //             "ok"=> true,
    //             "mensaje" => "Se modifico con exito" 
    //         ]);
    
    //         }catch(\Exception $ex){
    //             return response()->json([
    //                 "ok" => false,
    //                 "error" => $ex-> getMessage()
    //             ]);
    //         }
    //}   

}
