<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class tbl_rol extends Model
{

    protected $table="rol";

    protected $fillable=[
    'rol',
];

    public $timestamps=false;

    protected $primaryKey = 'id_rol';


}
