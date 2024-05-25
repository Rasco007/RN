<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_infracciones = fun_id_lista('LISTADO DE INFRACCIONES');
$lista_entes = fun_id_lista('LISTADO DE ENTES');
$lista_conceptos = fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO');
$lista_regimenes = fun_id_lista('LISTADO DE REGIMENES POR TRIBUTO');

#HTML PRINCIPAL
include('param_infracciones/html/param_infracciones.html');
?>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_lista_infracciones = '<?=$lista_infracciones?>';
    var v_lista_entes = '<?=$lista_entes?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var v_lista_regimenes = '<?=$lista_regimenes?>';

</script>

<script type='text/javascript' src='param_infracciones/js/funciones.js'></script>
<script type='text/javascript' src='param_infracciones/js/param_infracciones.js'></script>

<?php
require_once(INTRANET."footer.php");
?>