<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{

    protected $table = "tbl_rol";

    protected $fillable = [
        'rol',
    ];

    public $timestamps = false;

    protected $primaryKey = 'id_rol';

}
