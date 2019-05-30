<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Visitante extends Model
{
    public $table = "tbl_visitante";
    protected $fillable = ["id_visitante","nombre_visitante","apellido_visitante","estado"];
    protected $primaryKey='id_visitante';
    public $timestamps = false;
}
