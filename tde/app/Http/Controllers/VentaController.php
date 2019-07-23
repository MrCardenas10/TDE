<?php

namespace App\Http\Controllers;

use App\Model\Producto;
use App\Model\ProductoHasVenta;
use App\Model\Tarjeta;
use App\Model\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use PDF;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $ventas = Venta::select("tbl_venta.*", "tbl_tarjeta.cod_tarjeta")
            ->join("tbl_tarjeta", "tbl_venta.cod_tarjeta", "=", "tbl_tarjeta.cod_tarjeta")
            ->orderBy('id_venta', 'desc')
            ->get();

        return response()->json([
            'ok' => true,
            'data' => $ventas,
        ]);

    }

    public function comprase($id_persona)
    {
        $ventas = Venta::select("tbl_venta.*", "tbl_tarjeta.cod_tarjeta")
            ->join("tbl_tarjeta", "tbl_venta.cod_tarjeta", "=", "tbl_tarjeta.cod_tarjeta")
            ->join("tbl_persona", "tbl_tarjeta.id_persona", "=", "tbl_persona.id_persona")
            ->where("tbl_persona.id_persona", "=", $id_persona)
            ->orderBy('id_venta', 'desc')
            ->get();

        return response()->json([
            'ok' => true,
            'data' => $ventas,
        ]);

    }

    public function saludo()
    {
        $ventasu = Venta::take(5)
            ->orderBy('id_venta', 'desc')
            ->get();

        return response()->json([
            'ok' => true,
            'data' => $ventasu,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response

     */

    public function comprobante($id)
    {

        $venta = Venta::select("tbl_venta.*", 'tbl_venta.fecha as fecha_v')
            ->join("tbl_tarjeta", "tbl_venta.cod_tarjeta", "=", "tbl_tarjeta.cod_tarjeta")
            ->where("tbl_venta.id_venta", "=", $id)
            ->get();

        

        $detalle = ProductoHasVenta::select("tbl_detalle_venta_producto.*", "tbl_producto.producto")
            ->join("tbl_producto", "tbl_detalle_venta_producto.id_producto", "=", "tbl_producto.id_producto")
            ->where("tbl_detalle_venta_producto.id_venta", "=", $id)
            ->get();

        $pdf = PDF::loadView('comprobante', compact('venta', 'detalle'));
        return $pdf->stream('invoice');
    }

    public function llenar(Request $request, $id_producto)
    {

        $input = $request->all(); //aqui estoy llamando todo lo que me trae de la vista

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

        $productos = $request->data;
        $encabezado = $request->hola;
        $valor = 0;

        foreach ($productos as $value) {
            $valor += $value["precio"];

        }

        $saldo = DB::table('tbl_tarjeta')->select('saldo')
            ->where('cod_tarjeta', '=', $encabezado)
            ->get();

        if ($valor <= $saldo[0]->saldo) {

            try {
                $venta = Venta::create(["Monto_Venta" => $valor, "cod_tarjeta" => $encabezado]);

                foreach ($productos as $value) {

                    ProductoHasVenta::create(["cantidad" => $value["cantidad"],
                        "total" => $value["precio"],
                        "id_venta" => $venta->id_venta,
                        "id_producto" => $value["id_producto"]]);

                    $pro = Producto::find($value["id_producto"]);

                    $pro->update(["cantidad" => $pro->cantidad - $value["cantidad"]]);

                }

                $tar = Tarjeta::find($encabezado);

                $tar->update(["saldo" => $tar->saldo - $valor]);

                return response()->json([
                    'ok' => true,
                    'mensaje' => "Se registró exitosamente",
                ]);
            } catch (\Exception $th) {
                return response()->json([
                    'ok' => false,
                    'error' => $th->getMessage(),
                ]);
            }

        } else {
            return response()->json([
                'ok' => false,
                'error' => "No cuenta con dinero suficiente para hacer la compra.",
            ]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id_venta)
    {
        $ventas = ProductoHasVenta::select("tbl_detalle_venta_producto.*", "tbl_producto.producto")
            ->join("tbl_producto", "tbl_detalle_venta_producto.id_producto", "=", "tbl_producto.id_producto")
            ->where("tbl_detalle_venta_producto.id_venta", "=", $id_venta)
            ->get();

        return response()->json([
            'ok' => true,
            'data' => $ventas,
        ]);

    }

    public function filtro($fecha_inicio, $fecha_fin)
    {
        $ventas = DB::table('tbl_venta')
            ->whereBetween(Str::substr('fecha', 0, 10), [$fecha_inicio, $fecha_fin])->get();

        return response()->json([
            'ok' => true,
            'data' => $ventas,
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
