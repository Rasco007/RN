<?php

$procedure = "pac_fiscalizacion.FUN_TRAER_TITULOS(:p_id_inspeccion, :p_id_evento)";
$parametros = array(':p_id_inspeccion'=>$_POST['p_id_inspeccion'],
':p_id_evento'=>$_POST['p_id_evento']);      
   
$data = getArrayResult($procedure, $parametros);     


    $response->columnas = $data;
    
    $response->resultado = 'OK';

    echo json_encode($response);
   


?>