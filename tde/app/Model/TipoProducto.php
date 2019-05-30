<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class TipoProducto extends Model
{
    public $table = "tbl_tipo_producto";

    protected $fillable = ["tipo_producto", "estado"];

    protected $primaryKey = 'id_tipo_producto';

    public $timestamps = false;
}
