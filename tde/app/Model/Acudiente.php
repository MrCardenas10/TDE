<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Acudiente extends Model
{
    protected $table = "tbl_acudiente";

    protected $fillable = [
        "id_acudiente",
        "nombres",
        "apellidos",
        "telefono",
        "correo",
        "estado"];
    public $timestamps = false;

    protected $primaryKey = 'id_acudiente';

}
