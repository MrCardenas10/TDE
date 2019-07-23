<?php

namespace App\Http\Controllers;

use App\Model\Persona;
use App\Model\Tarjeta;
use Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Validator;


class personaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     *
     */

    public function selectAdmin()
    {
        $lis_persona = Persona::select("tbl_persona.id_persona", "tbl_persona.nombres", "tbl_persona.rol")
            ->where("tbl_persona.rol", "2")
            ->get();
        return response()->json([
            "ok" => true,
            "data" => $lis_persona,
        ]);
    }

    public function selectEstudiante()
    {
        $lis_persona = Persona::select("tbl_persona.id_persona", "tbl_persona.nombres", "tbl_persona.rol")
            ->rightJoin("tbl_tarjeta","tbl_tarjeta.id_persona","=","tbl_persona.id_persona") 
            ->where("tbl_persona.rol", "1")
            ->get();

            $lis_personas = DB::table('tbl_persona')
            ->where("tbl_persona.rol","1")->                     
            whereNotExists(function($query)
            {
                $query->select(DB::raw(1))
                      ->from('tbl_tarjeta')
                      ->where("tbl_persona.rol","1")                     
                      ->whereRaw('tbl_persona.id_persona = tbl_tarjeta.id_persona');
            })
            ->get();

        return response()->json([
            "ok" => true,
            "data" => $lis_personas,
        ]);
    }

    public function index()
    {
        $tbl_persona = Persona::select("tbl_persona.id_persona", "tbl_persona.nombres", "tbl_persona.apellidos", "tbl_persona.email", "tbl_persona.estado", "tbl_persona.genero", "tbl_persona.telefono",
            "tbl_rol.rol", "tbl_tipo_documento.tipo_documento")
            ->join("tbl_rol", "tbl_persona.rol", "=", "tbl_rol.id_rol")
            ->join("tbl_tipo_documento", "tbl_persona.id_tipo_documento", "=", "tbl_tipo_documento.id_tipo_documento")
            ->get();
        return response()->json([
            "ok" => true,
            "data" => $tbl_persona,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

        $validator = Validator::make($input, [
            'id_persona' => 'required|unique:tbl_persona|numeric',
            'nombres' => 'required',
            'apellidos' => 'required',
            'email' => 'required|unique:tbl_persona|max:255',
            'password' => 'required|',
            'telefono' => 'required|numeric',
            'genero' => 'required',
            'rol' => 'required',
            'id_tipo_documento' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);

        }

        try {
            $id_persona = $request->id_persona;
            $nombres = $request->nombres;
            $apellidos = $request->apellidos;
            $email = $request->email;
            $password = $request->password;
            $telefono = $request->telefono;
            $genero = $request->genero;
            $rol = $request->rol;
            $id_acudiente = $request->id_acudiente;
            $id_tipo_documento = $request->id_tipo_documento;

            Persona::create([
                'id_persona' => $id_persona,
                'nombres' => $nombres,
                'apellidos' => $apellidos,
                'email' => $email,
                'password' => Hash::make($password),
                'telefono' => $telefono,
                'genero' => $genero,
                'rol' => $rol,
                'id_acudiente' => $id_acudiente,
                'id_tipo_documento' => $id_tipo_documento,
            ]);

            return response()->json([
                "ok" => true,
                "mensaje" => "El usuario se registró con éxito",
            ]);

        } catch (\exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => $ex->getMessage(),
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_persona
     * @return \Illuminate\Http\Response
     */
    public function show($id_persona)
    {
        $tbl_persona = Persona::select("tbl_persona.*", "tbl_tipo_documento.id_tipo_documento","tbl_tipo_documento.tipo_documento")
            ->join("tbl_tipo_documento", "tbl_persona.id_tipo_documento", "tbl_tipo_documento.id_tipo_documento")
            ->where("tbl_persona.id_persona", $id_persona)
            ->first();

        return response()->json([
            "ok" => true,
            "data" => $tbl_persona,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_persona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_persona)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombres' => 'required',
            'apellidos' => 'required',
            'genero' => 'required',
            'telefono' => 'required|numeric',
            'id_tipo_documento' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $tbl_persona = Persona::find($id_persona);

            if ($tbl_persona == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tbl_persona->update($input);

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

    public function actualizarPassword(Request $request, $id_persona)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'newpassword' => 'required|max:45',
            'confirmPassword' => 'required|same:newpassword',
            ]);
        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }
        $newpassword = $request->newpassword;
        $usuario = Persona::select("tbl_persona.id_persona")
        ->where("tbl_persona.id_persona", $id_persona)
        ->first();

        try {
            $userpwd = Persona::find($usuario->id_persona);

            if ($userpwd == false) {
                return response()->json([
                    'ok'=> false,
                    'error'=> "Usuario no encontrado."
                ]);
            }

            $userpwd -> update(['password' => Hash::make($newpassword)]);
            return response()->json([
                'ok'=> true,
                'mensaje'=> "Actualización de contraseña exitosa."
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'ok'=> false,
                'error'=> "Problemas con la actulización de la contraseña"
            ]);
        }
    }

    public function actualizarPerfil(Request $request, $id_persona)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombres' => 'required',
            'apellidos' => 'required',
            'genero' => 'required',
            'telefono' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }

        try {
            $tbl_persona = Persona::find($id_persona);

            if ($tbl_persona == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tbl_persona->update($input);

            $nombres = Persona::select("tbl_persona.nombres")
            ->where("tbl_persona.id_persona",$id_persona)
            ->first();
            $genero = Persona::select("tbl_persona.genero")
            ->where("tbl_persona.id_persona",$id_persona)
            ->first();
            $apellidos = Persona::select("tbl_persona.apellidos")
            ->where("tbl_persona.id_persona",$id_persona)
            ->first();
            $telefono = Persona::select("tbl_persona.telefono")
            ->where("tbl_persona.id_persona",$id_persona)
            ->first();

            return response()->json([
                "ok" => true,
                "mensaje" => "Se ah actualizado exitosamente tu información",
                'nombres' => $nombres,
                'telefono' => $telefono,
                'apellidos' => $apellidos,
                'genero' => $genero
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                "ok" => false,
                "error" => "Error al actualizar tu información",
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id_persona
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_persona)
    {
        try {
            $tbl_persona = Persona::find($id_persona);

            if ($tbl_persona == false) {
                return response()->json([
                    "ok" => false,
                    "error" => "No se encontro",
                ]);
            }

            $tbl_persona->update([
                'estado' => $tbl_persona->estado == 1 ? 0 : 1,
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