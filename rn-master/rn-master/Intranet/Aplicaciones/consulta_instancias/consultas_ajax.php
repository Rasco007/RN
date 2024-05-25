<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];

if ($p_oper === 'cuit'){
    $db_query = new DB_Query(
		"SELECT d_denominacion, fun_formato_cuit(n_cuit) as n_cuit, id_contribuyente, c.c_tipo_documento,
            (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, fun_formato_numerico(c.n_documento,0) n_documento
		from contribuyentes c
		where n_cuit = :filtro
        and exists (select 1 from instancias i where i.id_contribuyente = c.id_contribuyente)");
	$par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'denominacion'){
	$db_query = new DB_Query(
		"SELECT
			c.d_denominacion, fun_formato_cuit(n_cuit) as n_cuit, c.id_contribuyente, c.c_tipo_documento,
            (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, fun_formato_numerico(c.n_documento,0) n_documento
		FROM contribuyentes c
		where substr(fun_transformar_cadena(d_denominacion), 1, 200) like fun_transformar_cadena('%'|| :filtro ||'%')
            and exists (select 1 from instancias i where i.id_contribuyente = c.id_contribuyente)
			and rownum <= 5"
	);

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['N_CUIT'].' - '.$row_query[$i]['D_DENOMINACION'],
            'cuit' => $row_query[$i]['N_CUIT'],
            'razon_social' => $row_query[$i]['D_DENOMINACION'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO']
        );
    }

    echo json_encode($options);
}

if ($p_oper === 'detalle_instancia'){
    $n_instancia = $_POST['n_instancia'];
    $n_orden = $_POST['n_orden'];

    $db_query = new DB_Query(
        "SELECT distinct ID_OBLIGACION
        FROM VW_INSTANCIAS_DETALLE
        WHERE N_INSTANCIA = :N_INSTANCIA
        and n_orden = :n_orden
        AND ROWNUM <=1");
    $par = array(':n_instancia' => $n_instancia,
                ':n_orden' => $n_orden);
    $row_query = $db_query->do_query($par);
    $response->id_obligacion = $row_query[0]['ID_OBLIGACION'];

    echo json_encode($response);
}

?>