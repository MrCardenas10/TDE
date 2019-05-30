<?php

namespace App\Http\Controllers;

use App\Model\Producto;
use App\Model\ProductoHasVenta;
use App\Model\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response

     */

    public function llenar(Request $request, $id_producto)
    {

        $input = $request->all(); //aqui estoy llamando todo lo que me trae de la vista

        // if ($input["cantidad"] === null) {
        //     $input["cantidad"] = 1;
        // }
        $producto = Producto::find($id_producto); // aqui estoy diciendo que me busque por ese id

        if ($producto != null) {
            // if ($input["cantidad"] < $producto->cantidad) {
                // $producto->cantidad = $input["cantidad"];

                return response()->json([
                    'ok' => true,
                    'data' => $producto,
                ]);
            // } else {
            //     return response()->json([
            //         'ok' => false,
            //         'error' => " El producto no cuenta con cantidades en stocks",
            //     ]);
            // }
        } else {
            return response()->json([
                'ok' => false,
                'error' => "El producto no existe ",
            ]);
        }

    }

    public function store(Request $request)
    {
        $input = $request->all();

        $valor = 0;
        $producto = Producto::find($input["id_producto"]);
        $producto->cantidad = $input["cantidad"];

        foreach ($producto as $key => $value) {
            $valor += $input["cantidad"] * $producto->precio;
        }
       

       
            $venta = Venta::create(["Monto_Venta" => $valor, "Cod_Tarjeta" => $input["Cod_Tarjeta"], "tipo_pago" => $input["tipo_pago"]]);

        

            $valor = $producto->cantidad * $producto->precio;


            foreach ($producto as $key => $value) {
                ProductoHasVenta::create(["cantidad" => $producto->cantidad,
                "total" => $valor,
                "id_venta" => $venta->Id_venta,
                "id_producto" => $producto->id_producto]);

            return response()->json([
                'ok' => true,
                'mensaje' => "Registro con exito",
            ]);
            }

            

        

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id_producto)
    {
        $producto = Producto::select("tbl_producto.*")
            ->where("tbl_producto.id_producto", "=", $id_producto)
            ->first();

        return response()->json([
            'ok' => true,
            'data' => $producto,
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
