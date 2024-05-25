<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];

$lista_tributo = fun_id_lista('TRIBUTOS RECALCULO Y SEGUIMIENTO BONIF');
$lista_objeto = fun_id_lista('LISTADO NOMENCLATURAS Y PATENTES - RECALCULO Y SEGUIMIENTO BONIF');

$query = "select userenv('sessionid') idsesion from dual";
$db_query ->setQuery($query);
$param = array();
$row_query = $db_query->do_query($param);
$id_sesion = $row_query[0]['IDSESION'];

include('recal_seg_bonificaciones/html/principal.html');
?>

    <link rel="stylesheet" type="text/css" href="recal_seg_bonificaciones/css/estilos.css">
    <script type="text/javascript" src="recal_seg_bonificaciones/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="recal_seg_bonificaciones/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="recal_seg_bonificaciones/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="recal_seg_bonificaciones/js/elementos.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var v_lista_tributo = '<?=$lista_tributo?>';
        var v_lista_objeto = '<?=$lista_objeto?>';
        var v_id_sesion = '<?=$id_sesion?>';

        var datos_recal_seg_bonif_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param:{':p_n_sesion': null}
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