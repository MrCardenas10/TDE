<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\model\tipodocumento;
class tipodocumentocontroller extends Controller
{
    public function select()
    {
        $tbl_tipodocumento = tipodocumento::all();

        return response()->json([
            "ok"=>true,
            "data"=>$tbl_tipodocumento
        ]);
    }
}
