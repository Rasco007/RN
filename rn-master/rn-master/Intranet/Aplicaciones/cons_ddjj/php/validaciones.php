
<?php
$p_oper = $_POST['p_oper'];


if ($p_oper === 'TIMPONIBLE'){

    $c_tributo = $_POST['c_tributo'];

    $db_query = new DB_Query("SELECT c_tipo_imponible TIPO from tributos where c_tributo = :c_tributo");

    $par = array( ':c_tributo' => $c_tributo);

    $row_query = $db_query->do_query($par);

    $respuesta->TIPO = $row_query[0]['TIPO'];

    echo json_encode($respuesta);
}

if ($p_oper === 'buscarfechas'){


     $c_tributo = $_POST['pc_tributo'];
     $d_objeto_hecho = $_POST['pd_objeto_hecho'];



    $db_query = new DB_Query(
        "SELECT    ct.c_tipo_imponible, ct.f_vig_desde, ct.f_vig_hasta, ct.f_cese_provisorio
			from   contribuyentes_tributos ct 
			where   ct.c_tributo = :pc_tributo  and ct.d_objeto_hecho = :pd_objeto_hecho and  rownum <= 1");

    $par = array( ':pc_tributo'  => $c_tributo, ':pd_objeto_hecho' => $d_objeto_hecho );

    $row_query = $db_query->do_query($par);


    echo json_encode($row_query[0]);



}

if ($p_oper === 'buscarobjeto'){
    $c_tributo = $_POST['c_tributo'];
    $d_objeto_hecho = $_POST['d_objeto_hecho'];
    $id_contribuyente = $_POST['id_contribuyente'];

    $db_query = new DB_Query(
        "SELECT    ct.c_tipo_imponible, ct.c_tributo, d_objeto_hecho , d_descrip, ct.f_vig_desde, ct.f_vig_hasta, ct.f_cese_provisorio
			from   contribuyentes_tributos ct, tributos t
			where ct.id_contribuyente = :pid_contribuyente 
			and ct.c_tributo = t.c_tributo
			and ct.c_tributo in (10,20,30,32,33,40,42,150)
			and ct.f_vig_hasta is null and ct.f_cese_provisorio is null and rownum <= 1");

    $par = array( ':pid_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);

}






if ($p_oper === 'contribuyentes'){
    $c_tributo = $_POST['c_tributo'];
    $d_objeto_hecho = $_POST['d_objeto_hecho'];

    $db_query = new DB_Query(
        "SELECT c.id_contribuyente ID_CONTRIBUYENTE, n_cuit, d_denominacion  , c_tipo_imponible
			from contribuyentes c, contribuyentes_tributos ct
			where c.id_contribuyente = ct.id_contribuyente 
			and ct.c_tributo = :c_tributo
			and ct.d_objeto_hecho = :d_objeto_hecho");

    $par = array(':d_objeto_hecho' => $d_objeto_hecho, ':c_tributo' => $c_tributo, ':c_tipo_imponible' => $c_tipo_imponible);
    $row_query = $db_query->do_query($par);
    echo json_encode($row_query[0]);
    /*
    $respuesta->TOTAL = $row_query[0]['TOTAL'];
    echo json_encode($respuesta);
    */
}

if ($p_oper === 'FORMULARIO'){

    $c_tipo_form    = $_POST['c_tipo_form'];
    $pid_obligacion = $_POST['p_id_obligacion'];




    $db_query = new DB_Query("select count(1) as TOTAL from formularios where c_formulario = :c_tipo_form");

    $par = array(':c_tipo_form' => $c_tipo_form);

    $row_query = $db_query->do_query($par);

    $respuesta->TOTAL = $row_query[0]['TOTAL'];

    echo json_encode($respuesta);
}




?>