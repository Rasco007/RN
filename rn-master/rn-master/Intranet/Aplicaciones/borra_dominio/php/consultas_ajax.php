<?php

$oper = $_POST['p_oper'];
$p_d_dominio = $_POST['p_d_dominio'];
$p_d_dominio_ant = $_POST['p_d_dominio_ant'];

if ($oper === 'checkDigito') {
    $p_c_verif_dom = null;
    if ($p_d_dominio == null) {
        $db_query = new DB_Query(
            "select d_patente
                            from   automotores
                            where  d_patente_vieja = :p_dominio_ant
                            and    rownum < 2");
        $par = array(':p_dominio_ant' => $p_d_dominio_ant);
        $row_query = $db_query->do_query($par);

        if (count($row_query) == 0) {
            $row_query[0]['ERROR'] = 'No existen datos del dominio.';
            echo json_encode($row_query[0]);
            return;
        } else {
            $p_d_dominio = $row_query[0]['D_PATENTE'];
        }
    }else{
        $db_query = new DB_Query(
            "select d_patente
                            from   automotores
                            where  d_patente = :p_dominio
                            and    rownum < 2");
        $par = array(':p_dominio' => $p_d_dominio);
        $row_query = $db_query->do_query($par);

        if (count($row_query) == 0) {
            $row_query[0]['ERROR'] = 'No existen datos del dominio.';
            echo json_encode($row_query[0]);
            return;
        }
    }

    $db_query = new DB_Query(
        "SELECT COUNT (1) validacion
                      FROM automotores a
                     WHERE     d_patente = :p_dominio
                           AND (   EXISTS
                                       (SELECT 1
                                          FROM obligaciones o, pagos_efectuados p
                                         WHERE     p.id_obligacion = o.id_obligacion
                                               AND o.c_tributo = 90
                                               AND o.d_objeto_hecho = a.d_patente)
                                OR EXISTS
                                       (SELECT 1
                                          FROM boletas_agrupadas ba, obligaciones o
                                         WHERE     o.id_obligacion = ba.id_obligacion
                                               AND o.c_tributo = 90
                                               AND o.d_objeto_hecho = a.d_patente))");
    $par = array(':p_dominio' => $p_d_dominio);
    $row_query = $db_query->do_query($par);

    if ($row_query[0]['VALIDACION'] == 1) {
        $row_query[0]['ERROR'] = 'Este dominio no puede borrarse';
        echo json_encode($row_query[0]);
        return;
    }

    $db_query = new DB_Query("SELECT 
                                        SIAT.fun_calcula_digito_verificador(:p_dominio) c_verificador_dom,
                                        SIAT.fun_calcula_digito_verificador(:p_dominio_ant) c_verificador_dom_ant
                                    FROM DUAL");

    $par = array(':p_dominio' => $p_d_dominio, ':p_dominio_ant' => $p_d_dominio_ant);
    $row_query = $db_query->do_query($par);
    $row_query[0]['ERROR'] = 'OK';

    echo json_encode($row_query[0]);
}

if ($oper === 'buscaDetalle') {
    $p_c_verif_dom = null;
    if ($p_d_dominio == null ){
        $db_query = new DB_Query(
            "select d_patente,
                            SIAT.FUN_CALCULA_DIGITO_VERIFICADOR(d_patente) c_verif_dom
                            from   automotores
                            where  d_patente_vieja = :p_dominio_ant
                            and    rownum < 2");
        $par = array(':p_dominio_ant' => $p_d_dominio_ant);
        $row_query = $db_query->do_query($par);

        if (count($row_query) == 0){
            $row_query[0]['ERROR'] = 'No existen datos del dominio.';
            echo json_encode($row_query[0]);
            return;
        }else{
            $p_d_dominio = $row_query[0]['D_PATENTE'];
            $p_c_verif_dom = $row_query[0]['C_VERIF_DOM'];
        }
    }

    $db_query = new DB_Query(
        "SELECT d_patente_vieja,
                        SIAT.FUN_CALCULA_DIGITO_VERIFICADOR(d_patente_vieja) c_verif_dom_ant,
                        c_marca_aut,
                        id_modelo,  
                        c_tipo,
                        n_modelo_año,
                        n_peso_cilindrada,
                        f_radicacion ,
                        id_descripcion,
                        d_texto_marca,
                        d_texto_modelo,
                        d_texto_descripcion,
                        NVL((select tg.d_dato
                            from   tablas_generales tg
                            where  tg.n_tabla = 216
                            and    tg.c_dato  = au.c_marca_aut),d_texto_marca) d_marca,
                        NVL((select am.d_descrip
                            from   aut_modelos am
                            where  am.c_marca_aut = au.c_marca_aut
                            and    am.id_modelo   = au.id_modelo),d_texto_modelo) d_modelo,
                        NVL((select ad.d_descrip
                            from   aut_descripcion ad
                            where  ad.c_marca_aut    = au.c_marca_aut
                            and    ad.id_modelo      = au.id_modelo 
                            and    ad.id_descripcion = au.id_descripcion),d_texto_descripcion) d_descripcion,
                        (select tg.d_dato
                            from   tablas_generales tg,
                            aut_tipos_grupos atg
                            where  tg.n_tabla = 217
                            and    tg.n_tabla = atg.n_tabla_tipo
                            and    tg.c_dato  = atg.c_tipo
                            and    atg.c_tipo = au.c_tipo) d_tipo
                from  automotores au
                where d_patente = :p_d_dominio");

    $par = array(':p_d_dominio' => $p_d_dominio);
    $row_query = $db_query->do_query($par);

    if (count($row_query) == 0){
        $row_query[0]['ERROR'] = 'No existen datos del dominio.';
    }else{
        $row_query[0]['D_DOMINIO'] = $p_d_dominio;
        $row_query[0]['C_VERIF_DOM'] = $p_c_verif_dom;
        $row_query[0]['ERROR'] = 'OK';
    }

    echo json_encode($row_query[0]);
}

?>