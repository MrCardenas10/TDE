<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ProductoHasVenta extends Model
{
    public $table = "tbl_detalle_venta_producto";
    protected $fillable = ["cantidad", "total", "id_venta", "id_producto"];
    protected $primaryKey = 'id_detalle_venta';
    public $timestamps = false;
}
