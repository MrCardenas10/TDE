<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class tarjeta extends Model
{
    
    public $table = "tbl_tarjeta";
    protected $fillable = ["cod_tarjeta","saldo" ,"estado", "id_persona"];
    protected $primaryKey = 'cod_tarjeta';
    public $timestamps = false;

}
