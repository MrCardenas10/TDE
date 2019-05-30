<?php

namespace App\Http\Controllers;

use App\Model\Acudiente;
use Illuminate\Http\Request;
use Validator;

class AcudienteController extends Controller
{

    public function select()
    {
        $lis_tbl_acudiente = Acudiente::select("tbl_acudiente.nombres","tbl_acudiente.apellidos","tbl_acudiente.id_acudiente",
    "tbl_acudiente.correo","tbl_acudiente.estado","tbl_acudiente.telefono")
    ->where("tbl_acudiente.estado","1")
    ->get();

        return response()->json([
            "ok" => true,
            "data" => $lis_tbl_acudiente,
        ]);
    }

    public function index()
    {

        $tbl_acudiente = Acudiente::select("tbl_acudiente.*")
            ->orderBy('id_acudiente', 'desc')
            ->get();
        return response()->json([
            "ok" => true,
            "data" => $tbl_acudiente,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [

            'id_acudiente' => 'required',
            'nombres' => 'required',
            'telefono' => 'required|numeric',
            'apellidos' => 'required',
            'correo' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);

        }

        try {
            Acudiente::create($input);

            return response()->json([
                "ok" => true,
                "mensaje" => "El acudiente se registro con exito",
            ]);

        } catch (\exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }

    public function show($id)
    {
        $tbl_acudiente = Acudiente::select("tbl_acudiente.*")
            ->where("tbl_acudiente.id_acudiente", $id)
            ->first();

        return response()->json([
            "ok" => true,
            "data" => $tbl_acudiente,
        ]);
    }

    public function update(Request $request, $id)
    {

        try {

            $input = $request->all();

            $acudiente = Validator::make($input, [

                'nombres' => 'required',
                'telefono' => 'required|numeric',
                'apellidos' => 'required',
                'documento' => 'required',
                'correo' => 'required',

            ]);

            if ($acudiente->fails()) {
                return response()->json([
                    'ok' => false,
                    'error' => $acudiente->messages(),
                ]);

            }

            $acudiente = Acudiente::find($id);

            if ($acudiente == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "Los sentimos  no se pudo encontrar el datos que estaba buscando,
                        por favor inténtelo nuevamente.",
                ]);
            }

            $acudiente->update($input);

            return response()->json([
                "ok" => true,
                "mensaje" => "Se registro con exito",
            ]);

        } catch (\exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $acudiente = Acudiente::find($id);

            if ($acudiente == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $acudiente->update([
                'estado' => $acudiente->estado == 1 ? 0 : 1,
            ]);

            return response()->json([
                "ok" => true,
                "mensaje" => "Se cambio el estado con exito",
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }
    }
}
