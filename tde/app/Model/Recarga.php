<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Recarga extends Model
{
    public $table = "tbl_recarga";

    protected $fillable = ["monto","cod_tarjeta"];
    protected $primaryKey = "id_recarga";

    public $timestamps = false;
}
