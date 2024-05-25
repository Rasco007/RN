<?php
$oper = $_POST['p_oper'];

if ($oper === 'check060'){
    $db_query = new DB_Query("SELECT count(1) cant FROM INSTANCIAS 
                                        WHERE ID_INSPECCION = :p_id_inspeccion
                                        --AND N_ORDEN <= :p_n_orden 
                                        and c_instancia = '060'");

    $par = array(':p_id_inspeccion' => $_POST['p_id_inspeccion'],':p_n_orden' => $_POST['p_n_orden']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}