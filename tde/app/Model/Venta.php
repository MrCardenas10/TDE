<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = "tbl_venta";
    protected $fillable = ["Monto_Venta", "cod_tarjeta"];
    protected $primaryKey = "id_venta";
    public $timestamps = false;
}
