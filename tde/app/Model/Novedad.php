<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Novedad extends Model
{
    public $table = "tbl_novedad";

    protected $fillable = ["cantidad_producto", "motivo_salida", "id_producto"];

    protected $primaryKey = 'id_novedad';

    public $timestamps = false;
}
