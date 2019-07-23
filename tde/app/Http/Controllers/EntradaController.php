<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Entrada;
use App\Model\Detalle;
use App\Model\Producto;
use Validator;

class EntradaController extends Controller
{
    public function select()
    {
        $entrada = Entrada::all();

        return response()->json([
            "ok"=>true,
            "data"=>$entrada
        ]);

    }

    public function llenarentrada(Request $request, $id_producto)
    {

        $input = $request->all();

            $producto = Producto::find($id_producto);
            $productos = Producto::select("tbl_producto.id_producto","tbl_producto.producto","tbl_producto.cantidad","tbl_producto.estado",
            "tbl_producto.id_marca","tbl_producto.id_tipo_producto","tbl_producto.id_presentacion","tbl_producto.id_unidad_medida","tbl_producto.precio")
            ->where("tbl_producto.estado","1")
            ->where("tbl_producto.id_producto",$id_producto)
            ->first();
            if ($producto != null) {
                return response()->json([
                    'ok' => true,
                    'data' => $producto,
                ]);
            } else {
                return response()->json([
                    'ok' => false,
                    'error' => " El producto no existe",
                ]);
            }
            
    }

    public function index()
    {
        $detalles = Detalle::select("tbl_detalle_producto.cantidad_producto", "tbl_producto.producto",
        "tbl_entrada_producto.fecha_entrada")
        ->join("tbl_producto", "tbl_detalle_producto.id_producto", "=", "tbl_producto.id_producto")
        ->join("tbl_entrada_producto", "tbl_detalle_producto.id_entrada_producto", "=", "tbl_entrada_producto.id_entrada_producto")
        ->get();

        return response()->json([
            "ok"=> true,
            "data"=> $detalles
        ]);
    }



    public function store(Request $request)
    {
        $hola = $request->all();
       
        try{
            $entrada = Entrada::create(); 

            foreach($hola as $value){
                Detalle::create(["id_entrada_producto"=>$entrada->id_entrada_producto, "id_producto"=>$value["id_producto"], 
                "cantidad_producto"=> $value["cantidad"]]);
    
                $suma = Producto::find($value["id_producto"]);
                $suma->update(["cantidad" => $suma->cantidad + $value["cantidad"]]);
            }
            return response()->json([
                "ok" => true,
                "mensaje" => "Todos los productos fueron registrados"
            ]);
        }catch (\Exception $ex){
            return  response()->json([
                "ok" => false,
                "error" => $ex-> getMessage()
            ]);
        }
          


       
        
    }
    
    public function show($id){
        $detalles = Detalle::select("tbl_detalle_producto.*", "tbl_producto.producto as nombre_producto",
        "tbl_entrada_producto.fecha_entrada as fecha")
        ->join("tbl_producto", "tbl_detalle_producto.id_producto", "=", "tbl_producto.id_producto")
        ->join("tbl_entrada_producto", "tbl_detalle_producto.id_entrada_producto", "=", "tbl_entrada_producto.id_entrada_producto")
        ->where("tbl_detalle_producto.id_detalle_producto", $id )  
        ->first();

        return response()->json([
            "ok"=> true,
            "data"=> $detalles,
        ]);
    }

   

   
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'cantidad_producto' => 'required|numeric',
            'producto' => 'required|max:45',
            'id_producto' => 'required|numeric',
            'id_entrada_producto' => 'required|numeric',
        ]);

        
        if ($validator->fails()){
            return response()->json([
              'ok'=> false,
              'error'=> $validator->messages(),
              ]);
        }

        try{
        $detalle = Detalle::find($id);

        if($detalle == false){
            return response()->json([
                "ok" => false,
                "error" => "No se encontro"
            ]);
        }

        $detalle->update($input);

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