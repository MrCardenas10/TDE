<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->int('id');
            $table->string('name',60);
            $table->string('email',60)->unique();
            $table->timestamp('email_verified_at',6)->nullable();
            $table->string('password',255);
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('id_tipo_documento')->references('id_tipo_documento')->on('tbl_tipo_documento');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
