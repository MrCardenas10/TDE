<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $table = "tbl_estudiante";

    protected $fillable = [
        'id_persona',
        'id_acudiente'];
    public $timestamps = false;

    protected $primaryKey = 'id_persona';

}
