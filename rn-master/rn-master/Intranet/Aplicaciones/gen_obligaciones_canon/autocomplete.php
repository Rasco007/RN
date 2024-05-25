<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getContribuyente'){
    $db_query = new DB_Query("
    SELECT id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes c
    where n_cuit = :filtro
    and exists (select 1 from v_partidas_riego v
        where m_activa='S'
        and c.id_contribuyente=v.id_contribuyente)");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getAutocomplete'){
    $db_query = new DB_Query("
    SELECT  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes c
    where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    and exists (select 1 from v_partidas_riego v
        where m_activa='S'
        and c.id_contribuyente=v.id_contribuyente)
    and rownum <= 5");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE']
        );
    }

    echo json_encode($options);
}

if ($oper === 'datos_cuota'){
    $p_n_posicion_fiscal = $_POST['p_n_posicion_fiscal'];
    $p_n_cuota = $_POST['p_n_cuota'];

    $db_query = new DB_Query(
        "SELECT
            periodo_desde,
            periodo_hasta,
            f_vtop,
            f_Vtop2,
            SIAT.fun_proximo_vto(c.c_tributo,c.c_Concepto,c.n_posicion_fiscal,c.n_cuota,null) f_vto_prox
        from calendario_fiscal c
        where c_tributo=160
        and n_posicion_fiscal = :p_n_posicion_fiscal * 100
        and n_cuota = :p_n_cuota");

    $par = array(':p_n_posicion_fiscal' => $p_n_posicion_fiscal, ':p_n_cuota' => $p_n_cuota);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}