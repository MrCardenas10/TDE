<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class EntradaEstudiante extends Model
{
    
    public $table = "tbl_entrada_lector";
    protected $fillable = ["fecha_entrada", "entrada"];
    protected $primaryKey='id_entrada_lector';
    public $timestamps = false;

}
