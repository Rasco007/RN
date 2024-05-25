<?php
require_once(INTRANET."header.php");
include('actualizacion_fecha_envio_juicio/html/main.html');

$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');

$lista_instancias = fun_id_lista('LISTADO DE TIPO DE INSTANCIA');
$lista_sec_ori = fun_id_lista('LISTADO SECTOR ORIGEN');
$lista_mot_ori = fun_id_lista('LISTADO MOTIVO ORIGEN');
$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');

?>
    <script type="text/javascript" src="actualizacion_fecha_envio_juicio/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="actualizacion_fecha_envio_juicio/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var main_grid_datos;
        var fecha_hoy = '<?=$fecha_hoy?>';

        var v_lista_instancias = '<?=$lista_instancias?>';
        var v_lista_sec_ori = '<?=$lista_sec_ori?>';
        var v_lista_mot_ori = '<?=$lista_mot_ori?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var v_lista_doc = '<?=$lista_tipo_documentos?>';
       
        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
