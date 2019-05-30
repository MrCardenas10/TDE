<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class EntradaVisitante extends Model
{
    public $table = "tbl_entrada_sistema";
    protected $fillable = ["fecha_entrada_visitante","motivo","id_visitante","id_persona"];
    protected $primaryKey='id_entrada_visitante';
    public $timestamps = false;
}
