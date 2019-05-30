<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class tbl_grado extends Model
{
    protected $table="grado";

    protected $fillable=[

    'grado',

];

    public $timestamps=false;

    protected $primaryKey = 'id_grado';

}
