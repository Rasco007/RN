<?php

$oper = $_POST['p_oper'];

if ($oper === 'get_norden'){
    $n_instancia = $_POST['p_n_instancia'];
    $n_orden = $_POST['p_n_orden'];

    $db_query = new DB_Query("SELECT MAX(N_ORDEN) n_orden 
                              FROM INSTANCIAS 
                              WHERE N_INSTANCIA = :p_n_instancia 
                                  and c_instancia = '066' AND N_ORDEN <= :p_n_orden");

    $par = array(':p_n_instancia' => $n_instancia,':p_n_orden' => $n_orden);
    $row_query = $db_query->do_query($par);

    if (count($row_query) > 0){
        $result->n_orden = $row_query[0]['N_ORDEN'];
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'Ocurrio un error al intentar obtener los datos necesarios.';
    }

    echo json_encode($result);
}

if ($oper === 'get_sol_req'){

    $n_instancia = $_POST['p_n_instancia'];
    $n_orden = $_POST['p_n_orden'];

    $db_query = new DB_Query("select id_solicitud_requisito 
                                    from ppal.solicitudes_requisitos
                                    where id_origen = :p_id_origen
                                    and c_origen = 'INSP'");

    $par = array(':p_id_origen' => $n_instancia*100+$n_orden);

    $row_query = $db_query->do_query($par);

    if (count($row_query) > 0){

        $result->id_sol_req = $row_query[0]['ID_SOLICITUD_REQUISITO'];
        $result->resultado = 'OK';
    }else{
        $result->resultado = 'Ocurrio un error al intentar obtener los datos necesarios.';
    }

    echo json_encode($result);
}

if ($oper === 'get_max_adjunto'){
    $id_sol_req = $_POST['id_sol_req'];

    $db_query = new DB_Query("select nvl(max(id_adjunto),0) id_adjunto 
    from ppal.adjuntos 
    where id_solicitud_requisito = :p_id_sol_req");

    $par = array(':p_id_sol_req' => $id_sol_req);

    $row_query = $db_query->do_query($par);

    $result->id_adjunto = $row_query[0]['ID_ADJUNTO'];

    echo json_encode($result);
}