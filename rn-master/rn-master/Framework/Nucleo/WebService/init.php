<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');*/
require_once WEBSERVICE_FRAMEWORK.'core/autoload_ws.php';
require_once WEBSERVICE_FRAMEWORK.'core/before_ws.php';
require_once WEBSERVICE_FRAMEWORK.'core/funciones_webserv.php';
require_once WEBSERVICE_FRAMEWORK.'core/json_constructor.php';

use auth\Silex\Application as Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Application();
$app['debug'] = true;

$app->get('/', function(Request $request) use ($app) {
    $data = array('token' => $request->attributes->get('X-Token'), 'title' => $request->attributes->get('X-Title'));
    return $app->json($data);
});

$app->get('/get_grid/{p_menu}/{p_grid}', function($p_menu, $p_grid) use ($app) {
    $controllerResult = get_grilla_loader($p_menu, $p_grid);
    return $app->json($controllerResult);
});

$app->get('/get_jqgrid_header/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_jqgrid_header($obj);
    return $app->json($controllerResult);
});

$app->get('/get_jqgrid_data/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_jqgrid_data($obj);
    return $app->json($controllerResult);
});

$app->get('/maestro_add/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = maestro($obj);
    return $app->json($controllerResult);
});

$app->get('/maestro_edit/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = maestro($obj);
    return $app->json($controllerResult);
});

$app->get('/maestro_delete/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = maestro($obj);
    return $app->json($controllerResult);
});

$app->get('/get_lupa_generica_data/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_lupa_data($obj);
    return $app->json($controllerResult);
});

$app->get('/get_lupa_cod_data/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_lupa_cod_data($obj);
    return $app->json($controllerResult);
});

$app->get('/llamar_report/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = llamar_report($obj);
    return $app->json($controllerResult);
});

$app->get('/get_export_pdf_data/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_export_pdf_data($obj);
    return $app->json($controllerResult);
});

$app->get('/get_export_excel_data/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_export_excel_data($obj);
    return $controllerResult;
});

$app->get('/maestro_abm/{param}', function($param) use ($app){
    $obj = json_decode(decodeurl($param));
    $controllerResult = maestro($obj);
    return $app->json($controllerResult);
});

$app->get('/get_scf_menus/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_scf_menus($obj);
    return $app->json($controllerResult);
});

$app->get('/llamar_report_file/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = llamar_report_file($obj);
    return $app->json($controllerResult);
});

$app->error(function(\Exception $e, $code) use ($app) {
    $message = new stdClass();
    switch ($code) {
        case 400:
            $message->code = 'NOOK';
            $message->cons = 'BadRequest';
            $message->msg = 'Bad Request';
            $message->cod = 400;
            break;
        case 401:
            $message->code = 'NOOK';
            $message->cons = 'NoLog';
            $message->msg = 'Not Log';
            $message->cod = 401;
            break;
        case 403:
            $message->code = 'NOOK';
            $message->cons = 'Forbidden';
            $message->msg = 'Forbidden';
            $message->cod = 403;
            break;
        case 404:
            $message->code = 'NOOK';
            $message->cons = 'NotFound';
            $message->msg = 'Not Found';
            $message->cod = 404;
            break;
        case 406:
            $message->code = 'NOOK';
            $message->cons = 'NotAcceptable';
            $message->msg = 'Not Acceptable';
            $message->cod = 406;
            break;
        default:
            $message->code = 'NOOK';
            $message->cons = 'Default';
            $message->msg = $e->getMessage();/*'Ha ocurrido un error con su Consulta, si el error persiste, por favor contactarse con el equipo de Sistemas.';*/
            $message->cod = 0;
    }
    return $app->json($message);
});
