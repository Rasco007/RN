<?php

$p_oper = $_POST['p_oper'];

if($p_oper === "valida_fecha"){
    $p_id_sesion = $_POST['p_id_sesion'];

    $db_query = new DB_Query(
        "SELECT
            case when trunc(sysdate) <= (select distinct f_vto_2 from boletas_emitidas where id_sesion=:p_id_sesion) then 1
                else 0
            end f_valida
        from dual");

    $param = array(':p_id_sesion' => $p_id_sesion);
    $row_query = $db_query->do_query($param);

    if ($row_query[0]['F_VALIDA'] == 1){
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'NOOK';
    }

    echo json_encode($result);
}

?>