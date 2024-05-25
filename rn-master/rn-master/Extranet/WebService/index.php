<?php
session_start();
$_SESSION['entorno'] = 'WEBSERVICE';
include '../../Framework/Proyecto/Config/path-conf.php';
include '../../Framework/Nucleo/Config/path-conf.php';
require_once WEBSERVICE_FRAMEWORK.'init.php';
require_once 'core/json_constructor.php';

$app->get('/sol_clave_fiscal/{param}', function($param) use ($app) {
    $controllerResult = json_decode($param);
    return $app->json($controllerResult);
});

$app->get('/get_autocomplete_tipo_solicitud/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_autocomplete_data($obj);
    return $app->json($controllerResult);
});

$app->get('/get_vencimientos/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_vencimientos_data($obj);
    return $app->json($controllerResult);
});

$app->get('/checkUserExists/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = checkUserExists($obj);
    return $app->json($controllerResult);
});

$app->run();
