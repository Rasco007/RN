<?php

$c_organismo = $_POST['c_organismo'];
$c_region = $_POST['c_region'];

if($c_region != NULL){
    $db_query = new DB_Query("
                SELECT distinct tg.c_dato c_dato,tg.d_dato d_dato
                from consorcios_regiones cr,tablas_generales tg
                where cr.c_organismo = :c_organismo
                and cr.c_region = :c_region    
                AND ( PAC_CANON_RIEGO.FUN_PERTENECE_CONSORCIO(:c_usuario, cr.c_organismo, c_region,c_area,trunc(sysdate)) = 1
                    OR 
                      get_info_user('id_rel_persona') is null -- usuario interno de ART!!
                    )
                and cr.c_area = tg.c_dato
                and cr.n_tabla_area = tg.n_tabla
    ");

    $param = array(':c_organismo' => $c_organismo, ':c_region' => $c_region, ':c_usuario' => $_SESSION['usuario']);
    $row_query = $db_query->do_query($param);
}else{
    $row_query = NULL;
}

    $result->resultado = 'OK';
    $result->datos = $row_query;

echo json_encode($result);

?>