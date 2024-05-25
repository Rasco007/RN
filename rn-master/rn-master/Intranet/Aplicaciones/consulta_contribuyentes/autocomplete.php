<?php

$p_oper = $_POST['p_oper'];
$filtro = $_POST['filtro'];

if ($p_oper === 'cuit'){
	
    $db_query = new DB_Query(
	"SELECT id_contribuyente, null id_contribuyente_tmp, 
    fun_formato_cuit(n_cuit) as cuit, 
    d_denominacion as denominacion, 
    case 
        when c.n_documento is null 
            then null
        else c.c_tipo_documento end c_tipo_documento,
    case 
        when c.n_documento is null 
            then null
        else (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) end d_c_tipo_documento,            
     fun_formato_numerico(c.n_documento,0) n_documento
	from contribuyentes c where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper === 'denominacion'){
	$db_query = new DB_Query(
	"SELECT v.id_contribuyente, v.id_contribuyente_tmp, v.tmp, v.cuit, v.denominacion, v.c_tipo_documento, v.d_c_tipo_documento, v.n_documento
    FROM (
        SELECT id_contribuyente, null id_contribuyente_tmp, '' tmp, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion,
            c.c_tipo_documento, (select d_dato from tablas_generales where n_tabla = 1 and c_dato = c.c_tipo_documento) d_c_tipo_documento,
            fun_formato_numerico(c.n_documento,0) n_documento
        from contribuyentes c where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
    ) v where rownum <= 5");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    for ($i=0; $i < count($row_query); $i++)
    {
        $options['data_contrib'][] = array(
            'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'].$row_query[$i]['TMP'],
            'razon_social' => $row_query[$i]['DENOMINACION'],
            'cuit' => $row_query[$i]['CUIT'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'id_contribuyente_tmp' => $row_query[$i]['ID_CONTRIBUYENTE_TMP'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_c_tipo_documento' => $row_query[$i]['D_C_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO']
        );
    }

    echo json_encode($options);
}

?>