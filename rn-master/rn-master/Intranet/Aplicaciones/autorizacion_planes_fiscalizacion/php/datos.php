<?php
$tipo_consulta = $_POST['p_tipo_consulta'];
$id_plan_fis = $_POST['p_id_plan_fis'];

switch ($tipo_consulta) {
    case 'calcular_horas_totales':
        $procedure = "PAC_FISCA_PLAN_PERSONAL.FUN_TRAER_HS_TOTALES(:p_id_plan_fis)";
        $parametros = array(':p_id_plan_fis'=>$id_plan_fis);
        $data = getArrayResult($procedure, $parametros);
        echo json_encode($data->datos[0]);
        break;
    default:
        $response->resultado = 'La Interfaz no está preparada para recibir el proceso.';
        echo json_encode($response);
    break;


   
}

?>