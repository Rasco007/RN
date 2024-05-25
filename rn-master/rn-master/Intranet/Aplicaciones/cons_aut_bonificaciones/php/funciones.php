<?php
$oper = $_POST['p_oper'];

if ($oper === 'controlarActividades'){
    $db_query = new DB_Query("SELECT COUNT (1) as contador
    FROM actividades ac
   WHERE     ac.id_contribuyente = :p_id_contribuyente
         AND ac.c_tributo = :p_c_tributo
         AND ac.n_hecho = :p_obj_hecho
         AND ac.id_nomenclador = 'NAES'
         AND ac.f_inicio_act <= TO_DATE ('31/12/2018', 'dd/mm/yyyy')
         AND (   ac.f_fin_act IS NULL
              OR ac.f_fin_act > TO_DATE ('01/01/2018', 'dd/mm/yyyy'))
         AND c_actividad NOT IN (SELECT ea.c_actividad
                                   FROM excepciones_hechos_act ea
                                  WHERE ea.id_excepcion = :p_id_excepcion)");

    $par = array(':p_id_contribuyente' => $_POST['p_id_contrib'],
        ':p_c_tributo' => $_POST['p_c_trib'],
        ':p_obj_hecho' => $_POST['p_objeto'],
        ':p_id_excepcion' => $_POST['p_id_excep']);
    $row_query = $db_query->do_query($par);

    echo json_encode($row_query[0]);
}