<?php
$p_oper = $_POST['p_oper'];

if ($p_oper === 'checkBaja'){
    $d_objeto_hecho = $_POST['d_objeto_hecho'];
    $db_query = new DB_Query("
        SELECT D_OBJETO_HECHO, F_VIG_HASTA, F_CESE_PROVISORIO
          FROM contribuyentes_tributos ct
         WHERE     c_tributo = obtener_constante ('TRAUTOMOTOR')
               AND d_objeto_hecho = :d_objeto_hecho
               AND (   f_cese_provisorio =
                       (SELECT MAX (f_movimiento)
                          FROM aut_movimientos am
                         WHERE     am.d_patente = ct.d_objeto_hecho
                               AND am.c_motivo_baja IS NOT NULL)
                    OR F_VIG_HASTA =
                       (SELECT MAX (f_movimiento)
                          FROM aut_movimientos am
                         WHERE     am.d_patente = ct.d_objeto_hecho
                               AND am.c_motivo_baja IS NOT NULL))
               AND ROWNUM <= 1
               ");

    $par = array(':d_objeto_hecho' => $_POST['d_objeto_hecho']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}


if ($p_oper === 'cuit'){
    $filtro = $_POST['filtro'];

    $db_query = new DB_Query(
        "SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
			(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, 
			fun_formato_numerico(c.n_documento,0) n_documento
	from contribuyentes c where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
if($p_oper === 'denominacion'){
    $filtro = $_POST['filtro'];
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

if ($p_oper === 'dni'){
    $filtro = $_POST['filtro'];

    $db_query = new DB_Query(
        "SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
			(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, 
			fun_formato_numerico(c.n_documento,0) n_documento
	from contribuyentes c where c.n_documento = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'checkDigito'){
    $dominio = $_POST['dominio'];
    $digito = $_POST['digito'];

    $db_query = new DB_Query();
    $query = "SELECT SIAT.fun_calcula_digito_verificador(:dominio) digito FROM DUAL";

    $db_query->setQuery($query);
    $par = array(':dominio' => $dominio);
    $row_query = $db_query->do_query($par);

    if ($row_query[0]['DIGITO'] == $digito){
        if ($_POST['completar'] === 'patente_vieja'){
            $query = "SELECT d_patente_vieja objeto,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito
                FROM automotores where d_patente = :dominio";
        }else if ($_POST['completar'] === 'patente'){
            $query = "SELECT d_patente objeto,SIAT.fun_calcula_digito_verificador(d_patente) digito
                FROM automotores where d_patente_vieja = :dominio";
        }

        $db_query->setQuery($query);
        $row_query = $db_query->do_query($par);

        $response->dominio = $row_query[0]['OBJETO'];
        $response->digito = $row_query[0]['DIGITO'];
        $response->resultado = 'OK';
    }else{
        $response->resultado = 'NOOK';
        $response->error =  'El Dígito Verificador no es correcto.';
    }

    echo json_encode($response);
}

?>