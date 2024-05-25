<?php
    $p_id_sesion = $_POST['p_id_sesion'];

    $procedure = "PAC_INGRESO_PAGOS.fun_datos_comunes(:p_id_sesion_crypt)";

    $parametros = array(':p_id_sesion_crypt'=>$p_id_sesion);
    
    $data = getArrayResult($procedure, $parametros);

    echo json_encode($data->datos[0]);
?>