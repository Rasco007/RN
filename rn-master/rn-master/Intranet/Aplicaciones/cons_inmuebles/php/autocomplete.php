<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];

if ($p_oper === 'cuit'){

    $db_query = new DB_Query(
        "SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
			(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, fun_formato_numerico(c.n_documento,0) n_documento
	from contribuyentes c where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'denominacion'){
    $db_query = new DB_Query(
        "SELECT v.id_contribuyente, v.cuit, v.denominacion, v.c_tipo_documento, v.d_tipo_documento, v.n_documento
    FROM (
        SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion,
            c.c_tipo_documento, (select d_dato from tablas_generales where n_tabla = 1 and c_dato = c.c_tipo_documento) d_tipo_documento,
            fun_formato_numerico(c.n_documento,0) n_documento
        from contribuyentes c where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    ) v where rownum <= 5");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            //'id_contribuyente_tmp' => $row_query[$i]['ID_CONTRIBUYENTE_TMP'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO']
        );
    }

    echo json_encode($options);
}

if($p_oper == 'documento'){
    $c_tipo_documento = ($_POST['c_tipo_documento']);
    $n_documento = ($_POST['n_documento']);
    $db_query = new DB_Query("
                SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento, 
                    (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, 
                    fun_formato_numerico(c.n_documento,0) n_documento
							  from contribuyentes c where 
							c_tipo_documento = :c_tipo_documento
						  	AND n_documento = :n_documento");

    $par = array(':c_tipo_documento' => $c_tipo_documento,
        ':n_documento' => $n_documento);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}

if ($p_oper === 'partida'){

    $db_query = new DB_Query(
        "SELECT ct.id_contribuyente, i.d_nomenclatura, i.d_nomenclatura_real,
         fun_formato_cuit (c.n_cuit) n_cuit, c.d_denominacion, c.C_TIPO_DOCUMENTO, c.N_DOCUMENTO,
         (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento
    FROM contribuyentes_tributos ct, inmuebles i, contribuyentes c
   WHERE     ct.c_tipo_imponible = '5'
         AND ct.c_tributo = 60
         AND TO_NUMBER (ct.d_objeto_hecho) = i.d_nomenclatura
         AND i.d_nomenclatura = :filtro
         AND ct.ID_CONTRIBUYENTE = c.ID_CONTRIBUYENTE
         AND ct.f_vig_hasta IS NULL
         AND ROWNUM = 1
ORDER BY ct.f_vig_desde DESC");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}