<?php

$oper = $_POST['p_oper'];

if ($oper === 'getMultasValores'){
    $p_c_multa = $_POST['p_c_multa'];
    $p_id_obligacion = $_POST['p_id_obligacion'];

    $db_query = new DB_Query("
            SELECT PAC_MULTAS.fun_devuelve_id_multa_obl(
            :p_c_multa,
            trunc(sysdate),
            :p_id_obligacion) as ids_multas from dual");

    $par = array(':p_c_multa' => $p_c_multa,':p_id_obligacion' => $p_id_obligacion);
    try{
        $row_query= $db_query->do_query($par);
    }catch (Exception $e) {
        die(json_encode(array(array('D_MULTA'=>'','ID_MULTA'=> ''))));
    };

    $ids_multas = $row_query[0]['IDS_MULTAS'];

    if($ids_multas != null){
        $query = ("
                SELECT fun_devuelve_descrip_infrac(id_multa) d_multa, id_multa from param_infracciones_valores
                where id_multa in (".$ids_multas.")");

        $db_query -> setQuery($query);
        $par = array();
        $row_query= $db_query->do_query($par);
    }
    echo json_encode($row_query);
}

if ($oper === 'getValoresMulta'){
    $p_c_multa_valor = $_POST['p_c_multa_valor'];

    $db_query = new DB_Query("
            SELECT n_dias_vto, c_tipo_dias, i_monto_fijo, i_monto_fijo_desde, i_monto_fijo_hasta, m_automatica, p_descuento_vto FROM
            param_infracciones_valores
            WHERE id_multa = :p_c_multa_valor");

    $par = array(':p_c_multa_valor' => $p_c_multa_valor);
    $row_query= $db_query->do_query($par);
    $datosMulta = $row_query[0];

    echo json_encode($datosMulta);
}

if ($oper === 'getVtoMulta'){
    $p_id_multa = $_POST['p_id_multa'];
    $p_f_generacion = $_POST['p_f_generacion'];

    $db_query = new DB_Query("
            SELECT fun_calc_dias_h_c(:f_generacion, n_dias_vto, c_tipo_dias) F_VTO,
                   fun_calc_dias_h_c(:f_generacion, n_dias_reducc, c_tipo_dias_reducc) F_VTO_DESC
            FROM param_infracciones_valores
            WHERE id_multa = :p_id_multa");

    $par = array(':p_id_multa' => $p_id_multa,':f_generacion'=>$p_f_generacion);
    $row_query= $db_query->do_query($par);
    $datosMulta = $row_query;

    echo json_encode($datosMulta);
}

if ($oper === 'getInfoContribInsp'){
    $filtro = $_POST['p_id_inspeccion'];

    $db_query = new DB_Query("
    select  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes inner join inspecciones using(id_contribuyente)
    where id_inspeccion = :filtro
");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getInfoCuit'){
    $filtro = $_POST['n_cuit'];

    $db_query = new DB_Query("
    select  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes
    where n_cuit = :filtro
");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'controlarFechaEmision'){
    $filtro = $_POST['p_filtro'];

    $db_query = new DB_Query("
    select web.FUN_CONTROLAR_FECHA(:filtro,15) resultado FROM DUAL");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    $result['resultado'] = $row_query[0]['RESULTADO'];
    echo json_encode($result);
}