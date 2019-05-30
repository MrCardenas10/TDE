<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    public $table = "tbl_marca";

    protected $fillable = ["marca", "estado"];

    protected $primaryKey = 'id_marca';

    public $timestamps = false;
}
