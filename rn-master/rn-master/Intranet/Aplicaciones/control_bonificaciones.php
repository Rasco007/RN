<?php
require_once(INTRANET . "header.php");
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];


$p_tributo = $_POST['p_tributo'];
$p_pos_fiscal   = $_POST['p_pos_fiscal'];
$p_cuota   = $_POST['p_cuota'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];

$lista_tipos_imponibles = fun_id_lista('LISTADO DE TIPOS IMPONIBLES AUTO-INMO');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');

include('control_bonificaciones/html/principal.html');
?>
<link rel="stylesheet" type="text/css" href="control_bonificaciones/css/estilos.css">
<script type="text/javascript" src="control_bonificaciones/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="control_bonificaciones/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="control_bonificaciones/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';

    var v_pos_fiscal = '<?=$p_pos_fiscal?>';
    var v_cuota = '<?=$p_cuota?>';
    var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
    var v_c_tarea = '<?=$p_c_tarea ?>';
    var v_tributo = '<?=$p_tributo?>';

    var v_lista_tipos_imponibles = '<?=$lista_tipos_imponibles?>';
    var v_lista_tributos = '<?=$lista_tributos?>';

    var datos_bonificaciones_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param:{':p_n_lote':null}
    });

    $(document).ready(function($){
        init_grillas();
        init_eventos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>
