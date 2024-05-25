<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'getContribuyente'){
    $db_query = new DB_Query("
    select  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion,
            c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            n_documento,
            c.m_persona
    from contribuyentes c
    where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'getAutocomplete'){
    $db_query = new DB_Query("
    select  id_contribuyente,
            fun_formato_cuit (n_cuit) as cuit, 
            d_denominacion as denominacion,
            c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            n_documento,
            c.m_persona
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
            'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE'],
            'c_tipo_documento' => $row_query[$i]['C_TIPO_DOCUMENTO'],
            'd_tipo_documento' => $row_query[$i]['D_TIPO_DOCUMENTO'],
            'n_documento' => $row_query[$i]['N_DOCUMENTO'],
            'm_persona' => $row_query[$i]['M_PERSONA']
        );
    }

    echo json_encode($options);
}

if ($oper == 4){
    $filtro = $_POST['objeto_hecho'];
    $id_contribuyente = $_POST['contrib'];
    $c_tributo = $_POST['c_tributo'];
    $c_tipo_imponible = $_POST['c_tipo_imponible'];

    $db_query = new DB_Query("SELECT ct.d_objeto_hecho, C.D_DENOMINACION, fun_formato_cuit(C.N_CUIT) N_CUIT, c.id_contribuyente,
            c.c_tipo_documento,
            (SELECT 
                d_dato 
            from 
                tablas_generales tg
            where 
                tg.n_tabla = c.n_tabla_tipo_doc
                AND tg.c_dato = c.c_tipo_documento) as d_tipo_documento,
            c.n_documento,
            c.m_persona
FROM contribuyentes_tributos ct inner join CONTRIBUYENTES C
    on ct.id_contribuyente = c.id_contribuyente
inner join tributos t
    on t.c_tipo_imponible = ct.c_tipo_imponible and T.C_TRIBUTO = ct.c_tributo
where
     ct.c_tributo = nvl(:c_tributo,ct.c_tributo) and
     ct.C_TIPO_IMPONIBLE = nvl(:c_tipo_imponible, ct.c_tipo_imponible)  and
     ct.id_contribuyente = nvl(:id_contribuyente,ct.id_contribuyente) and
     ct.D_OBJETO_HECHO = :d_objeto_hecho and
     ct.f_vig_desde = (select max (f_vig_desde) FROM contribuyentes_tributos ct where
     ct.c_tributo = nvl(:c_tributo,ct.c_tributo) and
     ct.C_TIPO_IMPONIBLE = nvl(:c_tipo_imponible, ct.c_tipo_imponible)  and
     ct.id_contribuyente = nvl(:id_contribuyente,ct.id_contribuyente) and
     ct.D_OBJETO_HECHO = :d_objeto_hecho)
     order by ct.f_alta desc");

    $par = array(':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible,':c_tributo' => $c_tributo,':d_objeto_hecho' => $filtro);
    $row_query = $db_query->do_query($par);

//print_r($row_query);

    echo json_encode($row_query[0]);
}

if($oper == 5){
    $c_tipo_documento = ($_POST['c_tipo_documento']);
    $n_documento = ($_POST['n_documento']);
    $db_query = new DB_Query("SELECT 
								d_denominacion,
								id_contribuyente,
								fun_formato_cuit(n_cuit) n_cuit,
								m_persona
						  from contribuyentes c where 
							c_tipo_documento = :c_tipo_documento
						  	AND n_documento = :n_documento");

    $par = array(':c_tipo_documento' => $c_tipo_documento,
        ':n_documento' => $n_documento);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}

if($oper === 'getDatos'){
    if ($filtro == 'F'){
        $db_query = new DB_Query("SELECT pf.c_nacionalidad,
                                               (SELECT d_dato
                                                  FROM siat.tablas_generales
                                                 WHERE n_tabla = pf.n_tabla_nacionac AND c_dato = pf.c_nacionalidad)
                                                   d_nacionalidad,
                                               pf.c_estado_civil,
                                               (SELECT d_dato
                                                  FROM siat.tablas_generales
                                                 WHERE n_tabla = pf.n_tabla_est_civil AND c_dato = pf.c_estado_civil)
                                                   d_estado_civil,
                                               pf.c_sexo,
                                               pf.f_nacimiento
                                          FROM personas_fisicas pf
                                         WHERE id_contribuyente = :id_contrib");
    }else{
        $db_query = new DB_Query("SELECT pj.c_tipo_empresa,
                                               (SELECT d_dato
                                                  FROM siat.tablas_generales
                                                 WHERE n_tabla = pj.n_tabla_tipo_emp AND c_dato = pj.c_tipo_empresa)
                                                   d_tipo_empresa,
                                               pj.c_forma_juridica,
                                               (SELECT d_dato
                                                  FROM siat.tablas_generales
                                                 WHERE     n_tabla = pj.n_tabla_forma_jur
                                                       AND c_dato = pj.c_forma_juridica)
                                                   d_forma_juridica,
                                               pj.n_sucursales,
                                               pj.n_duracion_anios,
                                               pj.f_contrato_social,
                                               pj.n_inscripcion_igj,
                                               pj.f_inscripcion_igj,
                                               (select count(1) from integrantes where id_contribuyente = :id_contrib) total_int
                                          FROM personas_juridicas pj
                                         WHERE pj.id_contribuyente = :id_contrib");
    }

    $par = array(':id_contrib' => $_POST['p_id_contribuyente']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($oper == 'datos_contribuyente'){
    $cuit = htmlentities($_POST['n_cuit']);

    $db_query = new DB_Query(
        "SELECT  c.n_cuit, 
	        c.c_tipo_documento,
	        (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) as d_tipo_documento, 
	        c.n_documento, 
	        c.d_denominacion,
	        pf.c_sexo
		from contribuyentes c, personas_fisicas pf
		where c.n_cuit=:n_cuit
		and pf.id_contribuyente= c.id_contribuyente");
    $par = array(':n_cuit' => $cuit);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}