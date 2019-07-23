<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\model\tipodocumento;
class tipodocumentocontroller extends Controller
{
    public function select()
    {
        $tbl_tipodocumento = tipodocumento::select("tbl_tipo_documento.id_tipo_documento","tbl_tipo_documento.tipo_documento")
        ->get();

        return response()->json([
            "ok"=>true,
            "data"=>$tbl_tipodocumento
        ]);
    }
}
