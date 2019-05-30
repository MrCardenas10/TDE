<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Detalle extends Model
{
    public $table = "tbl_detalle_producto";

    protected $fillable = ["cantidad_producto", "id_producto", "id_entrada_producto"];

    protected $primaryKey = 'id_detalle_producto';

    public $timestamps = false;
}
