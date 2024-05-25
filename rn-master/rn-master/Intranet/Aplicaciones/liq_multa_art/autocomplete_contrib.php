<?php

$filtro = $_POST['term'];

$db_query = new DB_Query("
    select  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion, 
            c_tipo_documento,
            (select d_dato from tablas_generales where n_tabla = 1and c_dato = c_tipo_documento) as d_tipo_documento,
            fun_formato_numerico (n_documento, 0) n_documento
    from contribuyentes
    where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    and rownum <= 5
");

$par = array(':filtro' => $filtro);
$row_query = $db_query->do_query($par);

for ($i=0; $i < count($row_query); $i++)
{
    $options['data_contrib'][] = array(
        'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
        'razon_social' => $row_query[$i]['DENOMINACION'],
        'cuit' => $row_query[$i]['CUIT'],
        'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
        'n_documento' => $row_query[$i]['N_DOCUMENTO'],
        'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
        'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
    );
}

echo json_encode($options);