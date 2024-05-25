<?php
require_once(FRAMEWORK_DIR."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS AUTOMOTOR E INMOBILIARIO');
$lista_grupos = fun_id_lista('LISTADO DE GRUPOS');

#HTML PRINCIPAL
include('bonificaciones_especiales/html/main.html');
?>  

<script type='text/javascript' src='bonificaciones_especiales/js/functions.js?no_cache=<?=date('dmyhis')?>'></script>    
    <script type='text/javascript' src='bonificaciones_especiales/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='bonificaciones_especiales/js/lupas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='bonificaciones_especiales/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var c_tributo;
        var d_tributo;
        var d_objeto_hecho;
        var c_grupo;
        var d_grupo;
        var f_desde;
        var f_hasta;
        var f_alta;
        var id_contribuyente;
        var d_contribuyente;
        var v_id_menu ='<?=$p_id_menu?>';
        var lista_tributos = '<?=$lista_tributos?>'
        var lista_grupos = '<?=$lista_grupos?>'


        var main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden: 0,
            m_autoquery:'S'
        });

        
        $(document).ready(function() {
            init_grillas();
            init_eventos();
            init_lupas();
        });
    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>