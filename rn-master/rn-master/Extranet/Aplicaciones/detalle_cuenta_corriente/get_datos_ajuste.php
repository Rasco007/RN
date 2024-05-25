<?php

$id_obligacion = $_POST['id_obligacion'];
$n_secuencia_obl = $_POST['n_secuencia_obl'];

$db_query = new DB_Query("
    SELECT 
	    (select d_dato
		from tablas_generales
		where n_tabla = (select n_tabla from parametros where c_constante='MAJUS')
		and   c_dato  = aj.c_motivo_ajuste) as d_motivo,
		trunc(f_alta) as f_alta,
		c_usuarioalt,
		d_observ,
		n_ajuste
	from ajuste_cta_cte aj
	where id_obligacion = :id_obligacion
		and n_secuencia_obl = :n_secuencia_obl");

$param = array(':id_obligacion' => $id_obligacion,
			':n_secuencia_obl' => $n_secuencia_obl);
$row_query = $db_query->do_query($param);


if (count($row_query) > 0){
    $result->resultado = 'OK';
    $result->d_motivo = $row_query[0]['D_MOTIVO'];
	$result->f_alta = $row_query[0]['F_ALTA'];
	$result->c_usuarioalt = $row_query[0]['C_USUARIOALT'];
	$result->d_observ = $row_query[0]['D_OBSERV'];
	$result->n_ajuste = $row_query[0]['N_AJUSTE'];
}else{
    $result->resultado = 'NOOK';
    $result->error = 'El movimiento seleccionado no posee ajustes.';
}

echo json_encode($result);

?>