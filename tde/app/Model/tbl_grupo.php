<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class tbl_grupo extends Model
{
    protected $table="grupo";

    protected $fillable=[
    'grupo',
];

    public $timestamps=false;

    protected $primaryKey = 'id_grupo';

}
