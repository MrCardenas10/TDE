<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UnidadMedida extends Model
{
    public $table = "tbl_unidad_medida";

    protected $fillable = ["unidad_medida"];

    protected $primaryKey = 'id_unidad_medida';

    public $timestamps = false;
}
