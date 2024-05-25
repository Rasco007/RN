<?php     
$p_f_pago = $_POST['p_f_pago'];     
$procedure = "PAC_INGRESO_PAGOS.FUN_CALCULAR_TOTAL_SIRCAR(:p_f_pago)";     
$parametros = array(':p_f_pago'=>$p_f_pago);
$data = getArrayResult($procedure, $parametros);     
echo json_encode($data->datos[0]); ?>

