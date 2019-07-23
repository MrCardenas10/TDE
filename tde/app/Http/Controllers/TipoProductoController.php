<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\TipoProducto;
use Validator;

class TipoProductoController extends Controller
{
    public function select()
    {
        $tipo = TipoProducto::select("tbl_tipo_producto.*")
        ->where("tbl_tipo_producto.estado","1")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$tipo
        ]);
        
    }

    public function index()
    {
        $tipos = TipoProducto::select("tbl_tipo_producto.*")
        ->get();

      

        return response()->json([
            "ok"=> true,
            "data"=> $tipos,
         
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
    
            'tipo_producto' => 'required|string|unique:tbl_tipo_producto|max:45',
            
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        TipoProducto::create($input);

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
        $tipos = TipoProducto::select("tbl_tipo_producto.*")
        ->where("tbl_tipo_producto.id_tipo_producto", $id )  
        ->first();

        return response()->json([
            "ok"=> true,
            "data"=> $tipos
        ]);
    }


    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'tipo_producto' => 'required|max:45',
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
            $tipo = TipoProducto::find($id);
    
            if($tipo == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $tipo->update($input);
    
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
            $tipo = TipoProducto::find($id);
    
            if($tipo == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $tipo->update([
                'estado'=>$tipo->estado == 1 ? 0 : 1,
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
