<?php
$p_oper = $_POST['p_oper'];

if($p_oper == 'consulta_ppal'){
    $d_objeto_hecho = $_POST['d_objeto_hecho'];
    $dominio_ant = $_POST['dominio_ant'];

    $db_query = new DB_Query();

    if ($dominio_ant == 1) {
        $query = "SELECT d_patente FROM automotores WHERE d_patente_vieja = :d_objeto_hecho";
        $db_query ->setQuery($query);
        $par = array(':d_objeto_hecho' => $d_objeto_hecho);
        $row_query = $db_query->do_query($par);
        $d_objeto_hecho = $row_query[0]['D_PATENTE'];
    }

    $query = "SELECT ct.*,
                   c.id_contribuyente,
                   fun_formato_cuit (n_cuit)
                       AS cuit,
                   d_denominacion
                       AS denominacion,
                   c.c_tipo_documento,
                   (SELECT d_dato
                      FROM tablas_generales
                     WHERE n_tabla = 1 AND c_dato = c.c_tipo_documento)
                       d_tipo_documento,
                   fun_formato_numerico (c.n_documento, 0)
                       n_documento,
                   (SELECT d_dato
                      FROM tablas_generales tg
                     WHERE tg.n_tabla = ct.n_tabla_mot_baja AND c_dato = ct.C_MOTIVO_BAJA)
                       d_motivo_baja,
                   (SELECT d_dato
                      FROM tablas_generales tg
                     WHERE     tg.n_tabla = ct.n_tabla_mot_cese
                           AND c_dato = ct.C_MOTIVO_CESE_PROV)
                       d_motivo_cese_prov,
                   a.d_patente_vieja,
                   SIAT.FUN_CALCULA_DIGITO_VERIFICADOR(a.d_patente_vieja) digito_ant,
                   SIAT.FUN_CALCULA_DIGITO_VERIFICADOR(ct.d_objeto_hecho) digito
              FROM contribuyentes_tributos ct, contribuyentes c, automotores a
             WHERE     c.ID_CONTRIBUYENTE = ct.ID_CONTRIBUYENTE
                   AND ct.D_OBJETO_HECHO = a.D_PATENTE
                   AND c_tributo = obtener_constante ('TRAUTOMOTOR')
                   AND d_objeto_hecho = :d_objeto_hecho
                   AND c_motivo_cese_prov IN ('17','18','19','22')
                   AND f_cese_provisorio IS NOT NULL
                   AND NOT EXISTS
                           (SELECT 1
                              FROM contribuyentes_tributos ct2
                             WHERE     ct2.c_tributo = obtener_constante ('TRAUTOMOTOR')
                                   AND ct2.d_objeto_hecho = ct.d_objeto_hecho
                                   AND ct2.id_contribuyente != ct.id_contribuyente
                                   AND ct2.f_vig_hasta IS NULL
                                   AND CT2.F_CESE_PROVISORIO IS NULL)
                   AND NVL (ct.f_vig_hasta, f_cese_provisorio) =
                       (SELECT MAX (NVL (ct2.f_vig_hasta, ct2.f_cese_provisorio))
                          FROM contribuyentes_tributos ct2
                         WHERE     ct2.c_tributo = obtener_constante ('TRAUTOMOTOR')
                               AND ct2.d_objeto_hecho = ct.d_objeto_hecho
                               AND (   ct2.f_vig_hasta IS NOT NULL
                                    OR ct2.f_cese_provisorio IS NOT NULL))";
    $db_query ->setQuery($query);
    $par = array(':d_objeto_hecho' => $d_objeto_hecho);
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

if($p_oper == 'dni'){
    $c_tipo_documento = ($_POST['c_tipo_documento']);
    $n_documento = ($_POST['n_documento']);
    $db_query = new DB_Query("SELECT id_contribuyente,
                                           fun_formato_cuit (n_cuit)
                                               AS cuit,
                                           d_denominacion
                                               AS denominacion,
                                           c.c_tipo_documento,
                                           (SELECT d_dato
                                              FROM tablas_generales
                                             WHERE n_tabla = 1 AND c_dato = c.c_tipo_documento)
                                               d_tipo_documento,
                                           fun_formato_numerico (c.n_documento, 0)
                                               n_documento
                                      FROM contribuyentes c
                                     WHERE     c.c_tipo_documento = :c_tipo_documento
                                           AND c.n_documento = :n_documento
                                           AND ROWNUM = 1");

    $par = array(':c_tipo_documento' => $c_tipo_documento,
        ':n_documento' => $n_documento);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}

if($p_oper == 'verif_dom'){
    $d_objeto_hecho = $_POST['d_objeto_hecho'];
    $db_query = new DB_Query(
        "SELECT fun_calcula_digito_verificador(:d_objeto_hecho) as valor_verificacion from DUAL");

    $par = array(':d_objeto_hecho' => $d_objeto_hecho);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}