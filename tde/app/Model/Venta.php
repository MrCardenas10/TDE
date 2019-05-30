<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = "tbl_venta";
    protected  $fillable = ["fecha","Monto_Venta","cod_tarjeta","id_tipo_pago"];
    protected $primaryKey = "id_venta";
    public $timestamps = false;
}
