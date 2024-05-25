<?php
session_start();

$param['id_menu'] = $_POST['p_id_menu'];

$oper = $_POST['p_oper'];

if ($oper === 'comprar_pago_ant'){
    $param['p_d_patente'] = $_POST['p_d_patente'];
    $param['p_i_importe'] = $_POST['p_i_importe'];
    $_POST['p_token'];

    if($_POST['p_token'] == $_SESSION['captcha']['code']){
    	$respuesta = ejecutar_curl(WEBSERVICE_URL.'comprar_pago_anticipado/',$param);
	}else{
        $respuesta->resultado = 'NOOK';
        $respuesta->error = 'Error al validar el Captcha. Intentelo nuevamente más tarde.';
        $respuesta = json_encode($respuesta);
    }
    echo ($respuesta);
}
