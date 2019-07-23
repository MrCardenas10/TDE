<?php

namespace App\Http\Controllers;

use App\Model\Persona;
use App\Model\tarjeta;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;

class TarjetaController extends Controller
{

    public function select(){
        $tarjeta = tarjeta::select("tbl_tarjeta.cod_tarjeta")
        ->get();

        return response()->json([
            "ok" => true,
            "data" => $tarjeta
        ]);
    }

    

    public function index()
    {
        $tarjeta = tarjeta::select("tbl_tarjeta.cod_tarjeta","tbl_tarjeta.saldo","tbl_tarjeta.estado","tbl_persona.id_persona",
        "tbl_persona.nombres","tbl_persona.apellidos","tbl_persona.email")
            ->join("tbl_persona", "tbl_tarjeta.id_persona", "=", "tbl_persona.id_persona")
            ->get();

        return response()->json([
            "ok" => true,
            "data" => $tarjeta,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'cod_tarjeta' => 'required',
            'id_persona' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);

        }

        $est = Persona::select("tbl_persona.id_persona")
        ->where("tbl_persona.rol","1")
        ->where("tbl_persona.id_persona",$input["id_persona"])
        ->first();

        $tar = tarjeta::find($input["cod_tarjeta"]);
        if ($tar["cod_tarjeta"] == null) {

            if ($est["id_persona"] != null) {

                $tarjeta = tarjeta::select("tbl_tarjeta.id_persona")
                    ->where("tbl_tarjeta.id_persona", "=", $input["id_persona"])
                    ->first();

                if ($tarjeta["id_persona"] == null) {

                    

                    try {
                        $cod_tar = $request ->cod_tarjeta;
                    $per = $request ->id_persona;
                        tarjeta::create([
                            'cod_tarjeta' => $cod_tar,
                            'id_persona' => $per
                        ]);

                        return response()->json([
                            "ok" => true,
                            "mensaje" => "Se registró con éxito la tarjeta",
                        ]);

                    } catch (\exception $ex) {
                        return response()->json([
                            "ok" => false,
                            "error" => $ex->getMessage(),
                        ]);
                    }
                } else {
                    return response()->json([
                        "ok" => false,
                        "error" => "El estudiante ya tiene una tarjeta asignada.",
                    ]);
                }
            } else {
                return response()->json([
                    "ok" => false,
                    "error" => "El estudiante ingresado no existe,Verifique.",
                ]);
            }
        } else {
            return response()->json([
                "ok" => false,
                "error" => "El código de la tarjeta ingresado ya existe, Intente con otro.",
            ]);
        }

    }

    public function show($id)
    {
        $tarjeta = tarjeta::select("tbl_tarjeta.*", "tbl_estudiante.documento_estudiante")
            ->join("tbl_estudiante", "tbl_tarjeta.id_estudiante", "=", "tbl_estudiante.documento_estudiante")
            ->where("tbl_tarjeta.cod_tarjeta", $id)
            ->first();

        return response()->json([
            "ok" => true,
            "data" => $tarjeta,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();

        $Validator = Validator::make($input, [
            'cod_tarjeta' => 'required',
            'saldo' => 'required',
            'id_estudiante' => 'required',
        ]);

        if ($Validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $Validator->messages(),
            ]);
        }

        try {
            $tarjeta = tarjeta::find($id);

            if ($tarjeta == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tarjeta->update($input);

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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $tarjeta = tarjeta::find($id);

            if ($tarjeta == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tarjeta->update([
                'estado' => $tarjeta->estado == 1 ? 0 : 1,
            ]);

            return response()->json([
                "ok" => true,
                "mensaje" => "Se cambió el estado con éxito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }
}
