<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    
    public $table = "tbl_tipo_documento";
    protected $fillable = ["nombre_tipo_documento"];
    protected $primaryKey = 'id_tipo_documento';
    public $timestamps = false;

}
