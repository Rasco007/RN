<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

$lista_tipos_bonos = fun_id_lista('LISTA TIPOS DE BONOS');

include('actualizacion_coti_bonos/html/principal.html');
include('actualizacion_coti_bonos/html/modals.html');
?>
    <link rel="stylesheet" type="text/css" href="actualizacion_coti_bonos/css/estilos.css">
    <script type="text/javascript" src="actualizacion_coti_bonos/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="actualizacion_coti_bonos/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="actualizacion_coti_bonos/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="actualizacion_coti_bonos/js/funciones.js?no_cache=<?=date('dmy')?>"></script>


    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';

        var v_lista_tipos_bonos = '<?=$lista_tipos_bonos?>';

        var datos_bonos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery
        });

        $(document).ready(function($){
            init_grillas();
            init_eventos();
            init_elementos();
        });

    </script>


<?php
require_once(INTRANET."footer.php");
?>