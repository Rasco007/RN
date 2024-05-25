

<?php
$oper = $_POST['p_oper'];

if ($oper === 'getFechaPago') {      
    $p_n_remito = $_POST['p_n_remito'];     
    $procedure = "PAC_REND_BANCOS.FUN_FECHA_PAGO_REMESAS(:p_n_remito)";     
    $parametros = array(':p_n_remito'=>$p_n_remito);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
?>