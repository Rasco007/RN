<?php
session_start();

$param['id_menu'] = $_POST['p_id_menu'];

$oper = $_POST['p_oper'];

if ($oper === 'get_datos'){
    $param['p_d_patente'] = $_POST['p_d_patente'];

    if($_POST['p_token'] == $_SESSION['captcha']['code']){
        $respuesta = ejecutar_curl(WEBSERVICE_URL.'get_datos_pase_mensual/',$param);
    }else{
        $respuesta->resultado = 'NOOK';
        $respuesta->error = 'Error al validar el Captcha. Intentelo nuevamente más tarde.';
        $respuesta = json_encode($respuesta);
    }

    echo ($respuesta);
}

if ($oper === 'validad_vigencia'){
    $param['p_d_patente'] = $_POST['p_d_patente'];
    $param['p_c_clase_aut'] = $_POST['p_c_clase_aut'];

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'validar_vigencia_pase/',$param);

    echo ($respuesta);
}

if ($oper === 'comprar_pase'){
    $param['p_d_patente'] = $_POST['p_d_patente'];
    $param['p_c_clase_aut'] = $_POST['p_c_clase_aut'];
    $param['p_i_importe'] = $_POST['p_i_importe'];

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'comprar_pase_mensual/',$param);

    echo ($respuesta);
}
