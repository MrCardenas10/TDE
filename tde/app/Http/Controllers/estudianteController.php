<?php

namespace App\Http\Controllers;

use App\Model\Acudiente;
use App\Model\Estudiante;
use App\Model\Persona;
use Illuminate\Http\Request;
use Validator;

class estudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     *
     */

    public function select()
    {
        $tbl_estudiante = Estudiante::all();

        return response()->json([
            "ok" => true,
            "data" => $tbl_estudiante,
        ]);
    }

    public function index()
    {
        $tbl_estudiante = Estudiante::select("tbl_persona.id_persona","tbl_persona.nomrbes","tbl_persona.apellidos",
        "tbl_persona.email","tbl_persona.telefono","tbl_persona.genero","tbl_tipo_documento.tipo_documento","tbl_acudiente.nombres","tbl_acudiente.apellidos")
            ->join("tbl_tipo_documento", "tbl_persona.id_tipo_documento", "=", "tbl_tipo_documento.id_tipo_documento")
            ->join("tbl_acudiente", "tbl_persona.id_acudiente", "=", "tbl_acudiente.id_acudiente")
            ->where("tbl_persona.rol","1")
            ->get();

        return response()->json([
            "ok" => true,
            "data" => $tbl_estudiante,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id_persona' => 'required',
            'id_acudiente' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);

        }

        $est = Estudiante::find($input["id_persona"]);

        $per = Persona::find($input["id_persona"]);

        $acu = Acudiente::find($input["id_acudiente"]);

        if ($est == null) {

            if ($per != null) {

                if ($acu != null) {

                    if ($per->rol == 1) {

                        try {
                            Estudiante::create($input);

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

                    } else {
                        return response()->json([
                            "ok" => false,
                            "error" => "El documento ingresado no pertenece a un estudiante, Verifique",
                        ]);
                    }
                } else {
                    return response()->json([
                        "ok" => false,
                        "error" => "El acudiente ingresado no existe, Verifique",
                    ]);
                }
            } else {
                return response()->json([
                    "ok" => false,
                    "error" => "El estudiante ingresado no existe, Verifique",
                ]);
            }
        } else {
            return response()->json([
                "ok" => false,
                "error" => "El estudiante ingresado ya fue registrado",
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tbl_estudiante = Estudiante::select("tbl_estudiante.*", "tbl_persona.id_persona", "tbl_acudiente.id_acudiente")
            ->join("tbl_persona", "tbl_estudiante.id_persona", "=", "tbl_persona.id_persona")
            ->join("tbl_acudiente", "tbl_estudiante.id_acudiente", "=", "tbl_acudiente.id_acudiente")
            ->where("tbl_estudiante.documento_estudiante", $id)
            ->first();

        return response()->json([
            "ok" => true,
            "data" => $tbl_estudiante,
        ]);

    }

    public function update(Request $request, $id)
    {

        $input = $request->all();

        $validator = Validator::make($input, [

            'id_persona' => 'required',
            'id_acudiente' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $tbl_estudiante = Estudiante::find($id);

            if ($tbl_estudiante == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tbl_estudiante->update($input);

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
            $tbl_estudiante = Estudiante::find($id);

            if ($tbl_estudiante == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tbl_estudiante->update([
                'estado' => $tbl_estudiante->estado == 1 ? 0 : 1,
            ]);

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
}
