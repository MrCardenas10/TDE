<?php

Route::post('login', 'AuthController@login');

Route::post('recover', 'AuthController@recover');

Route::post('reset', 'AuthController@reset');

//Route::group(['middleware' => ['jwt.auth']], function() {

// Rutas de los usuarios

Route::post('register', 'AuthController@register');

Route::resource('/Persona', 'personaController')->except([
    'create', 'edit',
]);

Route::get('/inicioVendedor', 'ProductoController@inicio');

Route::get('/infoSaldo', 'ViEstudiante@infoSaldo');

Route::get('/vistae/{id_persona}', 'RecargaController@vistae');

Route::get('/comprase/{id_producto}', 'VentaController@comprase');

Route::put('/actualizarPerfil/{id_persona}', 'personaController@actualizarPerfil');

Route::put('/actualizarPassword/{id_persona}', 'personaController@actualizarPassword');

Route::get('tipodocumento/select', 'tipodocumentoController@select');

Route::get('rol/select', 'RolController@select');

Route::get('acudiente/select', 'acudienteController@select');

Route::resource('/Acudiente', 'acudienteController')->except([
    'create', 'edit',
]);

Route::resource('/Estudiante', 'estudianteController')->except([
    'create', 'edit',
]);

Route::resource('/Tarjeta', 'TarjetaController')->except([
    'create', 'edit',
]);

Route::get('tarjeta/select', 'TarjetaController@select');

// Rutas Producto

Route::resource('/producto', 'ProductoController')->except([
    'create', 'edit',
]);

Route::get('/select', 'ProductoController@select');

Route::resource('/presentacion', 'PresentacionController')->except([
    'create', 'edit',
]);

Route::get('/selectpresentacion', 'PresentacionController@select');

Route::resource('/marca', 'MarcaController')->except([
    'create', 'edit',
]);

Route::get('/selectmarca', 'MarcaController@select');

Route::resource('/tipoproducto', 'TipoProductoController')->except([
    'create', 'edit',
]);

Route::get('/selecttipoproducto', 'TipoProductoController@select');

Route::resource('/unidadmedida', 'UnidadMedidaController')->except([
    'create', 'edit',
]);

Route::get('/selectunidadmedida', 'UnidadMedidaController@select');

Route::resource('/novedad', 'NovedadController')->except([
    'create', 'edit',
]);

Route::resource('/entrada', 'EntradaController')->only([
    'store', 'show', 'update', 'index',
]);

Route::post('/entrada/tabla/{id_producto}', 'EntradaController@llenarentrada');

Route::get('/entrada/select', 'EntradaController@select');

// Rutas de Entrada de los Usuarioos

Route::resource('/visitante', 'VisitanteController')->except([
    'create', 'edit',
]);

Route::resource('/entradavisitante', 'EntradaVisitanteController')->except([
    'create', 'edit', 'destroy',
]);

Route::resource('/entradaestudiante', 'EntradaEstudianteController')->except([
    'create', 'edit',
]);

Route::get('/visitantes/select', 'VisitantesController@select');

Route::get('/persona/selectAdmin', 'personaController@selectAdmin');

Route::get('/persona/selectEstudiante', 'personaController@selectEstudiante');

//Ruta de Recarga

Route::resource('/recarga', 'RecargaController')->except([
    'create', 'edit',
]);

Route::get('/recarga/show/{fecha_inicio}/{fecha_fin}', 'RecargaController@show');

Route::get('/saludo', 'RecargaController@saludo');

Route::get('/reporte/{inicio}/{fin}', 'RecargaController@reporte');

// Rutas Venta

Route::resource('/venta', 'VentaController')->except([
    'create', 'edit',
]);
Route::get('/saludoventa', 'VentaController@saludo');

Route::post('/venta/tabla/{id_producto}', 'VentaController@llenar');
Route::get('/venta/show/{fecha_inicio}/{fecha_fin}', 'VentaController@filtro');
Route::get('/comprobante/{id}', 'VentaController@comprobante');

Route::get('logout', 'AuthController@logout');
Route::get('test', function () {
    return response()->json(['foo' => 'bar']);
});
//});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
