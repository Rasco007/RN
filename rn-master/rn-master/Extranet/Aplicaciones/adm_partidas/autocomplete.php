<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getContribuyente'){
    $db_query = new DB_Query("
    SELECT id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes c
    where n_cuit = :filtro");

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

if ($oper === 'getContribuyenteActivo'){
    $db_query = new DB_Query(
	"SELECT id_contribuyente,
        fun_formato_cuit (n_cuit) as cuit, 
        d_denominacion as denominacion
    from contribuyentes c
    where id_contribuyente = (
        select id_contribuyente
        from siat.contribuyentes_tributos ct 
        where d_objeto_hecho = TO_CHAR(:p_n_partida)
        and c_tipo_imponible = '5'
        and c_tributo = 60
        and trunc(sysdate) between f_vig_desde and nvl(f_vig_hasta,nvl(f_cese_provisorio,trunc(sysdate)))
    )");

    $par = array(':p_n_partida' => $filtro);
	$row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
?>