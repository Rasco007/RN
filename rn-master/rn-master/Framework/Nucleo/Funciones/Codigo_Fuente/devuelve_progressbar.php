<?php

$logon  = new oci_Logon();
$voConn = $logon->getCon();

$p_name_job = $_POST['p_name_job'];

$sql = "select fun_devuelve_progressbar(:name_job, 'PORC') as n_progress,
				fun_devuelve_progressbar(:name_job, 'TEXTO') as d_texto
		from dual";

$param_prc = array(':name_job'=>$p_name_job);
$db_query = new DB_Query($sql);
$row_query = $db_query->do_query($param_prc);

$n_progress = $row_query[0]['N_PROGRESS'];
$d_texto = $row_query[0]['D_TEXTO'];

$respuesta->n_progress = $n_progress;
$respuesta->d_texto = $d_texto;

echo(json_encode($respuesta));
?>
