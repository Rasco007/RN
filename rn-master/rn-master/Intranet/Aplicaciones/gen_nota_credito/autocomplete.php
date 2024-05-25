<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getDenominacion'){
    $db_query = new DB_Query("
    SELECT  id_contribuyente,
            fun_formato_cuit(n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes
    where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getCUIT'){
    $db_query = new DB_Query("
    SELECT  id_contribuyente,
            fun_formato_cuit(n_cuit) as cuit, 
            d_denominacion as denominacion
    from contribuyentes
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

if ($oper === 'getDatos'){
    $p_c_tributo = $_POST['p_c_tributo'];
    $p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
    $p_id_contribuyente = $_POST['p_id_contribuyente'];

    $db_query = new DB_Query("
    SELECT distinct
       c.id_contribuyente,
       fun_formato_cuit(c.n_cuit) n_cuit, c.d_denominacion
    from contribuyentes_tributos ct, contribuyentes c
    where ct.c_tributo = :c_tributo
        and ct.d_objeto_hecho like :d_objeto_hecho
        and ct.id_contribuyente = nvl(:id_contribuyente,ct.id_contribuyente)
        and c.id_contribuyente = ct.id_contribuyente
    order by 1");


    $param_query = array(
        ':c_tributo' => $p_c_tributo,
        ':d_objeto_hecho' => $p_d_objeto_hecho,
        ':id_contribuyente' => $p_id_contribuyente
    );
    $row_query = $db_query->do_query($param_query);

    if (count($row_query) == 1){
        $result->resultado = 'OK';
        $result->objeto = $row_query[0]['D_OBJETO_HECHO'];
        $result->id_contribuyente = $row_query[0]['ID_CONTRIBUYENTE'];
        $result->n_cuit = $row_query[0]['N_CUIT'];
        $result->d_denominacion = $row_query[0]['D_DENOMINACION'];
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

?>