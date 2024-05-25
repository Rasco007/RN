<?php
$oper = $_POST['p_oper'];

if ($oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'infoPatentes'){
    $c_tributo = $_POST['c_tributo'];

    $db_query = new DB_Query("select d_patente, d_patente_vieja,
                                        (select siat.fun_calcula_digito_verificador(d_patente) from dual) digito_patente,
                                        (select siat.fun_calcula_digito_verificador(d_patente_vieja) from dual) digito_patente_vieja,
                                        (select c_tipo_imponible from tributos where c_tributo = :c_tributo) c_tipo_imponible
                                        from automotores 
                                        where d_patente = :d_patente or d_patente_vieja = :d_patente_vieja");

    $par = array(':d_patente' => $_POST['d_patente'], ':d_patente_vieja' => $_POST['d_patente_vieja'], ':c_tributo' => $c_tributo);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'tipoImponible'){
    $c_tributo = $_POST['c_tributo'];

    $db_query = new DB_Query("select c_tipo_imponible from tributos where c_tributo = :c_tributo");

    $par = array(':c_tributo' => $c_tributo);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'datosContribuyente'){
    $n_cuit = $_POST['n_cuit'];
    $n_documento = $_POST['n_documento'];
    $result['existe_contribuyente'] = -1;

    $db_query_fecha = new DB_Query("SELECT MAX(F_VIG_DESDE) f_vig_desde_mayor FROM CONTRIBUYENTES_TRIBUTOS ct
                                        WHERE  NVL(C_motivo_baja,c_motivo_cese_prov) IN ('17','18') 
                                        AND d_objeto_hecho = :d_patente");
    $par_fecha = array(':d_patente' => $_POST['d_patente']);
    $row_query_fecha = $db_query_fecha->do_query($par_fecha);

    if (!$row_query_fecha[0]){
        echo json_encode($result);
    }
    else{
        $db_query_contribuyente = new DB_Query("select id_contribuyente 
                  from   contribuyentes_Tributos ct
                  where  nvl(C_motivo_baja,c_motivo_cese_prov) in ('17','18')
                  and    ct.f_vig_desde = :f_mayor_fecha
                  and    d_objeto_hecho = :d_patente
                  and   (f_vig_hasta is not null or f_cese_provisorio is not null)
                  and   ( 0 < (select count(*)
                               from   obligaciones 
                               where  c_tributo = ct.c_tributo
                               and    d_objeto_hecho = ct.d_objeto_hecho
                      )
                         or  pack_automotores.auto_exento(ct.d_objeto_hecho) = 'S'
                        )
                  and   0 < ( select count(*)
                              from   usuarios_tributos a
                              where  a.c_usuario = get_info_user('c_usuario') and
                                     a.c_tributo = ct.c_tributo
                     )");

        $par_contribuyente = array(':f_mayor_fecha' => $row_query_fecha[0]['F_VIG_DESDE_MAYOR'],
            ':d_patente' => $_POST['d_patente']);
        $row_query_contribuyente = $db_query_contribuyente->do_query($par_contribuyente);

        if (!$row_query_contribuyente[0]){
            echo json_encode($result);
        }
        else {
            if (($n_cuit != '' or $n_documento != '')){
                $db_query_datos_cont = new DB_Query("select id_contribuyente, fun_formato_cuit(n_cuit) n_cuit, n_documento, d_denominacion, c_tipo_documento 
                                                from contribuyentes
                                                where (n_cuit = :n_cuit or n_documento = :n_documento)
                                                and id_contribuyente = :id_contrib");

                $par = array(':n_cuit' => $_POST['n_cuit'], ':n_documento' => $_POST['n_documento'],
                    ':id_contrib' => $row_query_contribuyente[0]['ID_CONTRIBUYENTE']);
                $row_query = $db_query_datos_cont->do_query($par);
            }
            else {
                $db_query_datos_cont = new DB_Query("select id_contribuyente, fun_formato_cuit(n_cuit) n_cuit, n_documento, d_denominacion, c_tipo_documento 
                                                from contribuyentes
                                                where id_contribuyente = :id_contrib");
                $par = array(':id_contrib' => $row_query_contribuyente[0]['ID_CONTRIBUYENTE']);
                $row_query = $db_query_datos_cont->do_query($par);
            }

            if (!$row_query[0]){
                $result['existe_contribuyente'] = 'Los datos ingresados no son correctos.';
                echo json_encode($result);
            }
            else {
                $result['existe_contribuyente'] = 0;
                $result['id_contribuyente'] = $row_query[0]['ID_CONTRIBUYENTE'];
                $result['n_cuit'] = $row_query[0]['N_CUIT'];
                $result['n_documento'] = $row_query[0]['N_DOCUMENTO'];
                $result['d_denominacion'] = $row_query[0]['D_DENOMINACION'];
                $result['c_tipo_documento'] = $row_query[0]['C_TIPO_DOCUMENTO'];

                echo json_encode($result);
            }
        }
    }
}

if ($oper === 'cuit'){
    $filtro = $_POST['filtro'];

    $db_query = new DB_Query(
        "SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
			(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, c.n_documento
	from contribuyentes c where n_cuit = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'datosAutomotor'){
    $db_query = new DB_Query("select aut.c_fmcamod, tac.d_marca, tac.d_descripcion, tac.d_tipo, c_grupo
                                        from automotores aut, siat.tab_acara_codigos tac
                                        where d_patente = :d_patente and aut.c_fmcamod = tac.c_fmcamod(+)");
    $par = array(':d_patente' => $_POST['d_patente']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'datosMTM'){
    $db_query = new DB_Query("select tac.c_fmcamod, tac.d_marca, tac.d_descripcion, tac.d_tipo
                                        from siat.tab_acara_codigos tac
                                        where tac.c_fmcamod = :c_fmcamod");
    $par = array(':c_fmcamod' => $_POST['c_fmcamod']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($oper === 'dni'){
    $filtro = $_POST['filtro'];

    $db_query = new DB_Query(
        "SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion, c.c_tipo_documento,
			(select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, c.n_documento
	from contribuyentes c where c.n_documento = :filtro");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}