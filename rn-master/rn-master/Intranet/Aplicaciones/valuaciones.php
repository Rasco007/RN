<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$p_modo = $_POST['p_modo'];



$lista_alicuotas = fun_id_lista('LISTADO DE ALICUOTAS SIRCREB');
$lista_marcas = fun_id_lista('LISTA MARCAS AUTOMOTOR');
$lista_modelos = fun_id_lista('LISTA MODELOS AUTOMOTOR');
$lista_descripciones = fun_id_lista('LISTADO DESCRIPCIONES AUTOMOTOR');
$lista_grupos = fun_id_lista('LISTA DE GRUPOS AUTOMOTOR PARA CONSULTA');
$lista_origen = fun_id_lista('LISTADO DE ORIGEN AUTOMOTOR');
$lista_moneda = fun_id_lista('LISTADO TIPOS MONEDA');

#HTML PRINCIPAL
include('valuaciones/html/principal.html');
include('valuaciones/html/modal.html');
?>
    <link rel="stylesheet" type="text/css" href="valuaciones/css/styles.css?no_cache=<?=date('dmyhis')?>'" />

<script type='text/javascript' src='valuaciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

    <script type='text/javascript' src='valuaciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
       
        
        
        var v_lista_alicuotas = '<?=$lista_alicuotas?>';
        var p_modo = '<?=$p_modo?>';

        var v_lista_marcas = '<?=$lista_marcas?>';
        var v_lista_modelos = '<?=$lista_modelos?>';
        var v_lista_descripciones = '<?=$lista_descripciones?>';
        var v_lista_grupos = '<?=$lista_grupos?>';
        var v_lista_origen = '<?=$lista_origen?>';
        var v_lista_moneda = '<?=$lista_moneda?>';
        
        
        var ajax_autocomplete = null;
        //var filtros_no_nativos_ar = new Array();
        //var filtros_arr_main = [];
        var v_no_carga_inicial_pph = false;

        var v_id_menu = '<?=$p_n_id_menu?>';
       // filtros_no_nativos_ar['grid_inspecciones'] = new Array();
       // filtros_no_nativos_ar['detalles_grid'] = new Array();
        

        var datos_main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden: 0,
            m_autoquery:'N'
            
        });

        

        $(document).ready(function() {
            inicializarGrillas();
            inicializa_lupas();
            inicializa_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>