<?php
/*require_once(FUNCIONES_FRAMEWORK.'db_pager.php');
require_once(FUNCIONES_FRAMEWORK.'query_loader.php');
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

function get_contribuyente_desde_obligacion($id_obligacion)
{
    $db_query = new DB_Query("select n_cuit as n_cuit, fun_formato_cuit(n_cuit) as n_cuit_mask, c.d_denominacion from contribuyentes c, obligaciones o where c.id_contribuyente = o.id_contribuyente and o.id_obligacion = :id_obligacion");
    $parametros = array(':id_obligacion' => $id_obligacion);
    $row_query = $db_query->do_query($parametros);

    return $row_query[0];
}

function get_datos_obligacion($id_obligacion)
{
	/*$db_query = new DB_Query("SELECT C_TIPO_IMPONIBLE, C_TRIBUTO, D_OBJETO_HECHO, C_CONCEPTO,M_PLAN_PAGO,  F_VTO_PAGO, F_VTO_PAGO_2, N_POSICION_FISCAL, N_CUOTA_ANTICIPO,F_VTO_PRES FROM OBLIGACIONES O WHERE ID_OBLIGACION = :ID_OBLIGACION");*/
	$db_query = new DB_Query("SELECT C_TIPO_IMPONIBLE, C_TRIBUTO, D_OBJETO_HECHO, C_CONCEPTO, F_VTO_PAGO, devuelve_vto_2(:ID_OBLIGACION) F_VTO_PAGO_2, N_POSICION_FISCAL, N_CUOTA_ANTICIPO,F_VTO_PRES,ID_PLAN_PAGO AS N_PLAN_PAGO FROM OBLIGACIONES O WHERE ID_OBLIGACION = :ID_OBLIGACION");
	$parametros = array(':ID_OBLIGACION' => $id_obligacion);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function get_datos_contribuyente($n_cuit)
{
	$db_query = new DB_Query("SELECT ID_CONTRIBUYENTE,
		C.D_DENOMINACION AS D_DENOMINACION,
        C.C_TIPO_DOCUMENTO AS C_TIPO_DOCUMENTO,
        TG.D_DATO AS D_TIPO_DOCUMENTO,
        C.N_DOCUMENTO AS N_DOCUMENTO
  FROM    CONTRIBUYENTES C
       LEFT JOIN siat.TABLAS_GENERALES TG ON C.C_TIPO_DOCUMENTO = TG.C_DATO AND TG.N_TABLA = 1
 WHERE C.N_CUIT = :n_cuit");
	$parametros = array(':N_CUIT' => $n_cuit);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function get_desc_trib_subtrib($c_tipo_imponible, $c_tributo)
{
	$db_query = new DB_Query("SELECT tg.d_dato as D_TIPO_IMPONIBLE, t.d_descrip as D_TRIBUTO  FROM tributos t INNER JOIN siat.tablas_generales tg ON T.C_TIPO_IMPONIBLE = TG.C_DATO WHERE t.c_tipo_imponible = :c_tipo_imponible AND t.c_tributo = :c_tributo AND TG.N_TABLA = 3");
	$parametros = array(':c_tipo_imponible' => $c_tipo_imponible,  ':c_tributo' => $c_tributo);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function get_concepto_descrip($c_concepto, $c_tributo = null)
{
    /*$db_query = new DB_Query("SELECT DISTINCT(D_CONCEPTO) AS D_CONCEPTO FROM TRIBUTOS_CONCEPTOS WHERE C_CONCEPTO = :C_CONCEPTO AND C_TIPO_IMPONIBLE = NVL(:C_TIPO_IMPONIBLE, C_TIPO_IMPONIBLE) AND C_TRIBUTO = NVL(:C_TRIBUTO, C_TRIBUTO)");
    $parametros = array(':C_TIPO_IMPONIBLE' => $c_tipo_imponible, ':C_TRIBUTO' => $c_tributo, ':C_CONCEPTO' => $c_concepto);*/
	$db_query = new DB_Query("SELECT DISTINCT(D_CONCEPTO) AS D_CONCEPTO FROM TRIBUTOS_CONCEPTOS WHERE C_CONCEPTO = :C_CONCEPTO AND C_TRIBUTO = NVL(:C_TRIBUTO, C_TRIBUTO)");
	$parametros = array(':C_TRIBUTO' => $c_tributo, ':C_CONCEPTO' => $c_concepto);
    $row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function get_sum_debe_haber($id_obligacion)
{
    $db_query = new DB_Query("SELECT i_saldo AS SALDO_N,
									 fun_formato_numerico(o.i_saldo) AS SALDO, 
									 fun_formato_numerico (ABS(o.i_saldo)) AS SALDO_ABSOLUTO, 
									 (	select sum(nvl(c.i_movimiento,0)) 
									  	from cuenta_corriente c
									  	where id_obligacion = :ID_OBLIGACION
									 ) AS saldo_web_cc
									 FROM obligaciones o 
									 where o.id_obligacion = :ID_OBLIGACION");
	$parametros = array(':ID_OBLIGACION' => $id_obligacion);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0];
}

function fun_valida_saldo_cancela_multa($id_obligacion){
	//Query que valida credito perteneciente a la obligacion para la cancelacion de multa.
	$db_query = new DB_Query("	select nvl(fun_formato_numerico(sum(i_movimiento)),0) as i_saldo from cuenta_corriente
								 where id_obligacion = :p_id_obligacion
									   and m_debe = 'C'
									   and c_tipo_movi not in ('2','90','52')");
	$parametros = array(':p_id_obligacion' => $id_obligacion);
	$row_query = $db_query->do_query($parametros);
	
	return $row_query[0][I_SALDO];
}
// Query para obtener usuario de compensación
if($_POST["d_dato"] === 'usuario'){
	if($_POST["c_usuario_alt"] == 'MIGRACION'){
		$row_query[0]['D_DENOMINACION']  = 'MIGRACION';
	}else{
		$db_query = new DB_Query("SELECT d_denominacion from usuarios where c_usuario = :p_c_usuario");
		$parametros = array(':p_c_usuario' => $_POST['c_usuario_alt']);
		$row_query = $db_query->do_query($parametros);
	}
	
	
	echo json_encode($row_query[0]);
}

?>


