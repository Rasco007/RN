<?php
require_once(INTRANET."header.php");
include('alta_modificacion_juicios/html/main.html');

$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$p_modo=$_POST['p_modo'];
$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_instancias = fun_id_lista('LISTADO DE TIPO DE INSTANCIA');
$lista_sec_ori = fun_id_lista('LISTADO SECTOR ORIGEN');
$lista_mot_ori = fun_id_lista('LISTADO MOTIVO ORIGEN ALTA DE JUICIOS');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

?>
    <!-- <link rel="stylesheet" type="text/css" href="alta_modificacion_juicios/css/styles.css"> -->
    <script type="text/javascript" src="alta_modificacion_juicios/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="alta_modificacion_juicios/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="alta_modificacion_juicios/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var main_grid_datos;
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';
        var secondary_grid_datos;
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var v_lista_doc = '<?=$lista_tipo_documentos?>';
        var v_lista_instancias = '<?=$lista_instancias?>';
        var v_lista_sec_ori = '<?=$lista_sec_ori?>';
        var v_lista_mot_ori = '<?=$lista_mot_ori?>';
        var v_modo = '<?=$p_modo?>';
        var v_sesion = null;
        let procesados = 0;
        var seleccionados = [];
        var v_mas_de_un_registro = false;
        
        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php

