<?php
require_once(INTRANET."header.php");
include('tributos_especiales/html/main.html');
$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$año = date('Y');
$lista_tdom = fun_id_lista('LISTADO DE TIPOS DE DOMICILIOS TRIBA048');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS TRIBA048');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$lista_obj = fun_id_lista('LISTADO DE OBJETOS HECHOS TRIBA048');
$lista_conceptos = fun_id_lista('LISTADO DE CONCEPTOS TRIBA048');
?>
    <script type="text/javascript" src="tributos_especiales/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="tributos_especiales/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="tributos_especiales/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var datos_main_grid;
        var v_lista_tdom = '<?=$lista_tdom?>';
        var v_lista_tributos = '<?=$lista_trib?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_lista_conceptos = '<?=$lista_conceptos?>';
        var año = '<?=$año?>';

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
