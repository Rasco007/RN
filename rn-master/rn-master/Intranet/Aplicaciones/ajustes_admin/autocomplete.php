<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getDenominacion'){
    $db_query = new DB_Query("
    SELECT  id_contribuyente,
            n_cuit cuit_limpio,
            fun_formato_cuit(n_cuit) as cuit, 
            d_denominacion as denominacion,
            c.c_tipo_documento,
            c.n_documento
    from contribuyentes c
    where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getCUIT'){
    $db_query = new DB_Query("
    SELECT  id_contribuyente,
        n_cuit cuit_limpio,
        fun_formato_cuit(n_cuit) as cuit, 
        d_denominacion as denominacion,
        c.c_tipo_documento,
        c.n_documento
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
            'cuit_limpio' => $row_query[$i]['CUIT_LIMPIO'],
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO']
        );
    }

    echo json_encode($options);
}

if ($oper === 'getDatosObjeto'){
    $p_c_tipo_imponible = $_POST['p_c_tipo_imponible'];
    $p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_c_tipo_documento = $_POST['p_c_tipo_doc'];
    $p_n_documento = $_POST['$p_n_documento'];

    $db_query = new DB_Query("
    SELECT distinct
       c.id_contribuyente,
       n_cuit cuit_limpio,
       fun_formato_cuit(c.n_cuit) n_cuit, c.d_denominacion,
       c.c_tipo_documento,
       c.n_documento
    from contribuyentes_tributos ct, contribuyentes c
    where (c.c_tipo_documento = nvl(:c_tipo_documento, c.c_tipo_documento) or c.c_tipo_documento is null)
        and (c.n_documento = nvl(:n_documento, c.n_documento) or c.n_documento is null)
        and ct.c_tipo_imponible = :c_tipo_imponible
        and ct.d_objeto_hecho like :d_objeto_hecho
        and ct.id_contribuyente = nvl(:id_contribuyente,ct.id_contribuyente)
        and c.id_contribuyente = ct.id_contribuyente
    order by 1");

    $param_query = array(
        ':c_tipo_imponible' => $p_c_tipo_imponible,
        ':d_objeto_hecho' => $p_d_objeto_hecho,
        ':id_contribuyente' => $p_id_contribuyente,
        ':c_tipo_documento' => $p_c_tipo_documento,
        ':n_documento' => $p_n_documento
    );
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 1){
        $result->resultado = 'OK';
        $result->objeto = $row_query[0]['D_OBJETO_HECHO'];
        $result->id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
        $result->n_cuit = $row_query[0]['N_CUIT'];
        $result->cuit_limpio = $row_query[0]['CUIT_LIMPIO'];
        $result->d_denominacion = $row_query[0]['D_DENOMINACION'];
        $result->c_tipo_documento = $row_query[0]['C_TIPO_DOCUMENTO'];
        $result->n_documento = $row_query[0]['N_DOCUMENTO'];
    }else{
        $result->resultado = 'NOOK';
        if (count($row_query) > 1){
            $result->error = 'Existe más de un contribuyente para el objeto ingresado, por favor ingrese el CUIT.';
        }else{
            $result->error = 'No se encontraron datos para los filtros ingresados.';
        }
    }

    echo json_encode($result);
}

if ($oper === 'getDatosDocumento'){
    $p_c_tipo_imponible = $_POST['p_c_tipo_imponible'];
    $p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_c_tipo_documento = $_POST['p_c_tipo_doc'];
    $p_n_documento = $_POST['p_n_documento'];

    $db_query = new DB_Query("
    SELECT distinct
       c.id_contribuyente,
       n_cuit cuit_limpio,
       fun_formato_cuit(c.n_cuit) n_cuit, c.d_denominacion
    from contribuyentes_tributos ct, contribuyentes c
    where c.c_tipo_documento = :c_tipo_documento
        and c.n_documento = :n_documento
        and ct.c_tipo_imponible = nvl(:c_tipo_imponible, ct.c_tipo_imponible)
        and ct.id_contribuyente = nvl(:id_contribuyente,ct.id_contribuyente)
        and c.id_contribuyente = ct.id_contribuyente
    order by 1");

    $param_query = array(
        ':c_tipo_imponible' => $p_c_tipo_imponible,
        ':d_objeto_hecho' => $p_d_objeto_hecho,
        ':id_contribuyente' => $p_id_contribuyente,
        ':c_tipo_documento' => $p_c_tipo_documento,
        ':n_documento' => $p_n_documento
    );
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 1){
        $result->resultado = 'OK';
        $result->id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
        $result->n_cuit = $row_query[0]['N_CUIT'];
        $result->cuit_limpio = $row_query[0]['CUIT_LIMPIO'];
        $result->d_denominacion = $row_query[0]['D_DENOMINACION'];
    }else{
        $result->resultado = 'NOOK';
        if (count($row_query) > 1){
            $result->error = 'Existe más de un contribuyente para el documento ingresado, por favor ingrese el tipo de documento.';
        }else{
            $result->error = 'No se encontraron datos para los filtros ingresados.';
        }
    }

    echo json_encode($result);
}

if ($oper === 'getObligaciones'){

    $db_query = new DB_Query("
    SELECT d_objeto_hecho,id_obligacion,m_intimacion
    from obligaciones o
    where o.id_contribuyente = :id_contribuyente
    and o.c_tipo_imponible = nvl(:c_tipo_imponible, o.c_tipo_imponible)
    and o.c_tributo = :c_tributo
    and o.c_concepto = :c_concepto
    and o.d_objeto_hecho = nvl(:d_objeto_hecho, o.d_objeto_hecho)
    and o.n_posicion_fiscal = :n_pos_fiscal
    and o.n_cuota_anticipo = :n_cuota");

    $param_query = array(
        ':id_contribuyente' => $_POST['id_contribuyente'],
        ':c_tipo_imponible' => $_POST['c_tipo_imponible'],
        ':c_tributo' => $_POST['c_tributo'],
        ':c_concepto' => $_POST['c_concepto'],
        ':d_objeto_hecho' => $_POST['d_objeto_hecho'],
        ':n_pos_fiscal' => $_POST['n_pos_fiscal'],
        ':n_cuota' => $_POST['n_cuota']
    );
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 0){
        $result->resultado = 'NOOK';
        $result->error = 'No se encontraron datos para los filtros ingresados.';
    }else{
        $result->resultado = 'OK';
        $result->cantidad = count($row_query);
        $result->d_objeto_hecho = $row_query[0]['D_OBJETO_HECHO'];
        $result->id_obligacion = $row_query[0]['ID_OBLIGACION'];
        $result->m_intimacion = $row_query[0]['M_INTIMACION'];
    }

    echo json_encode($result);
}

?>