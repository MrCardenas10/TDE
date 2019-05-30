<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class DetalleEntradaLector extends Model
{
    public $table = "tbl_detalle_estudiante";
    protected $fillable = ["id_entrada_lector","cod_tarjeta"];
    protected $primaryKey = 'id_detalle_estudiante';
    public $timestamps = false;
}
