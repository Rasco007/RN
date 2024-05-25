<?php
$oper = $_REQUEST['p_oper'];

if($oper == 'get_msj_bloqueantes'){
    $id_contribuyente = $_SESSION['id_rel_persona'];

    $db_query = new DB_Query("  SELECT COUNT (*) MSJ_BLOQ
                                  FROM PPAL.CONVERSACION_VENTANILLA
                                       INNER JOIN PPAL.MSJ_CONVERSACION USING (ID_CONVERSACION)
                                 WHERE     ID_CONTRIBUYENTE = :p_id_contribuyente
                                       AND C_ESTADO_MSJ = 'N'
                                       AND C_TIPO_CONV = 'NOTIF'
                                       AND F_ANULACION IS NULL
                                       AND F_AUTORIZACION IS NOT NULL 
                                       AND F_ENVIO IS NOT NULL                                   
                                       AND TRUNC (SYSDATE) BETWEEN f_public_desde
                                                               AND NVL (f_public_hasta, TRUNC (SYSDATE))"
    );
    $parametros = array(':p_id_contribuyente' => $id_contribuyente);
    $row_query = $db_query->do_query($parametros);

    //die(json_encode($row_query));
    $response -> resultado = 'OK';
    $response -> msj_bloq = $row_query[0]['MSJ_BLOQ'];
    echo json_encode($response);
}

?>