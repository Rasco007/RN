<?php

$id_obligacion = $_POST['id_obligacion'];
$n_secuencia_obl = $_POST['n_secuencia_obl'];

$db_query = new DB_Query("
    SELECT
		id_obligacion_origen,
		id_obligacion_destino,
	    f_movimiento,
	    fun_formato_numerico(i_importe) i_importe,
	    fun_formato_numerico(i_interes) i_interes,
	    nvl((select d_observ from ajuste_cta_cte
	    where id_obligacion = cc.id_obligacion_origen
	    and n_secuencia_obl = cc.n_secuencia_obl_origen),(select d_observ
          from ajuste_cta_cte where id_obligacion = cc.id_obligacion_origen
          and rownum = 1)) d_observ,
	    trunc(f_alta) f_alta,
	    c_usuarioalt,
	    c_concepto_mov_origen,
		c_concepto_mov_destino
	from compensaciones_ctacte cc
	where (:id_obligacion = id_obligacion_origen and :n_secuencia_obl = n_secuencia_obl_origen)
	    or 
	    (:id_obligacion = id_obligacion_destino and :n_secuencia_obl = n_secuencia_obl_destino)");

$param = array(':id_obligacion' => $id_obligacion,
			':n_secuencia_obl' => $n_secuencia_obl);
$row_query = $db_query->do_query($param);

if (count($row_query) > 0){
    $result->resultado = 'OK';
    $result->id_obligacion_origen = $row_query[0]['ID_OBLIGACION_ORIGEN'];
	$result->id_obligacion_destino = $row_query[0]['ID_OBLIGACION_DESTINO'];
	$result->f_movimiento = $row_query[0]['F_MOVIMIENTO'];
	$result->i_importe = $row_query[0]['I_IMPORTE'];
	$result->i_interes = $row_query[0]['I_INTERES'];
	$result->d_observ = $row_query[0]['D_OBSERV'];
	$result->f_alta = $row_query[0]['F_ALTA'];
	$result->c_usuarioalt = $row_query[0]['C_USUARIOALT'];
	$result->c_concepto_mov_origen = $row_query[0]['C_CONCEPTO_MOV_ORIGEN'];
	$result->c_concepto_mov_destino = $row_query[0]['C_CONCEPTO_MOV_DESTINO'];


	$db_query = new DB_Query("
	    SELECT
		    id_obligacion,
		    c_tributo,
		    (select d_descrip from tributos
		    where c_tributo = o.c_tributo) d_tributo,
	    	(select d_concepto from tributos_conceptos
		    where c_tributo = o.c_tributo
		    and c_concepto = :c_concepto_mov_origen) d_concepto_mov_origen,
		    fun_formato_posicion_fiscal(n_posicion_fiscal) n_posicion_fiscal,
		    n_cuota_anticipo,
		    d_objeto_hecho,
		    f_vto_pago
		from obligaciones o
		where id_obligacion = :id_obligacion_origen");

	$param = array(':id_obligacion_origen' => $result->id_obligacion_origen,
				':c_concepto_mov_origen' => $result->c_concepto_mov_origen);
	$row_query = $db_query->do_query($param);

	$result->id_obligacion_origen = $row_query[0]['ID_OBLIGACION'];
	$result->c_tributo_origen = $row_query[0]['C_TRIBUTO'];
	$result->d_tributo_origen = $row_query[0]['D_TRIBUTO'];
	$result->d_concepto_mov_origen = $row_query[0]['D_CONCEPTO_MOV_ORIGEN'];
	$result->n_posicion_fiscal_origen = $row_query[0]['N_POSICION_FISCAL'];
	$result->n_cuota_origen = $row_query[0]['N_CUOTA_ANTICIPO'];
	$result->d_objeto_hecho_origen = $row_query[0]['D_OBJETO_HECHO'];
	$result->f_vto_pago_origen = $row_query[0]['F_VTO_PAGO'];


	$db_query = new DB_Query("
	    SELECT
		    id_obligacion,
		    c_tributo,
		    (select d_descrip from tributos
		    where c_tributo = o.c_tributo) d_tributo,
			(select d_concepto from tributos_conceptos
		    where c_tributo = o.c_tributo
		    and c_concepto = :c_concepto_mov_destino) d_concepto_mov_destino,
		    fun_formato_posicion_fiscal(n_posicion_fiscal) n_posicion_fiscal,
		    n_cuota_anticipo,
		    d_objeto_hecho,
		    f_vto_pago
		from obligaciones o
		where id_obligacion = :id_obligacion_destino");

	$param = array(':id_obligacion_destino' => $result->id_obligacion_destino,
				':c_concepto_mov_destino' => $result->c_concepto_mov_destino);
	$row_query = $db_query->do_query($param);

	$result->id_obligacion_destino = $row_query[0]['ID_OBLIGACION'];
	$result->c_tributo_destino = $row_query[0]['C_TRIBUTO'];
	$result->d_tributo_destino = $row_query[0]['D_TRIBUTO'];
	$result->d_concepto_mov_destino = $row_query[0]['D_CONCEPTO_MOV_DESTINO'];
	$result->n_posicion_fiscal_destino = $row_query[0]['N_POSICION_FISCAL'];
	$result->n_cuota_destino = $row_query[0]['N_CUOTA_ANTICIPO'];
	$result->d_objeto_hecho_destino = $row_query[0]['D_OBJETO_HECHO'];
	$result->f_vto_pago_destino = $row_query[0]['F_VTO_PAGO'];
}else{
    $result->resultado = 'NOOK';
    $result->error = 'El movimiento seleccionado no posee compensaciones.';
}

echo json_encode($result);

?>