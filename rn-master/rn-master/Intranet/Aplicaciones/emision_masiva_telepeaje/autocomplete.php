<?php

$oper = $_POST['oper'];
$periodo = $_POST['periodo'];
$cuota = $_POST['cuota'];

if ($oper === 'vencimientos'){
    $db_query = new DB_Query(
		"select f_vtop f_vto_pago, f_vtop2 f_vto_pago_2 from calendario_fiscal
		where c_tributo = 170 and c_concepto = 310 and n_posicion_fiscal = :n_posicion_fiscal and n_cuota = :n_cuota"
	);

    $par = array(':n_posicion_fiscal' => $periodo, ':n_cuota' => $cuota);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}