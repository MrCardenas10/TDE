<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{

    protected $table = "tbl_persona";

    protected $fillable = [
        'id_persona',
        'nombres',
        'apellidos',
        'email',
        'password',
        'estado',
        'telefono',
        'genero',
        'rol',
        'id_tipo_documento',
        'id_acudiente',
    ];

    public $timestamps = false;

    protected $primaryKey = 'id_persona';
}
