<?php
require_once(INTRANET."header.php");
include('anulacion_juicios/html/main.html');
$lista_instancias = fun_id_lista('LISTADO DE TIPO DE INSTANCIA');
$lista_sec_ori = fun_id_lista('LISTADO SECTOR ORIGEN');
$lista_mot_ori = fun_id_lista('LISTADO MOTIVO ORIGEN');
$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
?>
    <link rel="stylesheet" type="text/css" href="anulacion_juicios/css/styles.css">
    <script type="text/javascript" src="anulacion_juicios/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="anulacion_juicios/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript">
        var v_lista_instancias = '<?=$lista_instancias?>';
        var v_lista_sec_ori = '<?=$lista_sec_ori?>';
        var v_lista_mot_ori = '<?=$lista_mot_ori?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var v_lista_doc = '<?=$lista_tipo_documentos?>';
        var main_grid_datos;
        var grid_instancia;
        var fecha_hoy = '<?=$fecha_hoy?>';
        var f_confirmacion;
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['main_grid'] = new Array();
       
        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
