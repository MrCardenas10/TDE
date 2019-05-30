<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    public $table = "tbl_entrada_producto";

    protected $fillable = ["fecha_entrada"];

    protected $primaryKey = 'id_entrada_producto';

    public $timestamps = false;
}
