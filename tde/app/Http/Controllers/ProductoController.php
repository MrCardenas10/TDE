<?php

namespace App\Http\Controllers;

use App\Model\Producto;
use Illuminate\Http\Request;
use Validator;

class ProductoController extends Controller
{

    public function inicio()
    {
        $rangofechaInicio = "";
        $rangofechaFin = "";
        $Lunes = "";
        $Martes = "";
        $Miercoles = "";
        $Jueves = "";
        $Viernes = "";
        $Sabado = "";
        $Domingo = "";
        $Producto = [];

        if(date("w") == 0){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week +1 day"));
            $rangofechaFin = date('Y-m-d');

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +1 day")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +2 day")))
            ->count();
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +3 day")))
            ->count();
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +4 day")))
            ->count();
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +5 day")))
            ->count();
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +6 day")))
            ->count();
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d'))
            ->count();     
        }
        if(date("w") == 1){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week"));
            $rangofechaFin = date('Y-m-d', strtotime("-1 day"));

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +1 day")))
            ->count(); 
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +2 day")))
            ->count(); 
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +3 day")))
            ->count(); 
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +4 day")))
            ->count(); 
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +5 day")))
            ->count(); 
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 day")))
            ->count();     
        }
        if(date("w") == 2){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week -1 day"));
            $rangofechaFin = date('Y-m-d', strtotime("-2 day"));

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -1 day")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week")))
            ->count(); 
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +1 day")))
            ->count(); 
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +2 day")))
            ->count(); 
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +3 day")))
            ->count(); 
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +4 day")))
            ->count(); 
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-2 day")))
            ->count();
        }
        if(date("w") == 3){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week -2 day"));
            $rangofechaFin = date('Y-m-d', strtotime("-3 day"));

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -2 day")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -1 day")))
            ->count(); 
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week")))
            ->count(); 
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +1 day")))
            ->count(); 
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +2 day")))
            ->count(); 
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +3 day")))
            ->count(); 
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-3 day")))
            ->count();
        }
        if(date("w") == 4){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week -3 day"));
            $rangofechaFin = date('Y-m-d', strtotime("-4 day"));

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -3 day")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -2 day")))
            ->count(); 
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -1 day")))
            ->count(); 
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week")))
            ->count(); 
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +1 day")))
            ->count(); 
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +2 day")))
            ->count(); 
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-4 day")))
            ->count();
        }
        if(date("w") == 5){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week -4 day"));
            $rangofechaFin = date('Y-m-d', strtotime("-5 day"));

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -4 day")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -3 day")))
            ->count(); 
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -2 day")))
            ->count(); 
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -1 day")))
            ->count(); 
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week")))
            ->count(); 
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week +1 day")))
            ->count(); 
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-5 day")))
            ->count(); 
        }
        if(date("w") == 6){
            $rangofechaInicio = date('Y-m-d', strtotime("-1 week -5 day"));
            $rangofechaFin = date('Y-m-d', strtotime("-6 day"));

            $Lunes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -5 day")))
            ->count();
            $Martes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -4 day")))
            ->count(); 
            $Miercoles = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -3 day")))
            ->count(); 
            $Jueves = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -2 day")))
            ->count(); 
            $Viernes = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week -1 day")))
            ->count(); 
            $Sabado = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-1 week")))
            ->count(); 
            $Domingo = \DB::table('tbl_producto')
            ->whereBetween('fecha', [$rangofechaInicio, $rangofechaFin])
            ->whereDay ("fecha", date('d', strtotime("-6 day")))
            ->count(); 
            } 
            array_push($Producto, $Lunes);
            array_push($Producto, $Martes); 
            array_push($Producto, $Miercoles);
            array_push($Producto, $Jueves);
            array_push($Producto, $Viernes);
            array_push($Producto, $Sabado);
            array_push($Producto, $Domingo);

            return response()->json([
            "success" => true,
            "Producto" => $Producto,
            ]);
        }

    public function select()
    {
        $productos = Producto::select("tbl_producto.*")
            ->where("tbl_producto.estado", "1")
            ->get();

        return response()->json([
            "ok" => true,
            "data" => $productos,
        ]);
        var_dump($productos);
    }

    public function llenar($id_producto)
    {
        $producto = Producto::find($id_producto);

        return response()->json([
            "ok" => true,
            "data" => $producto,
        ]);
    }

    public function index()
    {
        $productos = Producto::select("tbl_producto.id_producto", "tbl_producto.producto", "tbl_producto.precio", "tbl_producto.cantidad", "tbl_presentacion.presentacion",
            "tbl_marca.marca", "tbl_tipo_producto.tipo_producto",
            "tbl_unidad_medida.unidad_medida", "tbl_producto.estado")
            ->join("tbl_presentacion", "tbl_producto.id_presentacion", "=", "tbl_presentacion.id_presentacion")
            ->join("tbl_marca", "tbl_producto.id_marca", "=", "tbl_marca.id_marca")
            ->join("tbl_tipo_producto", "tbl_producto.id_tipo_producto", "=", "tbl_tipo_producto.id_tipo_producto")
            ->join("tbl_unidad_medida", "tbl_producto.id_unidad_medida", "=", "tbl_unidad_medida.id_unidad_medida")
            ->get();

        return response()->json([
            "ok" => true,
            "data" => $productos,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [

            'id_producto' => 'required|numeric',
            'producto' => 'required|unique:tbl_producto|max:45',
            'precio' => 'required|numeric',
           
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            Producto::create($input);
            

            return response()->json([
                "ok" => true,
                "mensaje" => "Se registro con exito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }

    public function show($id)
    {
        $productos = Producto::select("tbl_producto.*", "tbl_presentacion.presentacion",
            "tbl_marca.marca", "tbl_tipo_producto.tipo_producto",
            "tbl_unidad_medida.unidad_medida")
            ->join("tbl_presentacion", "tbl_producto.id_presentacion", "=", "tbl_presentacion.id_presentacion")
            ->join("tbl_marca", "tbl_producto.id_marca", "=", "tbl_marca.id_marca")
            ->join("tbl_tipo_producto", "tbl_producto.id_tipo_producto", "=", "tbl_tipo_producto.id_tipo_producto")
            ->join("tbl_unidad_medida", "tbl_producto.id_unidad_medida", "=", "tbl_unidad_medida.id_unidad_medida")
            ->where("tbl_producto.id_producto", $id)
            ->first();

        return response()->json([
            "ok" => true,
            "data" => $productos,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id_producto' => 'required|numeric',
            'producto' => 'required|max:45',
            'precio' => 'required|numeric',
            'cantidad' => 'required|numeric',
            'id_presentacion' => 'required|numeric',
            'id_marca' => 'required|numeric',
            'id_tipo_producto' => 'required|numeric',
            'id_unidad_medida' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $producto = Producto::find($id);

            if ($producto == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $producto->update($input);

            return response()->json([
                "ok" => true,
                "mensaje" => "Se modifico con exito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $producto = Producto::find($id);

            if ($producto == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            if ($producto->cantidad > 0) {
                return response()->json([
                    "ok" => false,
                    "error" => "Todavía hay existencias en stock",
                ]);

            } else if ($producto->cantidad == 0) {
                $producto->update([
                    'estado' => $producto->estado == 1 ? 0 : 1,
                ]);
                return response()->json([
                    "ok" => true,
                    "mensaje" => "Se modifico con exito",
                ]);
            }
        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }
}
