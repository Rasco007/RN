<?php
$p_oper = $_POST['p_oper'];

if($p_oper == 'consulta_inmo'){
    $d_nomenclatura = $_POST['d_nomenclatura']; // PARTIDA
    $tributo = $_POST['p_tributo'];
    //$d_nomenclatura_real = $_POST['d_nomenclatura_real']; // NOMENCLATURA
    $db_query = new DB_Query(
        "SELECT c.n_cuit, c.c_tipo_documento, c.id_contribuyente,
                        (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento,
                        c.n_documento, c.d_denominacion, ct.C_MOTIVO_ALTA, ct.F_VIG_DESDE,
                        (select d_dato
                          from   tablas_generales
                          where  n_tabla = ct.n_tabla_mot_alta
                          and    c_dato  = ct.c_motivo_alta) d_motivo_alta
                  FROM contribuyentes_tributos ct, contribuyentes c
                 WHERE (ct.ID_CONTRIBUYENTE = c.ID_CONTRIBUYENTE
                        AND ct.c_tributo = :tributo
                        AND ct.f_vig_hasta IS NULL
                        AND ct.f_cese_provisorio IS NULL
                        AND ct.c_motivo_alta IN ('7', '8', '23', '31', '32')
                        AND ct.D_OBJETO_HECHO = :d_nomenclatura)");

    $par = array(':d_nomenclatura' => $d_nomenclatura,':tributo' => $tributo);

    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'checkDigito'){
    $db_query = new DB_Query("SELECT SIAT.fun_calcula_digito_verificador(:param) digito FROM DUAL");

    $par = array(':param' => $_POST['param']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if ($p_oper === 'getDatosFiltros'){
    $filtro = null;
    if ($_POST['p_tributo'] == 60){
        if ($_POST['p_partida']){
            $filtro = $_POST['p_partida'];
            $query = "SELECT d_nomenclatura objeto1, d_nomenclatura_real objeto2
                    FROM inmuebles where d_nomenclatura = :filtro";
        }elseif($_POST['p_nomenclatura']){
            $filtro = $_POST['p_nomenclatura'];
            $query = "SELECT d_nomenclatura objeto1, d_nomenclatura_real objeto2
                    FROM inmuebles where d_nomenclatura_real = :filtro";
        }
    }elseif($_POST['p_tributo'] == 90){
        if ($_POST['p_partida']){
            $filtro = $_POST['p_partida'];
            $query = "SELECT d_patente objeto1,SIAT.fun_calcula_digito_verificador(d_patente) digito1,
                             d_patente_vieja objeto2,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito2
                    FROM automotores where d_patente = :filtro";
        }elseif($_POST['p_nomenclatura']){
            $filtro = $_POST['p_nomenclatura'];
            $query = "SELECT d_patente objeto1,SIAT.fun_calcula_digito_verificador(d_patente) digito1,
                             d_patente_vieja objeto2,SIAT.fun_calcula_digito_verificador(d_patente_vieja) digito2
                    FROM automotores where d_patente_vieja = :filtro";
        }
    }
    $db_query = new DB_Query($query);
    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}
?>