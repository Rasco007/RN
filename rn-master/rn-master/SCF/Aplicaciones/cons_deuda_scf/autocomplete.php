<?php
session_start();

$param['id_menu'] = $_POST['p_id_menu'];;

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getContribuyente'){
    $param['p_n_cuit'] = $filtro;

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'get_contribuyente_scf/',$param);

    echo ($respuesta);
}

if ($oper === 'getAutocomplete'){
    $param['filtro'] = $filtro;

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'get_autocomplete_scf/',$param);

    echo $respuesta;
}

if ($oper === 'getDeuda'){
    $param['p_d_objeto_hecho'] = $_POST['p_d_objeto_hecho'];
    $param['p_n_cuit'] = $_POST['p_n_cuit'];
    $param['p_c_tributo'] = $_POST['p_c_tributo'];
    $param['p_f_actualizacion'] = $_POST['p_f_actualizacion'];

    if($_POST['p_token'] == $_SESSION['captcha']['code']){
        $respuesta = ejecutar_curl(WEBSERVICE_URL.'get_deuda_scf/',$param);
    }else{
        $respuesta->resultado = 'NOOK';
        $respuesta->error = 'Error al validar el Captcha. Intentelo nuevamente más tarde.';
        $respuesta = json_encode($respuesta);
    }

    echo ($respuesta);
}

if ($oper === 'emitirBoleta'){
    $param['p_id_obligaciones'] = $_POST['p_id_obligaciones'];
    $param['p_f_actualizacion'] = $_POST['p_f_actualizacion'];
    $param['p_id_sesion'] = $_POST['p_id_sesion'];
    $param['p_c_tributo'] = $_POST['p_c_tributo'];
    $param['p_filas'] = $_POST['p_filas'];

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'emitir_boleta_scf/',$param);

    echo ($respuesta);
}

if ($oper === 'actualizarDeuda'){
    $param['p_f_actualizacion'] = $_POST['p_f_actualizacion'];
    $param['p_id_sesion'] = $_POST['p_id_sesion'];

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'actualizar_deuda_scf/',$param);

    echo ($respuesta);
}