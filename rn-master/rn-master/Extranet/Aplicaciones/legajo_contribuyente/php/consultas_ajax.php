<?php

$p_oper = $_POST['p_oper'];

if($p_oper == 'tiene_ddjj'){
    /////////////////////////////   revisar query    /////////////////////////////
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
        from obligaciones o, ddjj d
        where o.id_contribuyente = :id_contribuyente
        and d.id_obligacion = o.id_obligacion
        and rownum = 1");
    /////////////////////////////   revisar query    /////////////////////////////

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'tiene_inmuebles_no_pagados'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
        from obligaciones
        where id_contribuyente= :id_Contribuyente
        and c_tributo = obtener_constante('TRINMOBILIARIO')
        and id_plan_pago is null
        and fun_calculo_saldo(id_obligacion,null) < 0
        and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'tiene_automotor'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) as cant_obj
        FROM OBJETOS_CONTRIBUYENTES OC
        WHERE id_contribuyente = :id_contribuyente
        and c_tributo = ppal.obtener_constante('TRAUTOMOTOR')
        and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'ddjj_no_presentadas'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query("
        SELECT count(1) cant from obligaciones 
        WHERE obligaciones.id_contribuyente = :id_contribuyente and
            fun_presenta_ddjj(obligaciones.id_obligacion) = 'S' and 
            ((exists (select 1 
                 from   ddjj d 
                 where  d.id_obligacion = obligaciones.id_obligacion
                 and rownum = 1) and
                 obligaciones.c_tributo in(obtener_constante('COD_IBD'), obtener_constante('COD_IBCM'))) or
            (exists (select 1 
                 from   ddjj_agentes d 
                 where  d.id_obligacion = obligaciones.id_obligacion
                 and rownum = 1) and
                 obligaciones.c_tributo in (obtener_constante('COD_AR'), obtener_constante('COD_AP'), obtener_constante('COD_AREC'), obtener_constante('COD_AR-SIRCREB')))) and        
            obligaciones.n_posicion_fiscal >= to_number(to_char(to_date('0101'||to_char(add_months(trunc(sysdate),-60),'yyyy'),'ddmmyyyy'),'yyyymm'))
            and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'tiene_instancias'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
        from   INSTANCIAS d
        where  ID_CONTRIBUYENTE = :id_contribuyente
        and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'tiene_inmuebles'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) as cant_obj
        FROM OBJETOS_CONTRIBUYENTES OC
        WHERE id_contribuyente = :id_contribuyente and
            c_tributo = ppal.obtener_constante('TRINMOBILIARIO')
            and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'excenciones_hechos'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
          from  excepciones_hechos
          where id_contribuyente = :id_contribuyente
            and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'excenciones_objetos'){
    $id_contribuyente = $_POST['id_contribuyente'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
          from  exenciones_objetos
          where id_contribuyente = :id_contribuyente
            and rownum = 1");

    $par = array(':id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}
?>