<?php

$oper = $_POST['p_oper'];

if ($oper === 'getMultasValores') {
    $p_c_multa = $_POST['p_c_multa'];
    $p_id_obligacion = $_POST['p_id_obligacion'];
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_f_generacion = $_POST['p_f_generacion'];

    if ($p_id_obligacion != null) {
        $db_query = new DB_Query("
            SELECT PAC_MULTAS.fun_devuelve_id_multa_obl(
                        :p_c_multa,
                        :p_f_generacion, --trunc(sysdate),
                        :p_id_obligacion) as ids_multas 
            from dual");
        $par = array(':p_c_multa' => $p_c_multa, ':p_id_obligacion' => $p_id_obligacion, ':p_f_generacion' => $p_f_generacion);
    } else {
        $db_query = new DB_Query("
            SELECT PAC_MULTAS.fun_devuelve_id_multa(
                :p_c_multa,
                :p_f_generacion,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                :p_id_contribuyente) as ids_multas 
            from dual");
        $par = array(':p_c_multa' => $p_c_multa, ':p_id_contribuyente' => $p_id_contribuyente, ':p_f_generacion' => $p_f_generacion);
    }

    try {
        $row_query = $db_query->do_query($par);
    } catch (Exception $e) {
        die(json_encode(array(array('D_MULTA' => '', 'ID_MULTA' => ''))));
    };

    $ids_multas = $row_query[0]['IDS_MULTAS'];

    if ($ids_multas != null) {
        $query = ("
                SELECT fun_devuelve_descrip_infrac(id_multa) d_multa, id_multa from param_infracciones_valores
                where id_multa in (" . $ids_multas . ")");

        $db_query->setQuery($query);
        $par = array();
        $row_query = $db_query->do_query($par);
    }
    echo json_encode($row_query);
}

if ($oper === 'getValoresMulta') {
    $p_c_multa_valor = $_POST['p_c_multa_valor'];
    $p_id_obligacion = $_POST['p_id_obligacion'];
    $p_id_inspeccion = $_POST['p_id_inspeccion'];

    console.log('getValoresMultaxx');
    console.log( $p_c_multa_valor);


    $db_query = new DB_Query("
            SELECT  n_dias_vto, c_tipo_dias, i_monto_fijo, 
                    i_monto_fijo_desde, i_monto_fijo_hasta, m_automatica, 
                    nvl(p_descuento_vto,0) p_descuento_vto,nvl(p_descuento_notif,0) p_descuento_notif,
                    p_monto_fijo, c_tributo
            FROM
                param_infracciones_valores
            WHERE id_multa = :p_c_multa_valor");

    $par = array(':p_c_multa_valor' => $p_c_multa_valor);
    $row_query = $db_query->do_query($par);
    $datosMulta = $row_query[0];

    if ($datosMulta['P_MONTO_FIJO'] != '' && $p_id_obligacion != null && $datosMulta['C_TRIBUTO'] == '50') {
        //miro si es sellos, si es así, busco el impuesto y devuelvo como monto fijo.
        $query = ("
            SELECT  i_determinado 
            from sellos 
            where id_obligimpuesto = :p_id_obligacion");

        $par = array(':p_id_obligacion' => $p_id_obligacion);

        $db_query->setQuery($query);
        $monto_multa = $db_query->do_query($par);
        $monto_multa = $monto_multa[0]['I_DETERMINADO'] * $datosMulta['P_MONTO_FIJO'] / 100;
        $datosMulta['I_MONTO_FIJO'] = $monto_multa;
    } else if ($p_id_inspeccion != null) {
        //Calculamos
        console.log( $p_id_inspeccion);
        $query = (" SELECT SUM (i_saldo_f_fisca * (case when p_imp_omitido > 0 and p_imp_omitido < 10 then 10 else p_imp_omitido end) / 100) i_multa
                    FROM   (SELECT MAX (n_orden) OVER () max_n_orden, tmp_f13.*
                            FROM   tmp_f13
                            WHERE  id_inspeccion = :p_id_inspeccion)
                    WHERE  max_n_orden = n_orden and i_saldo_f_fisca > 0");
        

        $par = array(':p_id_inspeccion' => $p_id_inspeccion);

        $db_query->setQuery($query);
        $monto_multa = $db_query->do_query($par);
        $datosMulta['I_MONTO_FIJO']  = $monto_multa[0]['I_MULTA'];
    }

    echo json_encode($datosMulta);
}

if ($oper === 'getVtoMulta') {
    $p_id_multa = $_POST['p_id_multa'];
    $p_f_generacion = $_POST['p_f_generacion'];

    $db_query = new DB_Query("
            SELECT fun_calc_dias_h_c(:f_generacion, n_dias_vto, c_tipo_dias) F_VTO,
                   fun_calc_dias_h_c(:f_generacion, n_dias_reducc, c_tipo_dias_reducc) F_VTO_DESC
            FROM param_infracciones_valores
            WHERE id_multa = :p_id_multa");

    $par = array(':p_id_multa' => $p_id_multa, ':f_generacion' => $p_f_generacion);
    $row_query = $db_query->do_query($par);
    $datosMulta = $row_query;

    echo json_encode($datosMulta);
}

if ($oper === 'getInfoContribInsp') {
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

if ($oper === 'getInfoCuit') {
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