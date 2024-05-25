

<?php
$oper = $_POST['p_oper'];

if ($oper === 'getMPCheque') { 
    $p_medio_pago = $_POST['p_medio_pago'];         
    $procedure = "PAC_INGRESO_PAGOS.FUN_GET_MP_CHEQUE(:p_medio_pago)";     
    $parametros = array(':p_medio_pago'=>$p_medio_pago); 
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}else if ($oper === 'getNewId') {         
    $procedure = "PAC_INGRESO_PAGOS.FUN_GET_NEW_ID()";     
    $parametros = array(); 
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}else if ($oper === 'getTotales') {     
    $p_id_ing_indiv_pagos_def = $_POST['p_id_ing_indiv_pagos_def'];     
    $procedure = "PAC_INGRESO_PAGOS.FUN_CALCULAR_TOTALES_CUOTAS(:p_id_ing_indiv_pagos_def)";     
    $parametros = array(':p_id_ing_indiv_pagos_def'=>$p_id_ing_indiv_pagos_def); 
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
?>

