<?php

    $db_query = new DB_Query("
                                SELECT COUNT (*) CANTIDAD
                                  FROM PPAL.CONVERSACION_VENTANILLA
                                       INNER JOIN PPAL.MSJ_CONVERSACION USING (ID_CONVERSACION)
                                 WHERE     ID_CONTRIBUYENTE = :p_id_contribuyente
                                       AND C_ESTADO_MSJ = 'N'
                                       AND C_TIPO_CONV = 'NOTIF'
                                       AND F_ANULACION IS NULL
                                       AND F_AUTORIZACION IS NOT NULL 
                                       AND F_ENVIO IS NOT NULL                                   
                                       AND TRUNC (SYSDATE) BETWEEN f_public_desde
                                                               AND NVL (f_public_hasta, TRUNC (SYSDATE))
");


    $par = array(':p_id_contribuyente' => $_SESSION['id_rel_persona']);
    try{
        $row_query= $db_query->do_query($par);
    }catch (Exception $e) {
        die($e);
    };

    $cant_notif = $row_query[0]['CANTIDAD'];

    $db_query->setQuery("SELECT COUNT (*) CANTIDAD
                                  FROM PPAL.CONVERSACION_VENTANILLA
                                       INNER JOIN PPAL.MSJ_CONVERSACION USING (ID_CONVERSACION)
                                 WHERE     ID_CONTRIBUYENTE = :p_id_contribuyente
                                       AND C_ESTADO_MSJ = 'N'
                                       AND C_TIPO_CONV = 'MSJ'
                                       AND F_ANULACION IS NULL
                                       AND F_AUTORIZACION IS NOT NULL 
                                       AND F_ENVIO IS NOT NULL                                   
                                       AND TRUNC (SYSDATE) BETWEEN f_public_desde
                                                               AND NVL (f_public_hasta, TRUNC (SYSDATE))");

    $par = array(':p_id_contribuyente' => $_SESSION['id_rel_persona']);
    try{
        $row_query= $db_query->do_query($par);
    }catch (Exception $e) {
        die($e);
    };

    $cant_msj = $row_query[0]['CANTIDAD'];

?>

<div id="e-ventanilla" class="thumbnail">
    <div id="e-ventanilla-title">
        <h2>
            <span class="glyphicon glyphicon-inbox"> </span>
            Mis Comunicaciones
        </h2>
    </div>
    <div id="e-ventanilla-types">
        <h3>
            <span class="glyphicon glyphicon-envelope"> </span>
            <a onclick="redirect_ventanilla('MSJ')" href="javascript:;">Mensajes</a>
            <a onclick="redirect_ventanilla('MSJ')" href="javascript:;">
                <div id="cantidad_msj" onclick="redirect_ventanilla('MSJ')" ><?=$cant_msj?></div>
            </a>
        </h3>
        <div class="separador"></div>
        <h3>
            <span class="glyphicon glyphicon-bell"> </span>
            <a onclick="redirect_ventanilla('NOTIF')" href="javascript:;"> Notificaciones electrónicas</a>
            <a onclick="redirect_ventanilla('NOTIF')" href="javascript:;">
                <div id="cantidad_notif" onclick="redirect_ventanilla('NOTIF')" ><?=$cant_notif?></div>
            </a>
        </h3>
        <div class="separador"></div>
    </div>
    <div id="div_btn_e-ventanilla">
        <button id="btn_e-ventanilla" class="btn btn-sm btn-arrow-right" >Ver Más</button>
    </div>

</div>

<script>

    function redirect_ventanilla(p_tipo){
        post_to_url('e-ventanilla.php',
            {
                'p_n_id_menu':10871,
                'p_m_autoquery':'S',
                'p_c_tipo_msj':p_tipo,
                'p_m_leido':'N'
            },
            '_SELF',
            'POST'
        );
    }

    $('#btn_e-ventanilla').click(function(){
        redirect_ventanilla('ALL');
    })
    
</script>