<?php
$oper = $_POST['oper'];
$c_tributo = $_POST['c_tributo'];
$c_tipo_imponible = $_POST['c_tipo_imponible'];
$n_cuit = $_POST['n_cuit'];
$d_objeto_hecho = $_POST['d_objeto_hecho'];

if($oper == 1){
	$db_query = new DB_Query("select c_tipo_objeto,tg.d_dato d_tipo_objeto
						  from tributos t,tablas_generales tg
						  where c_tributo = :c_tributo
						  	and c_tipo_imponible = :c_tipo_imponible
							and tg.c_dato = t.c_tipo_objeto
							and tg.n_tabla = t.n_tabla_tipo_objeto");
							
	$par = array(':c_tipo_imponible' => $c_tipo_imponible,
				 ':c_tributo' => $c_tributo);
				 
	$row_query = $db_query->do_query($par);
	echo json_encode($row_query[0]);
}

if($oper == 2){
    $db_query = new DB_Query("
                                SELECT count(*) cantidad
                                FROM CONTRIBUYENTES_TRIBUTOS ct inner join contribuyentes using (id_contribuyente)
                                WHERE c_tipo_imponible = '1'
                                and ct.F_VIG_HASTA IS NULL
                                and f_cese_provisorio is null
                                AND n_cuit =  replace(:n_cuit,'-','')
                                AND ID_CONTRIBUYENTE NOT IN (select ID_CONTRIBUYENTE from param_se_contribuyentes where c_situacion = 'IBDCM')
                            ");
    $par = array(':n_cuit' => $n_cuit);
    $row_query = $db_query->do_query($par);

    if ($row_query[0]['CANTIDAD'] * 1 > 1){
        $row_query[0]['VALIDO'] = 'FALSO';
    }else{
        $row_query[0]['VALIDO'] = 'VERDADERO';
    }
	echo json_encode($row_query[0]);
}

if ($oper == 'obtener_datos_pfp'){

	$db_query = new DB_Query("select nvl(C_TIPO_PLAN_PAGO,0) C_TIPO_PLAN_PAGO from planes_de_pago where n_plan_pago = :d_objeto");
	$par = array(':d_objeto' => $d_objeto_hecho);
	$row_query = $db_query->do_query($par);

	$res->plannnn = 	$row_query[0]['C_TIPO_PLAN_PAGO'];

	if ($row_query[0]['C_TIPO_PLAN_PAGO'] !== 0 && $row_query[0]['C_TIPO_PLAN_PAGO'] !== null ){
		$res->plan = 	$row_query[0]['C_TIPO_PLAN_PAGO'];
	}else{
		$res->plan=0;;
	}
	echo json_encode($res);
}

/*BUSCA CONTRIBUYENTE POR N_DOCUMENTO y C_TIPO_DOCUMENTO, este último puede ser nulo */
if($oper == 'devuelve_deno_documento'){
   $c_tipo_documento = ($_POST['c_tipo_documento']);
   $n_documento = ($_POST['n_documento']);
   $db_query = new DB_Query("SELECT 
								d_denominacion,
								id_contribuyente,
								fun_formato_cuit(n_cuit) n_cuit,
								c_tipo_documento,
								(SELECT 
									d_dato 
								from 
									tablas_generales tg
								where 
									tg.n_tabla = c.n_tabla_tipo_doc
									AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
								n_documento
						  from 
								contribuyentes c
						  where 
							c_tipo_documento = nvl(:c_tipo_documento, c_tipo_documento)
						  	AND n_documento = :n_documento");
							
	$par = array(':c_tipo_documento' => $c_tipo_documento,
				 ':n_documento' => $n_documento);
	$row_query = $db_query->do_query($par);
	echo json_encode($row_query);

}

?>


