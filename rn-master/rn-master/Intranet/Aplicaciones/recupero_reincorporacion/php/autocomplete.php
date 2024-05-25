<?php
$oper = $_POST['p_oper'];
if ($oper === 'getAutocomplete'){
    $filtro = $_POST['p_filtro'];

    $db_query = new DB_Query("
    select DISTINCT c.id_contribuyente,
            fun_formato_cuit (c.n_cuit) as cuit, 
            c.d_denominacion as denominacion,
            c.c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            c.n_documento
    from contribuyentes c
    where substr (fun_transformar_cadena (c.d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    and rownum <= 5");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO'],
        );
    }

    echo json_encode($options);
}

if ($oper === 'getCont2'){
    $filtro = $_POST['p_filtro'];
    $p_id_contrib = $_POST['p_id_contrib'];

    $db_query = new DB_Query("
    select DISTINCT c.id_contribuyente,
            fun_formato_cuit (c.n_cuit) as cuit, 
            c.d_denominacion as denominacion,
            c.c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            c.n_documento
    from contribuyentes c
    where substr (fun_transformar_cadena (c.d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    and c.id_contribuyente != :p_id_contrib
    and rownum <= 5");

    $par = array(':filtro' => $filtro, ':p_id_contrib' => $p_id_contrib);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO'],
        );
    }

    echo json_encode($options);
}