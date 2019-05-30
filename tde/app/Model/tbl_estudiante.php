<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class tbl_estudiante extends Model
{
    protected $table="tbl_estudiante";

    protected $fillable=[
        'id_persona',
        'id_acudiente',
        'estado',
];
public $timestamps=false;

protected $primaryKey = 'id_estudiante';

}
