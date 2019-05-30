<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    public $table = "tbl_producto";

    protected $fillable = ["id_producto", "producto", "estado", "precio",
    "cantidad", "id_presentacion", "id_marca", "id_tipo_producto",
    "id_unidad_medida"];

    protected $primaryKey = 'id_producto';
    
    public $timestamps = false;
}
