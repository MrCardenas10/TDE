<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Novedad;
use App\Model\Producto;

use Validator;

class NovedadController extends Controller
{

    public function index()
    {
        $novedades = Novedad::select("tbl_novedad.*", "tbl_producto.producto as nombre_producto")
        ->join("tbl_producto", "tbl_novedad.id_producto", "=", "tbl_producto.id_producto")
        ->get();
 
        return response()->json([
            "ok"=> true,
            "data"=> $novedades
        ]);
    }

    
  
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'cantidad_producto' => 'required|numeric',
            'motivo_salida' => 'required|max:100',
            'id_producto' => 'required|numeric',
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        $id_producto = $request->id_producto;
        $cant2 = $request->cantidad_producto;

        $cant = Producto::select("tbl_producto.cantidad")
        ->where("tbl_producto.id_producto",$id_producto)
        ->first();

        // echo($cant->cantidad);
        // echo($cant2);

        if($cant["cantidad"] < $cant2 ) {
            return response()->json([
                'ok' => false,
                'error' => "La cantidad ingresada es mayor a la cantidad en stock"
            ]);
        }

        $producto = Producto::find($id_producto);

            if ($producto == null) {
                return response()->json([
                    "ok" => false,
                    "error" => "Producto no encontrado"
                ]);
        
        }
        

        Novedad::create($input);
        $producto -> update([
            'cantidad' => $producto->cantidad - $request->cantidad_producto
        ]);
        return response()->json([
            "ok"=> true,
            "mensaje" => "La novedad se registro exitosamente" 
        ]);

        }catch(\Exception $ex){
            return response()->json([
                "ok" => false,
                "error" => $ex-> getMessage()
            ]);
        }
    } 



    public function show($id){
        $novedades = Novedad::select("tbl_novedad.*", "tbl_producto.producto as nombre_producto")
        ->join("tbl_producto", "tbl_novedad.id_producto", "=", "tbl_producto.id_producto")
        ->where("tbl_novedad.id_novedad", $id )  
        ->first();

        return response()->json([
            "ok"=> true,
            "data"=> $novedades,
        ]);
    }



    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
    
            'cantidad_producto' => 'required|numeric',
            'motivo_salida' => 'required|max:100',
            'id_producto' => 'required|numeric',
                      
        ]);

        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        $novedad = Novedad::find($id);

        if($novedad == false){
            return response()->json([
                "ok" => false,
                "error" => "No se encontro"
            ]);
        }

        $novedad->update($input);

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
            $novedad = Novedad::find($id);
    
            if($novedad == false){
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro"
                ]);
            }
    
            $novedad->update([
                'estado'=>$novedad->estado == 1 ? 0 : 1,
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
