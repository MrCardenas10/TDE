<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Presentacion extends Model
{
    public $table = "tbl_presentacion";

    protected $fillable = ["presentacion", "estado"];

    protected $primaryKey = 'id_presentacion';

    public $timestamps = false;
}
