<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getContribuyente'){
    $db_query = new DB_Query("
    select  c.id_contribuyente,
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
    where c.n_cuit = :filtro
    and rownum = 1");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getAutocomplete'){
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

if ($oper == 4){
    $filtro = $_POST['objeto_hecho'];
    $c_tributo = $_POST['c_tributo'];

    $db_query = new DB_Query("SELECT NVL ((SELECT ct.id_contribuyente
                                    FROM contribuyentes_tributos ct
                                    WHERE     ct.c_tributo = :c_tributo
                                            AND ct.d_objeto_hecho = :d_objeto_hecho
                                            AND ct.f_vig_hasta IS NULL),
                                    (SELECT ct.id_contribuyente
                                    FROM contribuyentes_tributos ct
                                    WHERE     ct.c_tributo = :c_tributo
                                            AND ct.d_objeto_hecho = :d_objeto_hecho
                                            AND ct.f_vig_hasta =
                                                (SELECT MAX (ct1.f_vig_hasta)
                                                FROM contribuyentes_tributos ct1
                                                WHERE     ct1.c_tributo = ct.c_tributo
                                                        AND ct1.d_objeto_hecho = ct.d_objeto_hecho
                                                        AND ct1.f_vig_hasta IS NOT NULL)))    id_contribuyente
                            FROM DUAL");

    $par = array(':c_tributo' => $c_tributo,':d_objeto_hecho' => $filtro);
    $row_query = $db_query->do_query($par);
    if ($row_query[0]['ID_CONTRIBUYENTE']){
        $db_query = new DB_Query("SELECT  c.id_contribuyente,
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
                                c.n_documento,
                                (SELECT f_cese_provisorio from contribuyentes_tributos
                                where id_contribuyente = c.id_contribuyente 
                                    and c_tributo = :c_tributo
                                    and d_objeto_hecho = :d_objeto_hecho) f_cese_prov
                        from contribuyentes c
                        where c.id_contribuyente = :id_contribuyente
                        and rownum = 1");

            $par = array(':id_contribuyente' => $row_query[0]['ID_CONTRIBUYENTE'],':c_tributo' => $c_tributo,':d_objeto_hecho' => $filtro);
            $row_query = $db_query->do_query($par);
    }
    echo json_encode($row_query[0]);
}

if($oper == 5){
    $c_tipo_documento = ($_POST['c_tipo_documento']);
    $n_documento = ($_POST['n_documento']);
    $db_query = new DB_Query("SELECT 
                                c.d_denominacion,
                                c.id_contribuyente,
                                fun_formato_cuit(c.n_cuit) n_cuit
                            from contribuyentes c
                            where c.c_tipo_documento = :c_tipo_documento
                            and c.n_documento = :n_documento
                            and rownum = 1");

    $par = array(':c_tipo_documento' => $c_tipo_documento,
        ':n_documento' => $n_documento);
    $row_query = $db_query->do_query($par);
    
    echo json_encode($row_query[0]);
}