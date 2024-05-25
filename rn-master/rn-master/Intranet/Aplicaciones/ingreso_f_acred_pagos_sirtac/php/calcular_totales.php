<?php
$f_pago = $_POST['p_f_pago'];
$procedure = "PAC_INGRESO_PAGOS.FUN_CALCULAR_TOTALES_SIRTAC(:p_f_pago)";
$parametros = array(':p_f_pago'=>$f_pago);
$data = getArrayResult($procedure, $parametros);
echo json_encode($data->datos[0]); ?>

