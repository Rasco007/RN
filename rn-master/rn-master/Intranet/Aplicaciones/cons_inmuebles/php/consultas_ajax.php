<?php

$p_oper = $_POST['p_oper'];

if($p_oper == 'datos_generales'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $d_nomenclatura = $_POST['d_nomenclatura']; // PARTIDA
    $d_nomenclatura_real = $_POST['d_nomenclatura_real']; // NOMENCLATURA
    $db_query = new DB_Query(
        "SELECT count(1) cant
        FROM inmuebles i, contribuyentes_tributos c
        WHERE i.d_nomenclatura = c.D_OBJETO_HECHO
           AND i.d_nomenclatura = NVL ( :d_nomenclatura, i.d_nomenclatura)
           AND i.d_nomenclatura_real = NVL ( :d_nomenclatura_real, i.d_nomenclatura_real)
           AND c.id_contribuyente = NVL( :id_contribuyente, c.id_contribuyente)");

    $par = array(':id_contribuyente' => $id_contribuyente,
                ':d_nomenclatura' => $d_nomenclatura,
                ':d_nomenclatura_real' => $d_nomenclatura_real);

    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'valuaciones'){
    $id_inmueble = $_POST['id_inmueble'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
        from SIAT.VW_VALUACIONES_FECHA v where v.id_inmueble = :id_inmueble");

    $par = array(':id_inmueble' => $id_inmueble);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'impuesto'){
    $id_inmueble = $_POST['id_inmueble'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from vw_impuesto_inmobiliario vw, valuaciones_inmuebles_datos vd, valuaciones_inmuebles va
                where vw.id_inmueble=:id_inmueble
                and vw.id_inmueble=vd.id_inmueble
                and vw.n_posicion_fiscal=vd.n_posicion_fiscal
                and vw.id_inmueble=va.id_inmueble
                and vw.n_posicion_fiscal=va.n_posicion_fiscal");
    $par = array(':id_inmueble' => $id_inmueble);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'respon_prop'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from objetos_contribuyentes 
                where c_tipo_respon IN (4,6) 
                and C_TRIBUTO = 60 
                and d_objeto_hecho = :d_nomenclatura");
    $par = array(':d_nomenclatura' => $d_nomenclatura);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'domic_prop'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from domicilios d
                where (c_tipo_domicilio = '1' or c_tipo_domicilio in 
                    (select r.c_tipo_domicilio  from relaciones r
                       where r.id_contribuyente = :id_contribuyente and
                             r.c_tributo        = 60  and 
                             r.c_tipo_imponible = '5' and 
                             r.d_objeto_hecho   = :d_nomenclatura))
                and d.id_contribuyente = :id_contribuyente");

    $par = array(':d_nomenclatura' => $d_nomenclatura,
        ':id_contribuyente' => $id_contribuyente);

    $row_query = $db_query->do_query($par);
    echo json_encode($row_query);
}

if($p_oper == 'otros_resp'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from objetos_contribuyentes 
                where c_tipo_respon not IN (4,6,9) 
                and c_tributo = 60 
                and d_objeto_hecho = :d_nomenclatura");
    $par = array(':d_nomenclatura' => $d_nomenclatura);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'otros_resp_dom'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from domicilios
                where id_contribuyente = :id_contribuyente 
                and (c_tipo_domicilio = '1'  or c_tipo_domicilio IN   
                                                 (select c_tipo_domicilio from relaciones r
                                                   where r.id_contribuyente = :id_contribuyente and 
                                                         r.c_tributo = 60 and 
                                                         r.c_tipo_imponible = '5' and 
                                                         r.d_objeto_hecho = :d_nomenclatura ))");

    $par = array(':d_nomenclatura' => $d_nomenclatura,
        ':id_contribuyente' => $id_contribuyente);

    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
}

if($p_oper == 'tiene_movs'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from INM_MOVIMIENTOS 
                where d_objeto_hecho=:d_nomenclatura"); // order by f_movimiento desc, f_alta desc, f_actualizac DESC
    $par = array(':d_nomenclatura' => $d_nomenclatura);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
if($p_oper == 'tiene_part_madres'){
    $id_inmueble = $_POST['id_inmueble'];
    $db_query = new DB_Query( //"select 1 cant from dual where :id_inmueble=:id_inmueble"
        "SELECT count(1) cant
                FROM inmuebles_origen  m,
                    inmuebles_origen  h,
                    inmuebles         im,
                    inmuebles         ih
                WHERE     m.id_inmueble_mad = im.id_inmueble
                AND h.id_inmueble_dest = ih.id_inmueble
                AND (   (h.id_inmueble_dest = :id_inmueble AND h.id_inmueble_mad  = m.id_inmueble_mad)
                    OR (h.id_inmueble_mad  = :id_inmueble AND h.id_inmueble_dest = m.id_inmueble_dest))");
    $par = array(':id_inmueble' => $id_inmueble);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
/* // FUNCIONALIDAD BOTON IRC COMENTADA PORQUE EN EL FORM ESTÁ PERO NO SE USA NI SE MUESTRA
if($p_oper == 'tiene_datos_irc_1'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from TMP_PARCELA_CAT1 tpc
                where tpc.nom_cat = :d_nomenclatura");
    $par = array(':d_nomenclatura' => $d_nomenclatura);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
if($p_oper == 'tiene_datos_irc_2'){
    $d_nomenclatura = $_POST['d_nomenclatura'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                    FROM TMP_TITULAR_DOM1 dom, TMP_DOMICILIO_TIT1 tit
                    WHERE     dom.nom_cat = :d_nomenclatura
                       AND dom.id_envio = tit.ID_ENVIO
                       AND dom.c_tipo_doc = tit.C_TIPO_DOC
                       AND dom.num_documento = tit.num_documento");
    $par = array(':d_nomenclatura' => $d_nomenclatura);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
*/
