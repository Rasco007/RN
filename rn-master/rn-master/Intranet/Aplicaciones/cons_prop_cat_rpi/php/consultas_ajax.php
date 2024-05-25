<?php
$p_oper = $_POST['p_oper'];

if($p_oper == 'tiene_resp'){
    $c_tipo_respon = $_POST['c_tipo_respon'];
    $db_query = new DB_Query(
        "SELECT count(1) cant
                from tablas_generales 
		        where n_tabla = 7
		        and c_dato =  :c_tipo_respon");
    $par = array(':c_tipo_respon' => $c_tipo_respon);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}

if($p_oper == 'get_partida'){
    $nomenclatura = $_POST['nomenclatura'];
    $db_query = new DB_Query(
        "SELECT d_nomenclatura rta
                from inmuebles i 
		        where d_nomenclatura_real =  :nomenclatura");
    $par = array(':nomenclatura' => $nomenclatura);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}