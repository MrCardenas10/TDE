<?php

namespace App\Http\Controllers;

use App\Model\Rol;

class RolController extends Controller
{
    public function select()
    {
        $roles = Rol::all();

        return response()->json([
            "ok" => true,
            "data" => $roles,
        ]);
    }
}
