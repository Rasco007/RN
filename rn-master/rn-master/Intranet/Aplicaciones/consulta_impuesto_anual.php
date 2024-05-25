<?php
require_once(INTRANET."header.php");
include('consulta_impuesto_anual/html/main.html');
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];
$fecha_hoy = date('d/m/Y');

$lista_grupos = fun_id_lista('LISTA DE GRUPOS AUTOMOTOR PARA CONSULTA');
$lista_moneda = fun_id_lista('LISTADO TIPOS MONEDA');
?>
    <script type="text/javascript" src="consulta_impuesto_anual/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="consulta_impuesto_anual/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="consulta_impuesto_anual/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var datos_grid_impuesto_anual;
        var datos_main_grid;
        var v_lista_grupos = '<?=$lista_grupos?>';
        var v_lista_moneda = '<?=$lista_moneda?>';
        var v_modo = '<?=$p_modo?>';

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
