<?php

require_once(EXTRANET . "header.php");
//require_once 'e-ventanilla/dao/dao_ventanilla_elect.php';

$m_autoquery = $_POST['p_m_autoquery'];
$id_contribuyente = $_SESSION['id_rel_persona'];
$c_usuario = $_SESSION['usuario'];
$p_id_menu = $_POST['p_n_id_menu'];


$db_query = new DB_Query("SELECT COUNT (*) CANTIDAD
                                  FROM PPAL.CONVERSACION_VENTANILLA
                                       INNER JOIN PPAL.MSJ_CONVERSACION USING (ID_CONVERSACION)
                                 WHERE     ID_CONTRIBUYENTE = :p_id_contribuyente
                                       AND C_ESTADO_MSJ = 'N'
                                       AND C_TIPO_CONV = 'NOTIF'
                                       AND F_ANULACION IS NULL
                                       AND F_AUTORIZACION IS NOT NULL 
                                       AND F_ENVIO IS NOT NULL                                   
                                       AND TRUNC (SYSDATE) BETWEEN f_public_desde
                                                               AND NVL (f_public_hasta, TRUNC (SYSDATE))");


$par = array(':p_id_contribuyente' => $_SESSION['id_rel_persona']);
try {
    $row_query = $db_query->do_query($par);
} catch (Exception $e) {
    die($e);
};

$cant_notif = $row_query[0]['CANTIDAD'];

?>
    <div class='msj_bloqueante_alert'>
        <div class="alert alert-danger" role="alert" style="margin-bottom:0.5em">
            <div class="row vertical-align">
                <div class="col-xs-1 text-center">
                    <i class="fa fa-exclamation-triangle fa-2x"></i>
                </div>
                <div class="col-xs-11">
                    <strong>Existen notificaciones/comunicaciones pendientes.</strong>
                    <br>
                    Para continuar operando en el sistema se deben leer y notificar haciendo doble click sobre la fila.
                </div>
            </div>
        </div>
    </div>
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist" id="tabs">
            <li  role="presentation" class="active">
                <a href="#notificaciones" aria-controls="notificaciones" role="tab" data-toggle="tab" id="tab_notif"
                   style="text-align: center">
                    <span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
                    <span id="text_notif"> <br/>Notificaciones </span>
                    <span id="cant_notif"></span>
                </a>
            </li>
            <li role="presentation">
                <a href="#mensajes" aria-controls="mensajes" role="tab" data-toggle="tab" id="tab_msj"
                   style="text-align: center">
                    <span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
                    <span id="text_msj"> <br/>Mensajes </span>
                    <span id="cant_msj"></span>
                </a>
            </li>
        </ul>
    </div>
    <div class="tab-content" >
        <!-- Sección de Notificaciones -->
        <div role="tabpanel" class="tab-pane active" id="notificaciones">
            <div id='vent_elect_notif_grid'>
                <table id='ventanilla_elect_notif_grid' class='scroll' >
                    <tr><td></td></tr>
                </table>
                <div id='ventanilla_elect_notif_grid_pager' class='scroll' style='text-align:center;'></div>
            </div>
            <!-- Tooltip para ver las acciones-
            <div id='ventanilla_elect_notif_grid_info'>
                <div class="icono_bloqueante inner">
                    <p><b><u>¿Mensaje Bloqueante?</u></b></p>
                    <p><span class="glyphicon glyphicon-exclamation-sign"></span> Mensaje Bloqueante</p>
                    <p><span class="glyphicon glyphicon-minus"></span> Mensaje no Bloqueante</p>
                </div>
            </div> !-->
        </div>
        <div role="tabpanel" class="tab-pane " id="mensajes">
            <div id='vent_elect_msj_grid'>
                <table id='ventanilla_elect_msj_grid' class='scroll' >
                    <tr><td></td></tr>
                </table>
                <div id='ventanilla_elect_msj_grid_pager' class='scroll' style='text-align:center;'></div>
            </div>
            <!-- Tooltip para ver las acciones
            <div id='ventanilla_elect_msj_grid_info'>
                <div class="icono_bloqueante inner">
                    <p><b><u>¿Mensaje Bloqueante?</u></b></p>
                    <p><span class="glyphicon glyphicon-exclamation-sign"></span> Mensaje Bloqueante</p>
                    <p><span class="glyphicon glyphicon-minus"></span> Mensaje no Bloqueante</p>
                </div>
            </div>-->
        </div>
    </div>
    <div id="leyenda_mensajes">
        <span class="leyenda_grilla">Haga doble-click sobre la fila para visualizar el mensaje asociados.</span>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" id="modal_mensaje_vent" data-keyboard="false" data-backdrop="static" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content col-md-12">
                <div class="modal-header">
                    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
                    <h4 class="modal-title" id="id_titulo"></h4>
                </div>
                <div class="modal-body">
                    <div>
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs" role="tablist" id="tabs">
                            <li  role="presentation" class="active">
                                <a href="#d_mensaje" aria-controls="d_mensaje" role="tab" data-toggle="tab" id="tab_mensaje"
                                   style="text-align: center">
                                    <span id="tab_msj"> Mensaje </span>
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#adjuntos" aria-controls="mensajes" role="tab" data-toggle="tab" id="tab_msj"
                                   style="text-align: center">
                                    <span id="tab_adjunto"> Adjuntos </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" >
                        <div role="tabpanel" class="tab-pane active" id="d_mensaje">
                            <div class="panel panel-primary" style="margin-bottom: 0px">
                                <textarea style="display: none;" id="txt_mensaje_lectura_hide" class="validate[required]" class="sr-only"></textarea>
                                <textarea id="txt_mensaje_lectura"></textarea>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="adjuntos">
                            <input type="hidden" id="id_adjuntos">
                            <?php require_once FRAMEWORK_PROYECTO_DIR . "Funciones/adjuntar_req/adjuntos.php"; ?>
                        </div>
                     </div>
                    <!-- Botones genéricos del mensaje -->
                    <div id="row_botones_msj" class="row-search text-center" style="margin-top: 5px;margin-bottom: 5px;">
                        <button type="button" id="btn_cerrar_msj" class="btn btn-primary" data-dismiss="modal">
                            <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span> Cerrar Mensaje
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var p_id_menu = '<?= $p_id_menu ?>';
        var p_id_contribuyente = "<?= $id_contribuyente ?>";
        var p_msj_bloqueantes = "<?=$cant_notif?>";
        var v_fecha_hoy = '<?=date('d/m/Y');?>';
        var p_c_tipo_msj = '<?=$_POST['p_c_tipo_msj']?>'

    </script>

    <link rel="stylesheet" href="e-ventanilla/css/style_ventanilla.css">
    <script src="<?=RECURSOS_FRAMEWORK_PROY?>tinyMCE/tinymce.min.js" type='text/javascript'></script>
    <script type='text/javascript' src='e-ventanilla/js/ventanillaElect.js'></script>

<?php
require_once(EXTRANET . "footer.php");
?>