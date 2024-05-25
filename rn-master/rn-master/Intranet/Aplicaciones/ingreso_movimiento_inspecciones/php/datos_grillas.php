<?php
$tipo_consulta = $_POST['p_tipo_consulta'];
$id_inspeccion = $_POST['p_id_inspeccion'];
$id_plan_fis = $_POST['p_id_plan_fis'];

switch ($tipo_consulta) {
    case 'FrmGrid_main_grid':
    $procedure = "pac_fiscalizacion.FUN_CALCULAR_N_MOVIMIENTO(:p_id_inspeccion)";
    $parametros = array(':p_id_inspeccion'=>$id_inspeccion);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
     
     break;

    default:
        $response->resultado = 'La Interfaz no está preparada para recibir el proceso.';
        echo json_encode($response);
    break;


   
}

?>