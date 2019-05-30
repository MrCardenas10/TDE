<?php

namespace App\Http\Controllers;

use App\Model\Recarga;
use App\Model\Tarjeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Validator;

class RecargaController extends Controller
{

    public function index()
    {
        $recargas = Recarga::select("tbl_recarga.*", "tbl_tarjeta.cod_tarjeta")
            ->join("tbl_tarjeta", "tbl_recarga.cod_tarjeta", "=", "tbl_tarjeta.cod_tarjeta")
            ->orderBy('id_recarga', 'desc')
            ->get();

        return response()->json([
            'ok' => true,
            'data' => $recargas,
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

        $validator = Validator::make($request->all(), [
            'monto' => 'required|numeric',
            'cod_tarjeta' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        $estado = DB::table('tbl_tarjeta')->select('estado')
            ->where('cod_tarjeta', '=', $input["cod_tarjeta"])
            ->get();

        if ($estado[0]->estado == 1) {

            if (($input["monto"] >= 1000) && ($input["monto"] <= 50000)) {

                $saldo = DB::table('tbl_tarjeta')->select('saldo')
                    ->where('cod_tarjeta', '=', $input["cod_tarjeta"])
                    ->get();

                if (($saldo[0]->saldo + $input["monto"]) <= 50000) {

                    try {
                        Recarga::create($input);

                        $tar = Tarjeta::find($input["cod_tarjeta"]);

                        $tar->update(["saldo" => $tar->saldo + $input["monto"]]);

                        return response()->json([
                            'ok' => true,
                            'mensaje' => "Se registró con exito",
                        ]);

                    } catch (\Exception $ex) {
                        return response()->json([
                            'ok' => false,
                            'error' => $ex->getMessage(),
                        ]);
                    }

                } else {
                    return response()->json([
                        'ok' => false,
                        'error' => "El valor de la recarga excede el saldo permitido, intente otro valor.",
                    ]);
                }

            } else {
                return response()->json([
                    'ok' => false,
                    'error' => "Valor de recarga no permitido",
                ]);
            }

        } else {
            return response()->json([
                'ok' => false,
                'error' => "Tarjeta inhabilitada, activela",
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_recarga
     * @return \Illuminate\Http\Response
     */
    public function show($fecha_inicio, $fecha_fin)
    {

        $recargas = DB::table('tbl_recarga')
            ->whereBetween(Str::substr('fecha', 0, 10), [$fecha_inicio, $fecha_fin])->get();

        return response()->json([
            'ok' => true,
            'data' => $recargas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_recarga
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_recarga)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'monto' => 'required|numeric',
            'cod_tarjeta' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $recarga = Recarga::find($id_recarga);

            if ($recarga == false) {
                return response()->json([
                    'ok' => false,
                    'error' => "No se encontro",
                ]);
            }

            $recarga->update($input);

            return response()->json([
                'ok' => true,
                'mensaje' => "Se modifico con exito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                'ok' => false,
                'error' => $ex->getMessage(),
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }

}