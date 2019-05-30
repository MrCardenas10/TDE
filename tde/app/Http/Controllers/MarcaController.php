<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Marca;
use Validator;

class MarcaController extends Controller
{
    public function select()
    {
        $marca = Marca::select("tbl_marca.id_marca","tbl_marca.marca","tbl_marca.estado")
        ->where("tbl_marca.estado","=","1")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$marca
        ]);
    }

    public function index()
    {
        $marcas = Marca::select("tbl_marca.*")
        ->get();

        $marca = Marca::select("tbl_marca.id_marca","tbl_marca.marca","tbl_marca.estado")
        ->where("tbl_marca.estado","=","1")
        ->get();

        return response()->json([
            "ok"=> true,
            "data"=> $marcas,
            "select"=>$marca
        ]);
    }
    

    public function store(Request $request)
    {
        $input = $request->all();
       
        $validator = Validator::make($input, [
            'marca' => 'required|string|unique:tbl_marca|max:45',
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        Marca::create($input);

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
        $marcas = Marca::select("tbl_marca.*")
        ->where("tbl_marca.id_marca", $id )  
        ->first();

        return response()->json([
            "ok"=> true,
            "data"=> $marcas
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        //echo json_encode($input); exit;

        $validator = Validator::make($input, [
        'marca' => 'required|max:45',
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
            $marca = Marca::find($id);
    
            if($marca == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $marca->update($input);
    
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
            $marca = Marca::find($id);
    
            if($marca == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $marca->update([
                'estado'=>$marca->estado == 1 ? 0 : 1,
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