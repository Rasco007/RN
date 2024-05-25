<?php

$oper = $_POST['p_oper'];
$p_region = $_POST['p_region'];
$p_area = $_POST['p_area'];
$p_concepto = $_POST['p_concepto'];

if ($oper === 'getConsorcio'){
	$db_query = new DB_Query("
    SELECT cc.c_organismo, po.d_organismo
	from consorcios_regiones cr, consorcios_conceptos cc, param_organismos po
	where cr.c_organismo = cc.c_organismo
	and cr.c_ente = cc.c_ente
	and cr.c_region = :p_region
	and cr.c_area = :p_area
	and cc.c_concepto = :p_concepto
	and cc.c_ente = po.c_ente
	and cc.c_organismo = po.c_organismo
	UNION
	SELECT c_organismo, d_organismo
	from param_organismos
	where c_organismo = 'DPA'");

    $par = array(':p_region' => $p_region, ':p_area' => $p_area, ':p_concepto' => $p_concepto);
    $row_query = $db_query->do_query($par);
    $result->c_organismo = $row_query[0]['C_ORGANISMO'];
    $result->d_organismo = $row_query[0]['D_ORGANISMO'];

    echo json_encode($result);
}

?>